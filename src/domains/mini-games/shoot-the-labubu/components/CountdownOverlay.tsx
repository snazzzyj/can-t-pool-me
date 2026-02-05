'use client';

import React, { useState, useEffect } from 'react';
import { Press_Start_2P } from 'next/font/google';

const pressStart2P = Press_Start_2P({ weight: '400', subsets: ['latin'], display: 'swap' });

const COUNTDOWN_SECONDS = 3;

interface CountdownOverlayProps {
  onDone?: () => void;
}

export const CountdownOverlay: React.FC<CountdownOverlayProps> = ({ onDone }) => {
  const [count, setCount] = useState(COUNTDOWN_SECONDS);

  useEffect(() => {
    if (count <= 0) {
      onDone?.();
      return;
    }
    const t = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [count, onDone]);

  return (
    <div
      className={`${pressStart2P.className} pointer-events-none absolute inset-0 z-30 flex items-center justify-center bg-transparent text-white`}
    >
      <span className="text-6xl tabular-nums">
        {count > 0 ? count : 'GO!'}
      </span>
    </div>
  );
};

export default CountdownOverlay;
