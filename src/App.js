import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Card from './components/Card';
import Overlay from './components/Overlay';
import { fetchData, saveData } from './api/api';

function App() {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaveTime, setLastSaveTime] = useState(null);
  const [changesMade, setChangesMade] = useState(false);
  const saveInterval = useRef(null);

  useEffect(() => {
    async function getData() {
      const response = await fetchData();
      setItems(response);
    }
    getData();
  }, []);

  useEffect(() => {
    setChangesMade(true);
  }, [items]);

  useEffect(() => {
    saveInterval.current = setInterval(() => {
      if (changesMade) {
        handleSave();
      }
    }, 5000);
    return () => clearInterval(saveInterval.current);
  }, [changesMade]);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // If dragged item is dropped in the same position
    if (source.index === destination.index) return;

    const updatedItems = Array.from(items);
    const [movedItem] = updatedItems.splice(source.index, 1);
    updatedItems.splice(destination.index, 0, movedItem);

    setItems(updatedItems);
  };

  const handleCardClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const handleSave = async () => {
    setIsSaving(true);
    const response = await saveData(items);
    if (response.success) {
      setLastSaveTime(new Date());
      setChangesMade(false);
    }
    setIsSaving(false);
  };

  return (
    <div className="App">
      <h1 className="App-header">Welcome to Zania</h1>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided) => (
            <div
              className="card-container"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {items.map((item, index) => (
                <Draggable
                  key={item.type}
                  draggableId={item.type}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`draggable-card ${snapshot.isDragging ? 'dragging' : ''}`}
                      onClick={() => handleCardClick(`/images/${item.type}.jpg`)}
                      style={{
                        ...provided.draggableProps.style,
                        // Maintain size and prevent layout shifts
                        width: '200px',
                        height: '300px',
                        position: snapshot.isDragging ? 'absolute' : 'relative',
                        zIndex: snapshot.isDragging ? 1000 : 'auto',
                      }}
                    >
                      <Card item={item} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Overlay isOpen={isModalOpen} onClose={closeModal} imageSrc={selectedImage} />
      {isSaving && <div className="spinner">Saving...</div>}
      {lastSaveTime && (
        <div className="save-status">
          Last saved: {Math.floor((new Date() - lastSaveTime) / 1000)} seconds ago
        </div>
      )}
    </div>
  );
}

export default App;
