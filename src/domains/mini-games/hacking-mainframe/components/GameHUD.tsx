
import React from 'react';
import { MAX_LIVES, PLAYER_DISPLAY_NAMES } from '../constants';
import { PlayerKey } from '../types';

interface GameHUDProps {
  timeRemaining: number;
  currentRound: number;
  currentCommand: number;
  totalCommands: number;
  lives: number;
  roundTitle: string;
  currentPlayer: PlayerKey;
}

const GameHUD: React.FC<GameHUDProps> = ({ 
  timeRemaining, currentRound, currentCommand, totalCommands, lives, roundTitle, currentPlayer
}) => {
  const isWarning = timeRemaining <= 3;

  return (
    <div className="w-full max-w-5xl mx-auto mb-6 font-mono">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex flex-col items-start min-w-[120px]">
          <span className="text-gray-400 text-xs uppercase tracking-widest">Time Remaining</span>
          <div className={`text-4xl font-bold transition-colors ${isWarning ? 'text-red-500 animate-pulse' : 'text-white'}`}>
            {timeRemaining.toFixed(1)}s
          </div>
        </div>
        <div className="text-center">
          <div className="text-cyan-400 text-lg font-bold tracking-widest uppercase">{roundTitle}</div>
          <div className="text-white text-md mt-1">ROUND {currentRound} - COMMAND {currentCommand}/{totalCommands}</div>
        </div>
        <div className="flex flex-col items-end min-w-[150px]">
          <span className="text-gray-400 text-xs uppercase tracking-widest mb-1">Integrity Levels</span>
          <div className="flex gap-1">
            {Array.from({ length: MAX_LIVES }).map((_, i) => (
              <span key={i} className={`text-2xl transition-all duration-300 ${i < lives ? 'scale-100 opacity-100' : 'scale-75 opacity-20 grayscale'}`}>❤️</span>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full bg-green-950 bg-opacity-30 border-y border-green-800 py-3 flex items-center justify-center gap-4">
        <span className="text-green-500 uppercase tracking-tighter text-sm">Active Player:</span>
        <div className="bg-green-500 text-black px-6 py-1 rounded font-bold text-xl animate-pulse">
          {PLAYER_DISPLAY_NAMES[currentPlayer]}
        </div>
      </div>
    </div>
  );
};

export default GameHUD;
