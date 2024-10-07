// src/components/Gallery.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ImageData } from '../types/ImageData';
import './Gallery.css'; // Assuming this file contains relevant styling

interface GalleryProps {
  images: ImageData[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  return (
    <div className="gallery">
      {images.map((image) => (
        <div key={image.objectId} className="gallery-item">
          <Link to={`/image/${image.objectId}`}>
            <img
              src={image.url} // Use the signed URL from the Google Cloud Function
              alt={image.displayName || image.objectId}
            />
          </Link>
          <p>{image.displayName || 'Unknown Object'}</p>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
