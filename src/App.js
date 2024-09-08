import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Card from './components/Card';
import Overlay from './components/Overlay';
import { fetchData, saveData } from './api/api';

// Mock fetch and save functions to simulate API calls


function App() {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaveTime, setLastSaveTime] = useState(null);
  const [changesMade, setChangesMade] = useState(false);
  const saveInterval = useRef(null);

  // Fetch initial data from API on mount
  useEffect(() => {
    async function getData() {
      const response = await fetchData();
      setItems(response);
    }
    getData();
  }, []);

  // Track changes in the items array
  useEffect(() => {
    setChangesMade(true);
  }, [items]);

  // Save data every 5 seconds if changes were made
  useEffect(() => {
    saveInterval.current = setInterval(() => {
      if (changesMade) {
        handleSave();
      }
    }, 5000);
    return () => clearInterval(saveInterval.current);  // Clear interval on unmount
  }, [changesMade]);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    setItems(newItems);
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
    const response = await saveData(items);  // Mock save function
    if (response.success) {
      setLastSaveTime(new Date());  // Set the current time as the last save time
      setChangesMade(false);  // Reset change flag
    }
    setIsSaving(false);
  };

  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="cards">
          {(provided) => (
            <>
              <h1>Welcome to Zania </h1>
              <div className="card-container" {...provided.droppableProps} ref={provided.innerRef}>
                {items.map((item, index) => (
                  <Draggable key={item.type} draggableId={item.type} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        onClick={() => handleCardClick(`/images/${item.type}.jpg`)}
                      >
                        <Card item={item} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            </>
           
          )}
        </Droppable>
      </DragDropContext>

      <Overlay isOpen={isModalOpen} onClose={closeModal} imageSrc={selectedImage} />

      {/* Spinner and time since last save */}
      {isSaving && <div className="spinner">Saving...</div>}
      {lastSaveTime && (
        <div className="save-status">
          Last saved: {Math.floor((new Date() - lastSaveTime) / 1000)} seconds ago
        </div>
      )}
    </>
  );
}

export default App;
