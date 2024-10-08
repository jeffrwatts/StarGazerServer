// src/App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ImageView from './pages/ImageView';
import { ImageData } from './types/ImageData';

const App: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/images/images.json'); // Fetch JSON from public folder
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home images={images} />} />
        <Route path="/image/:objectId" element={<ImageView images={images} />} />
      </Routes>
    </Router>
  );
};

export default App;
