
import React, { memo } from 'react';
import { LevelType, PlayerData } from '../types';
import { LEVELS } from '../constants';

interface HUDProps {
  timer: number;
  level: LevelType;
  players: PlayerData[];
}

const HUD: React.FC<HUDProps> = memo(({ timer, level }) => {
  const isUrgent = timer <= 10;
  
  return (
    <div className="w-full bg-black py-4 px-10 flex justify-between items-center border-b-2 border-white border-opacity-20">
      <div className="flex flex-col">
        <span className="text-xs text-gray-400 mb-1">LEVEL INFO</span>
        <span className="text-lg text-white font-bold">{LEVELS[level].name}</span>
      </div>
      
      <div className="flex flex-col items-center">
        <span className="text-[10px] text-gray-400 mb-1">TIME REMAINING</span>
        <span className={`text-4xl font-mono ${isUrgent ? 'text-red-600 animate-pulse' : 'text-white'}`}>
          {Math.floor(timer / 60).toString().padStart(2, '0')}:
          {Math.floor(timer % 60).toString().padStart(2, '0')}
        </span>
      </div>

      <div className="flex flex-col items-end">
        <span className="text-xs text-gray-400 mb-1">MISSION</span>
        <span className="text-sm text-green-500">RUN & JUMP!</span>
      </div>
    </div>
  );
});

HUD.displayName = 'HUD';

export default HUD;
