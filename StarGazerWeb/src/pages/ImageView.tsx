import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ImageData } from '../types/ImageData';
import './ImageView.css';

interface ImageViewProps {
  images: ImageData[];
}

const ImageView: React.FC<ImageViewProps> = ({ images }) => {
  const { objectId } = useParams<{ objectId: string }>();
  const navigate = useNavigate();
  const currentIndex = images.findIndex(img => img.objectId === objectId);

  const image = images[currentIndex];

  const prevIndex = (currentIndex - 1 + images.length) % images.length;
  const nextIndex = (currentIndex + 1) % images.length;

  const handlePrev = () => {
    navigate(`/image/${images[prevIndex].objectId}`);
  };

  const handleNext = () => {
    navigate(`/image/${images[nextIndex].objectId}`);
  };

  if (!image) {
    return <div>Image not found</div>;
  }

  return (
    <div className="image-view">
      <Link to="/" className="back-button">← Back to Gallery</Link>
      <h2>{image.displayName || 'Unknown Object'}</h2>
      <img
        src={`/images/${image.objectId}.webp`}
        alt={image.displayName || image.objectId}
      />
      <p>RA: {image.ra}</p>
      <p>Dec: {image.dec}</p>
      <p>Constellation: {image.constellation || 'Unknown'}</p>

      {/* Navigation buttons */}
      <div className="nav-buttons">
        <button className="nav-button left" onClick={handlePrev}>
          ← Previous
        </button>
        <button className="nav-button right" onClick={handleNext}>
          Next →
        </button>
      </div>
    </div>
  );
};

export default ImageView;
