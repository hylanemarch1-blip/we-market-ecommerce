"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1920&auto=format&fit=crop&q=80",
    title: "Latest Consumer Tech",
    subtitle: "Cutting-edge electronics at unbeatable prices",
    ctaText: "Shop Electronics",
    ctaHref: "/shop?category=electronics",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1920&auto=format&fit=crop&q=80",
    title: "New Smartphones Arrived",
    subtitle: "Flagship mobiles with exclusive launch offers",
    ctaText: "Explore Mobiles",
    ctaHref: "/shop?category=mobiles",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1920&auto=format&fit=crop&q=80",
    title: "Premium Headphones",
    subtitle: "Immersive sound for music lovers",
    ctaText: "Shop Now",
    ctaHref: "/shop?category=headphones",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1920&auto=format&fit=crop&q=80",
    title: "Powerful Laptops",
    subtitle: "Performance machines for work and play",
    ctaText: "Discover",
    ctaHref: "/shop?category=laptops",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1920&auto=format&fit=crop&q=80",
    title: "Smartwatches Collection",
    subtitle: "Track your fitness, own your style",
    ctaText: "Shop Smartwatches",
    ctaHref: "/shop?category=smartwatches",
  },
];

export default function AutoHeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  return (
    <section className="relative w-full overflow-hidden" aria-label="Hero banner carousel">
      <div className="relative aspect-[21/9] max-h-[400px] min-h-[280px]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}`}
          >
            <Image
              src={slide.image}
              alt=""
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex items-center px-8 md:px-16">
              <div className="max-w-xl text-white animate-fade-in-up">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-base md:text-lg mb-5 text-gray-100 max-w-md">
                  {slide.subtitle}
                </p>
                <a
                  href={slide.ctaHref}
                  className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-lg font-semibold text-sm md:text-base transition-colors"
                >
                  {slide.ctaText}
                </a>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={prevSlide}
          className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
          aria-label="Previous slide"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
          aria-label="Next slide"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-4" role="tablist" aria-label="Slide indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
              index === currentIndex
                ? "bg-emerald-600 w-8"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            role="tab"
            aria-selected={index === currentIndex}
            aria-label={`Go to slide ${index + 1}`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
}