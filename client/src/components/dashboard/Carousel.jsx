import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import './Carousel.css';

const DRAG_BUFFER = 20;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: 'spring', stiffness: 300, damping: 30 };

function CarouselItem({ item, index, itemWidth, round }) {
  return (
    <div
      className={`carousel-item ${round ? 'carousel-item-round' : ''}`}
      style={{
        width: itemWidth,
        minWidth: itemWidth,
        height: '100%',
        padding: '1.25rem',
        marginRight: `${GAP}px`,
      }}
    >
      <div>
        <div className="carousel-card-header">
          {item.icon && (
            <div className="carousel-icon-box">
              {item.icon}
            </div>
          )}
          <span className="carousel-card-title">{item.title}</span>
        </div>

        <div className="carousel-card-body">
          <div className="carousel-stat-value">{item.value}</div>
        </div>
      </div>

      <div className="carousel-card-footer">
        <p className="carousel-stat-description">{item.description}</p>
      </div>
    </div>
  );
}

export default function Carousel({
  items = [],
  baseWidth = 300,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false,
}) {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [calculatedItemWidth, setCalculatedItemWidth] = useState(baseWidth);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const x = useMotionValue(0);

  // Responsive calculation so carousel cards fit nicely on mobile screens without horizontal page overflow
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setContainerWidth(width);
        // Ensure card fits mobile screen width with margin padding
        const maxCardWidth = Math.max(240, width - 32);
        setCalculatedItemWidth(Math.min(baseWidth, maxCardWidth));
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [baseWidth]);

  const itemTotalWidth = calculatedItemWidth + GAP;

  // Duplicate items for infinite loop illusion if loop is true
  const displayItems = loop && items.length > 0 ? [...items, ...items, ...items] : items;
  const loopOffset = loop ? items.length : 0;

  // Sync motion value on index change
  useEffect(() => {
    const targetX = -(currentIndex + loopOffset) * itemTotalWidth;
    x.set(targetX);
  }, [currentIndex, loopOffset, itemTotalWidth, x]);

  // Autoplay handler
  useEffect(() => {
    if (!autoplay || (pauseOnHover && isHovered) || isDragging || items.length === 0) {
      return;
    }

    const timer = setInterval(() => {
      handleNext();
    }, autoplayDelay);

    return () => clearInterval(timer);
  }, [autoplay, autoplayDelay, isHovered, isDragging, pauseOnHover, items.length, currentIndex]);

  const handlePrev = () => {
    if (items.length === 0) return;
    if (loop) {
      setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    } else {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const handleNext = () => {
    if (items.length === 0) return;
    if (loop) {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    } else {
      setCurrentIndex((prev) => Math.min(prev + 1, items.length - 1));
    }
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (_, info) => {
    setIsDragging(false);
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      handleNext();
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      handlePrev();
    } else {
      // Snap back
      const targetX = -(currentIndex + loopOffset) * itemTotalWidth;
      x.set(targetX);
    }
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="carousel-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="carousel-track"
        drag="x"
        dragConstraints={{ left: -10000, right: 10000 }}
        dragElastic={0.2}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        animate={{ x: -(currentIndex + loopOffset) * itemTotalWidth }}
        transition={SPRING_OPTIONS}
        style={{ x }}
      >
        {displayItems.map((item, idx) => (
          <CarouselItem
            key={`${item.id || item.title}-${idx}`}
            item={item}
            index={idx}
            itemWidth={calculatedItemWidth}
            round={round}
          />
        ))}
      </motion.div>

      {/* Indicator dots */}
      <div className="carousel-indicators-container">
        {items.map((item, idx) => (
          <button
            key={item.id || idx}
            type="button"
            className={`carousel-indicator-dot ${
              idx === currentIndex ? 'carousel-indicator-active' : 'carousel-indicator-inactive'
            }`}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}: ${item.title}`}
          />
        ))}
      </div>
    </div>
  );
}
