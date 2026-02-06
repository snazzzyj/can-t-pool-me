'use client';

import { Press_Start_2P } from 'next/font/google';
import { useState, useRef } from 'react';

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin']
});

type Props = {
  readonly onStartClick: () => void;
};

export function WelcomeScreen({ onStartClick }: Props) {
  const [musicStarted, setMusicStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startMusic = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/assets/audio/Scheming%20music.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(err => console.warn('Audio play failed:', err));
    }
    setMusicStarted(true);
  };

  const handleStartGame = () => {
    // Stop and cleanup audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    onStartClick();
  };

  if (!musicStarted) {
    return (
      <div
        onClick={startMusic}
        className="flex items-center justify-center min-h-screen bg-black cursor-pointer"
      >
        <p className={`text-white text-2xl ${pressStart2P.className}`}>
          Click anywhere to begin...
        </p>
      </div>
    );
  }

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
          onClick={handleStartGame}
          className={`bg-white hover:bg-gray-200 text-black font-bold py-4 px-8 rounded-lg text-xl transition-colors ${pressStart2P.className}`}
        >
          Start Game
        </button>
      </div>
    </div>
  );
}