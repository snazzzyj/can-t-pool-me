import React from 'react';
import { getAssetPath } from '@/shared/utils/game';

const PLAYERS = [
  { name: 'Rab', asset: getAssetPath('/assets/characters/Rab-1.png') },
  { name: 'Jenn', asset: getAssetPath('/assets/characters/Jenn-1.png') },
  { name: 'Joel', asset: getAssetPath('/assets/characters/Joel-1.png') },
  { name: 'Debbie', asset: getAssetPath('/assets/characters/Debbie-1.png') },
  { name: 'Elyse', asset: getAssetPath('/assets/characters/Elyse-1.png') }
];

export const CelebrationPlayers: React.FC = () => {
  return (
    <div className="flex gap-8 items-end justify-center h-48">
      {PLAYERS.map((player) => (
        <div key={player.name} className="jumping-player flex flex-col items-center">
          <img
            src={player.asset}
            alt={player.name}
            className="w-32 h-32 object-contain"
          />
          <span className="text-white text-xs mt-2 opacity-50">{player.name}</span>
        </div>
      ))}
    </div>
  );
};
