import React from 'react';
import { Link } from 'react-router-dom';
import { ImageData } from '../types/ImageData';
import './Gallery.css'; // Use the original styling

interface GalleryProps {
  images: ImageData[];
}

// Helper function to group images by type
const groupImagesByType = (images: ImageData[], type: string) => {
  const filteredImages = images.filter(image => image.type === type && image.type !== null);
  return filteredImages;
};

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  // Group images by their type
  const planets = groupImagesByType(images, 'Planet');
  const dsos = groupImagesByType(images, 'DSO');
  const comets = groupImagesByType(images, 'Comet');

  return (
    <div>
      {/* Section for Planets */}
      {planets.length > 0 && (
        <section className="gallery-section">
          <h2>Planets</h2>
          <div className="gallery">
            {planets.map((image) => (
              <div key={image.objectId} className="gallery-item">
                <Link to={`/image/${image.objectId}`}>
                  <img
                    src={`/images/${image.objectId}.webp`}
                    alt={image.displayName || image.objectId}
                  />
                </Link>
                <p>{image.displayName || 'Unknown Object'}</p>
              </div>
            ))}
          </div>
        </section>
      )}

            {/* Section for Comets */}
            {comets.length > 0 && (
        <section className="gallery-section">
          <h2>Comets</h2>
          <div className="gallery">
            {comets.map((image) => (
              <div key={image.objectId} className="gallery-item">
                <Link to={`/image/${image.objectId}`}>
                  <img
                    src={`/images/${image.objectId}.webp`}
                    alt={image.displayName || image.objectId}
                  />
                </Link>
                <p>{image.displayName || 'Unknown Object'}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section for Deep Sky Objects */}
      {dsos.length > 0 && (
        <section className="gallery-section">
          <h2>Deep Sky Objects</h2>
          <div className="gallery">
            {dsos.map((image) => (
              <div key={image.objectId} className="gallery-item">
                <Link to={`/image/${image.objectId}`}>
                  <img
                    src={`/images/${image.objectId}.webp`}
                    alt={image.displayName || image.objectId}
                  />
                </Link>
                <p>{image.displayName || 'Unknown Object'}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Gallery;
