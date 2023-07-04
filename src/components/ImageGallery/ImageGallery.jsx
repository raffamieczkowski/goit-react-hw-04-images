import React from 'react';
import '../styles.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images, onItemClick }) => {
  return (
    <ul className="ImageGallery">
      {images.map((image) => (
        <ImageGalleryItem
          key={image.id}
          image={image}
          onItemClick={onItemClick}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
