'use client';

import React from 'react';
import { Press_Start_2P } from 'next/font/google';

const pressStart2P = Press_Start_2P({ weight: '400', subsets: ['latin'], display: 'swap' });

interface GameOverScreenProps {
  bodiesCaught: number;
  wavesSurvived: number;
  currentLevel: number;
  onRetry: () => void;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({
  bodiesCaught,
  wavesSurvived,
  currentLevel,
  onRetry,
}) => {
  return (
    <div
      className={`${pressStart2P.className} absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/90 p-8 text-white`}
    >
      <h2 className="mb-4 text-3xl text-red-500">GAME OVER</h2>
      <p className="mb-2 text-center text-sm">The Labubus overwhelmed the team!</p>
      <p className="mb-1">Bodies collected: {bodiesCaught}</p>
      <p className="mb-6">Waves survived: {wavesSurvived}/3 (Level {currentLevel})</p>
      <button
        type="button"
        onClick={onRetry}
        className="rounded border-2 border-white bg-white px-6 py-2 text-black hover:bg-gray-200"
      >
        TRY AGAIN
      </button>
    </div>
  );
};

export default GameOverScreen;
