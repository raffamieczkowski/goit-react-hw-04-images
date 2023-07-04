import React from 'react';
import '../styles.css';

const ImageGalleryItem = ({ image, onItemClick }) => {
  const handleClick = () => {
    onItemClick(image.largeImageURL);
  };

  return (
    <li className="ImageGalleryItem">
      <img
        src={image.webformatURL}
        alt={image.tags}
        className="ImageGalleryItem-image"
        onClick={handleClick}
      />
    </li>
  );
};

export default ImageGalleryItem;
