// src/pages/ImageView.tsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ImageData } from '../types/ImageData';
import './ImageView.css'; // Create this file for custom styles

interface ImageViewProps {
  images: ImageData[];
}

const ImageView: React.FC<ImageViewProps> = ({ images }) => {
  const { objectId } = useParams<{ objectId: string }>();
  const image = images.find(img => img.objectId === objectId);

  if (!image) {
    return <div>Image not found</div>;
  }

  return (
    <div className="image-view">
      <Link to="/" className="back-button">← Back to Gallery</Link>
      <h2>{image.displayName || 'Unknown Object'}</h2>
      <img
        src={`/images/${image.objectId}.webp`} // Use the objectId to reference the local image
        alt={image.displayName || image.objectId}
      />
      <p>RA: {image.ra}</p>
      <p>Dec: {image.dec}</p>
      <p>Constellation: {image.constellation || 'Unknown'}</p>
    </div>
  );
};

export default ImageView;
