"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductImage {
  id: number;
  primary: string;
  secondary: string;
  alt: string;
}

interface AutoFlipGalleryProps {
  images: ProductImage[];
  className?: string;
}

export default function AutoFlipGallery({ images, className = "" }: AutoFlipGalleryProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const currentImage = images[selectedIndex];
  const isHovered = hoveredIndex === selectedIndex;

  return (
    <div className={`relative ${className}`} role="region" aria-label="Product image gallery">
      <div className="aspect-square overflow-hidden rounded-xl bg-gray-50 relative">
        <div className="absolute inset-0 transition-opacity duration-300 ease-in-out">
          <Image
            src={currentImage.primary}
            alt={currentImage.alt}
            fill
            className={`object-cover transition-opacity duration-300 ${
              isHovered ? "opacity-0" : "opacity-100"
            }`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={selectedIndex === 0}
          />
          <Image
            src={currentImage.secondary}
            alt={`${currentImage.alt} - alternate view`}
            fill
            className={`object-cover transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5" role="tablist" aria-label="Image thumbnails">
            {images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => {
                  setSelectedIndex(index);
                  setHoveredIndex(null);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  index === selectedIndex
                    ? "bg-emerald-600 w-6"
                    : "bg-white/60 hover:bg-white"
                }`}
                role="tab"
                aria-selected={index === selectedIndex}
                aria-label={`View image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <div
        className="grid grid-cols-4 gap-3 mt-4"
        role="list"
        aria-label="Product thumbnails"
        onMouseEnter={() => setHoveredIndex(selectedIndex)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => {
              setSelectedIndex(index);
              setHoveredIndex(null);
            }}
            className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all duration-200 ${
              index === selectedIndex
                ? "border-emerald-600"
                : "border-transparent hover:border-gray-200"
            }`}
            role="listitem"
            aria-label={`Select ${image.alt}`}
            aria-current={index === selectedIndex ? "true" : "false"}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Image
              src={image.primary}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 640px) 25vw, (max-width: 1024px) 12.5vw, 8vw"
            />
            {index === selectedIndex && (
              <div className="absolute inset-0 bg-emerald-600/10 pointer-events-none" />
            )}
          </button>
        ))}
      </div>

      <style jsx>{`
        @keyframes flip-in {
          from {
            opacity: 0;
            transform: rotateY(90deg) scale(0.95);
          }
          to {
            opacity: 1;
            transform: rotateY(0) scale(1);
          }
        }
        .flip-animate {
          animation: flip-in 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}