'use client';

import React, { useState, useEffect } from 'react';
import { Press_Start_2P } from 'next/font/google';
import { getAssetPath } from '@/shared/utils/game';

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
});

const CHARACTERS = [
  { name: 'Rab', codename: 'Sharker', image: '/assets/characters/Rab-1.png', color: 'bg-blue-900/40' },
  { name: 'Joel', codename: 'Hackerman', image: '/assets/characters/Joel-1.png', color: 'bg-purple-900/40' },
  { name: 'Jenn', codename: 'Hacktress', image: '/assets/characters/Jenn-1.png', color: 'bg-orange-900/40' },
  { name: 'Debbie', codename: '.pxl', image: '/assets/characters/Debbie-1.png', color: 'bg-green-900/40' },
  { name: 'Elyse', codename: 'Big Iron McGee', image: '/assets/characters/Elyse-1.png', color: 'bg-red-900/40' },
];

interface CodenameIntroAnimProps {
  onComplete: () => void;
}

export const CodenameIntroAnim: React.FC<CodenameIntroAnimProps> = ({ onComplete }) => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (visibleCount < CHARACTERS.length) {
      const timer = setTimeout(() => {
        setVisibleCount(prev => prev + 1);
      }, 1000); // 1 second between each character
      return () => clearTimeout(timer);
    } else {
      const finishTimer = setTimeout(() => {
        setIsFinished(true);
      }, 1000);
      return () => clearTimeout(finishTimer);
    }
  }, [visibleCount]);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex">
      {CHARACTERS.map((char, index) => {
        const isVisible = index < visibleCount;
        return (
          <div
            key={index}
            className={`
              relative h-full flex-1 border-r border-slate-800 last:border-r-0
              transition-all duration-1000 ease-out flex flex-col items-center justify-center
              ${char.color}
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
            `}
          >
            <div className="relative w-full h-2/3 flex items-end justify-center">
              <img
                src={getAssetPath(char.image)}
                alt={char.name}
                className="max-h-[120%] w-auto object-contain object-bottom pointer-events-none transform scale-125 origin-bottom"
              />
            </div>

            <div className="h-1/3 flex flex-col items-center justify-start pt-8 px-4 text-center">
              <span className={`text-gray-400 text-xs mb-4 uppercase tracking-widest ${pressStart2P.className}`}>
                {char.name}
              </span>
              <h2 className={`text-white text-lg md:text-xl lg:text-3xl leading-relaxed ${pressStart2P.className}`}>
                {char.codename}
              </h2>
            </div>

            {/* Scanline effect for each panel */}
            <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,128,0.06))] bg-[length:100%_4px,3px_100%]" />
          </div>
        );
      })}

      {/* Continue UI */}
      {isFinished && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50">
          <button
            onClick={onComplete}
            className={`
              bg-white text-black hover:bg-gray-200 
              py-3 px-10 rounded-full font-bold
              transition-all duration-300 animate-pulse
              ${pressStart2P.className} text-xs
            `}
          >
            INITIATE RESCUE MISSION
          </button>
        </div>
      )}

      {/* Decorative Overlays */}
      <div className="absolute inset-0 pointer-events-none border-[20px] border-black/20 z-10" />
    </div>
  );
};

export default CodenameIntroAnim;
