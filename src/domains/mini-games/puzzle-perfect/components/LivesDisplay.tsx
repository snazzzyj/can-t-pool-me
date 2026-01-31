import React from 'react';
import { MAX_LIVES } from '../constants/puzzle-perfect.constants';

interface LivesDisplayProps {
  lives: number;
}

export const LivesDisplay: React.FC<LivesDisplayProps> = ({ lives }) => {
  return (
    <div className="flex gap-2">
      {Array.from({ length: MAX_LIVES }).map((_, i) => (
        <div key={i} className="relative w-8 h-8">
          {i < lives ? (
            <span className="text-3xl filter drop-shadow-[0_0_5px_rgba(255,0,0,0.8)]">❤️</span>
          ) : (
            <span className="text-3xl opacity-20 grayscale">💔</span>
          )}
        </div>
      ))}
    </div>
  );
};
