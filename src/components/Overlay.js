import React, { useEffect } from 'react';
import '../styles/Overlay.css';

const Overlay = ({ isOpen, onClose, imageSrc }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={imageSrc} 
          alt="Document Preview" 
          width={'500px'}
          height={'500px'} 
        />
        <button className="close-button" onClick={onClose}>X</button>
      </div>
    </div>
  );
};

export default Overlay;
