import React from 'react';
import { PlayerInfo } from '../types/puzzle-perfect.types';
import { getAssetPath } from '@/shared/utils/game';

interface PlayerIndicatorProps {
  players: PlayerInfo[];
  currentPlayerIndex: number;
}

export const PlayerIndicator: React.FC<PlayerIndicatorProps> = ({ players, currentPlayerIndex }) => {
  return (
    <div className="flex gap-4 items-center justify-center py-4">
      {players.map((player, idx) => {
        const isActive = idx === currentPlayerIndex;
        return (
          <div key={player.id} className="flex flex-col items-center gap-1 transition-all duration-300">
            {isActive && (
              <span className="text-xs font-bold text-cyan-400 animate-bounce absolute -top-6">YOUR TURN</span>
            )}
            <div
              className={`rounded-full w-16 h-16 border-2 overflow-hidden transition-all duration-300 flex items-center justify-center ${isActive ? 'scale-110 shadow-[0_0_15px_currentColor]' : 'opacity-50 grayscale scale-90'}`}
              style={{ borderColor: isActive ? player.color : '#334155', color: player.color }}
            >
              <img
                src={getAssetPath(player.portrait)}
                alt={player.name}
                className="w-full h-full object-contain"
              />
            </div>
            {isActive && (
              <span className="text-sm font-bold tracking-wider" style={{ color: player.color }}>
                {player.name}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};
