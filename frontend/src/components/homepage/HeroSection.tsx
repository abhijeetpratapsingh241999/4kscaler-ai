import React, { useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const slides = [
  {
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-long-dashboard-with-graphs-and-charts-36472-large.mp4',
    title: 'Welcome to 4kscaler-ai',
    subtitle: 'The future of video enhancement is here.',
  },
  {
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-globe-of-blue-and-pink-lights-42293-large.mp4',
    title: 'Explore New Features',
    subtitle: 'Frame interpolation and more.',
  },
];

const HeroSection: React.FC = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollBy({ left: -scrollerRef.current.clientWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollBy({ left: scrollerRef.current.clientWidth, behavior: 'smooth' });
    }
  };

  return (
    <div
      className="w-full h-full flex-shrink-0 relative rounded-2xl"
      style={{ maxWidth: '100vw', overflowX: 'hidden' }}
    >
      <div
        ref={scrollerRef}
        className="flex h-full w-full overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth"
        style={{ maxWidth: '100vw' }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="h-full w-full min-w-full max-w-full flex-shrink-0 snap-start relative"
            style={{ overflow: 'hidden' }}
          >
            <video
              src={slide.videoSrc}
              autoPlay
              loop
              muted
              playsInline
              className="absolute w-full h-full object-cover top-0 left-0 z-0"
              style={{ maxWidth: '100%' }}
            />
            <div className="relative z-10 p-2 sm:p-4 md:p-6 text-center text-white flex flex-col items-center justify-center h-full bg-black/50">
              <h1
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
                style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}
              >
                {slide.title}
              </h1>
              <p
                className="text-sm sm:text-base md:text-lg lg:text-xl"
                style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}
              >
                {slide.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={scrollLeft}
        className="absolute left-1 sm:left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition"
        aria-label="Previous slide"
      >
        <ChevronLeftIcon className="size-5 sm:size-6 text-white" />
      </button>
      <button
        onClick={scrollRight}
        className="absolute right-1 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition"
        aria-label="Next slide"
      >
        <ChevronRightIcon className="size-5 sm:size-6 text-white" />
      </button>
    </div>
  );
};

export default HeroSection;