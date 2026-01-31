import React from 'react';
import { ANIMALS } from '../constants';

interface AnimalSelectionProps {
  currentPlayer: { codename: string; key: string; color: string; assetPath: string } | undefined;
  selectingIndex: number;
  totalToSelect: number;
  onSelect: (animalId: string) => void;
}

const AnimalSelection: React.FC<AnimalSelectionProps> = ({ currentPlayer, selectingIndex, totalToSelect, onSelect }) => {
  if (!currentPlayer) return null;

  return (
    <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center z-50 p-10 font-['Press_Start_2P'] text-white">
      <h1 className="text-4xl mb-8 text-center leading-relaxed">TEAM ASSEMBLY</h1>
      <div 
        className="p-8 border-8 rounded-lg bg-black/60 text-center w-full max-w-2xl"
        style={{ borderColor: currentPlayer.color }}
      >
        <div className="flex flex-col items-center mb-6">
          <img 
            src={currentPlayer.assetPath} 
            className="w-24 h-24 mb-4 rounded-full border-4 border-white bg-slate-800" 
            alt={currentPlayer.codename} 
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://api.dicebear.com/7.x/pixel-art/svg?seed=' + currentPlayer.codename }}
          />
          <p className="text-2xl mb-2 uppercase">{currentPlayer.codename}</p>
          <p className="text-sm text-gray-400 uppercase">JUMP CONTROL: [{currentPlayer.key}]</p>
        </div>
        
        <p className="text-xs mb-6 uppercase border-b border-white/20 pb-4">SELECT YOUR RIDE</p>
        
        <div className="grid grid-cols-3 gap-6">
          {ANIMALS.map(animal => (
            <button
              key={animal.id}
              onClick={() => onSelect(animal.id)}
              className="p-6 bg-black/40 hover:bg-white hover:text-black border-4 border-white/10 hover:border-white transition-all rounded flex flex-col items-center group"
            >
              <img 
                src={animal.assetPath} 
                alt={animal.name}
                className="w-16 h-16 mb-3 group-hover:scale-110 transition-transform object-contain"
              />
              <span className="text-[10px] uppercase font-bold">{animal.name}</span>
            </button>
          ))}
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-8 uppercase tracking-widest animate-pulse">
        {selectingIndex + 1} / {totalToSelect} MEMBERS READY
      </p>
    </div>
  );
};

export default AnimalSelection;