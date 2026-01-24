'use client';

import { useState } from 'react';

type TransitionSlideProps = {
  readonly title: string;
  readonly subtitle: string;
  readonly backgroundImage?: string;
  readonly onContinue: () => void;
};

export function TransitionSlide({
  title,
  subtitle,
  backgroundImage,
  onContinue,
}: TransitionSlideProps) {
  const [isAnimating, setIsAnimating] = useState(true);

  const handleContinue = () => {
    setIsAnimating(false);
    setTimeout(onContinue, 300); // Small delay for exit animation
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Background Image (optional) */}
      {backgroundImage && (
        <img
          src={backgroundImage}
          alt="Transition background"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
      )}

      {/* Content Container */}
      <div
        className={`
          relative z-10 flex flex-col items-center justify-center h-full
          transition-opacity duration-500
          ${isAnimating ? 'opacity-100' : 'opacity-0'}
        `}
      >
        {/* Title */}
        <h1
          className={`
            text-4xl md:text-6xl font-bold text-white text-center mb-4
            transition-all duration-700 delay-100
            ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}
        >
          {title}
        </h1>

        {/* Subtitle */}
        <p
          className={`
            text-xl md:text-2xl text-gray-300 text-center mb-12 max-w-2xl px-4
            transition-all duration-700 delay-300
            ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}
        >
          {subtitle}
        </p>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          className={`
            bg-blue-500 hover:bg-blue-600 text-white font-semibold
            py-3 px-8 rounded-lg shadow-lg
            transition-all duration-700 delay-500
            hover:scale-105 active:scale-95
            ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}
        >
          Continue
        </button>

        {/* Optional: Press any key hint */}
        <p
          className={`
            text-sm text-gray-500 mt-6
            transition-all duration-700 delay-700
            ${isAnimating ? 'opacity-100' : 'opacity-0'}
          `}
        >
          Press any key to continue
        </p>
      </div>

      {/* Decorative Elements (optional) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
      </div>
    </div>
  );
}

// Keyboard support hook (optional enhancement)
export function useKeyboardContinue(onContinue: () => void, enabled = true) {
  useState(() => {
    if (!enabled) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
        e.preventDefault();
        onContinue();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  });
}