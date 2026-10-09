"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";

interface FestivalSlide {
  id: number;
  badge: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  image: string;
  accent: string;
}

const FESTIVAL_SLIDES: FestivalSlide[] = [
  {
    id: 1,
    badge: "Festival Flash Sale",
    title: "Up to 60% OFF across every category",
    subtitle:
      "Fashion, electronics, home essentials and more — festival prices for a limited time.",
    ctaText: "Shop the Sale",
    ctaHref: "/shop?sale=true",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&auto=format&fit=crop&q=80",
    accent: "from-red-600/90 via-red-500/70",
  },
  {
    id: 2,
    badge: "Bumper Discounts",
    title: "Flat 40-70% off on mobiles & electronics",
    subtitle:
      "Flagship smartphones, laptops and gadgets at the lowest prices of the season.",
    ctaText: "Grab the Deals",
    ctaHref: "/shop?category=mobiles",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&auto=format&fit=crop&q=80",
    accent: "from-orange-600/90 via-orange-500/70",
  },
  {
    id: 3,
    badge: "Daily Offers",
    title: "New deals every day — while stocks last",
    subtitle:
      "Hand-picked daily offers refreshed at midnight. Miss it and it's gone.",
    ctaText: "View Daily Offers",
    ctaHref: "/shop?sale=true",
    image:
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1600&auto=format&fit=crop&q=80",
    accent: "from-emerald-700/90 via-emerald-600/70",
  },
];

const AUTO_PLAY_MS = 4500;

export default function FestivalSaleCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % FESTIVAL_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex(
      (prev) => (prev - 1 + FESTIVAL_SLIDES.length) % FESTIVAL_SLIDES.length
    );
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, AUTO_PLAY_MS);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  return (
    <section
      className="max-w-[1440px] mx-auto px-4"
      aria-label="Festival sale banner carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative overflow-hidden rounded-2xl shadow-lg aspect-[16/7] md:aspect-[21/8] max-h-[360px] min-h-[220px] bg-gray-900">
        {FESTIVAL_SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentIndex
                ? "opacity-100 z-10"
                : "opacity-0 z-0 pointer-events-none"
            }`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${FESTIVAL_SLIDES.length}`}
          >
            <Image
              src={slide.image}
              alt=""
              fill
              priority={index === 0}
              className="object-cover"
              sizes="(max-width: 1440px) 100vw, 1440px"
            />
            <div
              className={`absolute inset-0 bg-gradient-to-r ${slide.accent} to-transparent`}
            />

            <div className="absolute inset-0 flex items-center px-6 md:px-14">
              <div className="max-w-xl text-white">
                <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-[11px] md:text-xs font-bold tracking-wider uppercase px-3 py-1.5 rounded-full mb-3">
                  <Clock size={13} /> {slide.badge} &middot; Limited Period
                </span>
                <h2 className="text-2xl md:text-4xl font-black leading-tight mb-2">
                  {slide.title}
                </h2>
                <p className="text-sm md:text-base text-white/90 mb-5 max-w-md">
                  {slide.subtitle}
                </p>
                <Link
                  href={slide.ctaHref}
                  className="inline-block bg-white text-gray-900 hover:bg-gray-100 px-6 py-2.5 rounded-lg text-sm md:text-base font-bold transition-colors"
                >
                  {slide.ctaText}
                </Link>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={prevSlide}
          aria-label="Previous offer"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/25 hover:bg-white/40 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next offer"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/25 hover:bg-white/40 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white"
        >
          <ChevronRight size={20} />
        </button>

        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2"
          role="tablist"
          aria-label="Offer slide indicators"
        >
          {FESTIVAL_SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => setCurrentIndex(index)}
              role="tab"
              aria-selected={index === currentIndex}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-white w-8" : "bg-white/40 w-4"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
