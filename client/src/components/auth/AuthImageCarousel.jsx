import React, { useState, useEffect } from 'react';
import { AUTH_IMAGES } from './authImages';
import './Auth.css';

export const AuthImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Smooth automatic crossfade every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % AUTH_IMAGES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="auth-carousel-viewport">
      {AUTH_IMAGES.map((image, index) => {
        const isActive = index === currentIndex;
        return (
          <div
            key={image.id}
            className={`auth-carousel-slide ${
              isActive ? 'auth-carousel-slide-active' : 'auth-carousel-slide-inactive'
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="auth-carousel-image"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </div>
        );
      })}

      {/* Dark gradient overlay blending image with HireLens brand */}
      <div className="auth-visual-gradient-overlay" />

      {/* Slide indicators / subtle progression pills */}
      <div className="auth-carousel-indicators" aria-hidden="true">
        {AUTH_IMAGES.map((_, idx) => (
          <div
            key={idx}
            className={`auth-carousel-indicator-bar ${
              idx === currentIndex ? 'auth-carousel-indicator-bar-active' : ''
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default AuthImageCarousel;
