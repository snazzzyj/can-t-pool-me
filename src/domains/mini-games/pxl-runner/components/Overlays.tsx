
import React from 'react';
import { GameState, LevelType } from '../types';
import { LEVELS } from '../constants';

interface OverlaysProps {
  gameState: GameState;
  currentLevel: LevelType;
  countdown: number;
  onRestart: () => void;
}

const Overlays: React.FC<OverlaysProps> = ({ gameState, currentLevel, countdown, onRestart }) => {
  if (gameState === GameState.COUNTDOWN) {
    return (
      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center z-[100]">
        <span className="text-9xl text-white font-black drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] animate-ping">
          {countdown}
        </span>
      </div>
    );
  }

  if (gameState === GameState.PAUSED) {
    return (
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center z-[100]">
        <h2 className="text-6xl text-white font-bold mb-4">PAUSED</h2>
        <p className="text-xl text-gray-300">PRESS [ESC] TO RESUME</p>
      </div>
    );
  }

  if (gameState === GameState.TRANSITION) {
    return (
      <div className="absolute inset-0 bg-black flex flex-col items-center justify-center z-[100] animate-in fade-in duration-500">
        <p className="text-xl text-gray-400 mb-4 uppercase">LEVEL COMPLETE!</p>
        <h2 className="text-5xl text-white font-bold text-center">
          PREPARING FOR {LEVELS[currentLevel].name}
        </h2>
      </div>
    );
  }

  if (gameState === GameState.GAME_OVER) {
    return (
      <div className="absolute inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-[100]">
        <h2 className="text-7xl text-red-600 font-bold mb-8">GAME OVER</h2>
        <p className="text-white mb-12 text-center max-w-md">THE TEAM FAILED TO REACH THE TARGET IN TIME.</p>
        <button 
          onClick={onRestart}
          className="px-10 py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-xl rounded shadow-lg transition-transform hover:scale-105 active:scale-95"
        >
          TRY AGAIN
        </button>
      </div>
    );
  }

  if (gameState === GameState.VICTORY) {
    return (
      <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center z-[100]">
        <div className="animate-bounce mb-8">
           <span className="text-9xl">🏆</span>
        </div>
        <h2 className="text-7xl text-yellow-400 font-bold mb-4 drop-shadow-lg">VICTORY</h2>
        <p className="text-white text-xl text-center max-w-2xl px-10 leading-relaxed">
          YOU HAVE REACHED THE VILLAIN'S HIDEOUT!
        </p>
        <p className="mt-20 text-[10px] text-gray-500 animate-pulse">PROCEEDING TO NEXT MISSION...</p>
      </div>
    );
  }

  return null;
};

export default Overlays;
