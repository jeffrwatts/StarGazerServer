// src/pages/Home.tsx
import React from 'react';
import Gallery from '../components/Gallery';
import { ImageData } from '../types/ImageData';

interface HomeProps {
  images: ImageData[];
}

const Home: React.FC<HomeProps> = ({ images }) => {
  return (
    <div>
      <h1>StarGazer Gallery</h1>
      <Gallery images={images} />
    </div>
  );
};

export default Home;
