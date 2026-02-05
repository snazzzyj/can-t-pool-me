'use client';

import React from 'react';
import { Press_Start_2P } from 'next/font/google';

const pressStart2P = Press_Start_2P({ weight: '400', subsets: ['latin'], display: 'swap' });

interface PreGameInstructionsProps {
  onStart: () => void;
}

export const PreGameInstructions: React.FC<PreGameInstructionsProps> = ({ onStart }) => {
  return (
    <div
      className={`${pressStart2P.className} absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/90 p-8 text-center text-white`}
    >
      <h1 className="mb-4 text-2xl">SHOOT THE LABUBU</h1>
      <p className="mb-6 max-w-lg text-sm">
        Three shooters (Rab, Jenn, Joel) fire at descending Labubus. Two collectors (Elyse,
        Debbie) catch fallen bodies to restore team HP. Survive 3 waves per level across 3
        levels!
      </p>
      <div className="mb-6 max-w-md space-y-2 text-left text-xs">
        <p><strong>Rab:</strong> [1] Left, [2] Shoot, [3] Right</p>
        <p><strong>Jenn:</strong> [7] Left, [8] Shoot, [9] Right</p>
        <p><strong>Joel:</strong> [J] Left, [K] Shoot, [L] Right</p>
        <p className="pt-2 text-[10px] opacity-70">Collectors:</p>
        <p><strong>Elyse:</strong> [←] [→] move bucket</p>
        <p><strong>Debbie:</strong> [A] [D] move bucket</p>
      </div>
      <button
        type="button"
        onClick={onStart}
        className="rounded border-2 border-white bg-white px-8 py-3 text-black hover:bg-gray-200"
      >
        START
      </button>
    </div>
  );
};

export default PreGameInstructions;
