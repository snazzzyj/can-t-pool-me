import React from 'react';

interface PlayerCountSelectionProps {
  onSelect: (count: number) => void;
}

const PlayerCountSelection: React.FC<PlayerCountSelectionProps> = ({ onSelect }) => {
  return (
    <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center z-50 p-10">
      <h1 className="text-4xl text-white mb-2 animate-pulse tracking-widest text-center">PIXEL RUNNER</h1>      
      <div className="p-8 border-4 border-white border-opacity-20 rounded-lg bg-black bg-opacity-40 text-center w-full max-w-2xl">
        <p className="text-xl text-white mb-8 tracking-wide">HOW MANY RUNNERS IN THE TEAM?</p>
        
        <div className="flex flex-wrap justify-center gap-4">
          {[1, 2, 3, 4, 5].map(count => (
            <button
              key={count}
              onClick={() => onSelect(count)}
              className="w-20 h-20 bg-slate-800 hover:bg-white hover:text-black border-2 border-white border-opacity-20 text-2xl font-bold transition-all transform hover:scale-110 flex items-center justify-center rounded-lg"
            >
              {count}
            </button>
          ))}
        </div>
        </div>
    </div>
  );
};

export default PlayerCountSelection;
