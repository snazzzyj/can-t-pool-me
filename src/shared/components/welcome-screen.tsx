'use client';

import clsx from 'clsx';
import { Press_Start_2P } from 'next/font/google';

// Initialize the font
const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin']
});

type Props = {
  readonly onStartClick: () => void;
};

export function WelcomeScreen({ onStartClick }: Props) {
  return (
    <div
      className="flex flex-col items-start justify-center min-h-screen p-16 relative"
      style={{
        backgroundImage: 'url(/assets/backgrounds/Start_Screen-1.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="text-left">
        <h1 className={`text-5xl font-bold text-white mb-4 ${pressStart2P.className}`}>
          Can't Pool Me
        </h1>

        <p className={`text-2xl text-purple-200 mb-8 ${pressStart2P.className}`}>
          One last shot
        </p>

        <button
          onClick={onStartClick}
          className={`bg-white hover:bg-gray-200 text-black font-bold py-4 px-8 rounded-lg text-xl transition-colors ${pressStart2P.className}`}
        >
          Start Game
        </button>
      </div>
    </div>
  );
}