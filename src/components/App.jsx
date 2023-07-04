import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Searchbar from '../components/Searchbar/Searchbar';
import ImageGallery from '../components/ImageGallery/ImageGallery';
import Button from '../components/Button/Button';
import Modal from '../components/Modal/Modal';
// import Loader from 'react-loader-spinner';

// import 'react-loader-spinner/dist/loader/BallTriangle';
import './styles.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!searchQuery) return;

    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://pixabay.com/api/?q=${searchQuery}&page=${currentPage}&key=35850831-e3d44e32187bf177fa8bbbda5&image_type=photo&orientation=horizontal&per_page=12`
        );
        if (currentPage === 1) {
          setImages(response.data.hits);
        } else {
          setImages(prevImages => [...prevImages, ...response.data.hits]);
        }
      } catch (error) {
        console.log('Error while fetching images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [searchQuery, currentPage]);

  const handleFormSubmit = query => {
    setSearchQuery(query);
    setImages([]);
    setCurrentPage(1);
  };

  const handleImageClick = imageUrl => {
    setSelectedImage(imageUrl);
  };

  const handleModalClose = () => {
    setSelectedImage(null);
  };

  const handleLoadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {isLoading ? (
        <div className="Loader">
          Loading...
          {/* <Loader type="BallTriangle" color="#3f51b5" height={80} width={80} /> */}
        </div>
      ) : null}
      {selectedImage && <Modal imageUrl={selectedImage} onClose={handleModalClose} />}
      {!isLoading && images.length > 0 && <Button onClick={handleLoadMore} />}
    </div>
  );
};

export default App;
