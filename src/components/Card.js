import React, { useState } from 'react';
import '../styles/Card.css'; // CSS for card styling and spinner

const Card = ({ item }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div >
      {/* Show spinner while image is loading */}
      {!imageLoaded && (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      )}
      <h3>{item.title}</h3>
      <img
        src={`/images/${item.type}.jpg`}  // Adjusted for the public folder path
        alt={item.title}
        onLoad={() => setImageLoaded(true)}  // Set imageLoaded to true when the image is fully loaded
        style={{ display: imageLoaded ? 'block' : 'none' }}  // Hide the image until it's fully loaded
        width={'100%'}
        height={'100%'}
      />
      
    </div>
  );
};

export default Card;
