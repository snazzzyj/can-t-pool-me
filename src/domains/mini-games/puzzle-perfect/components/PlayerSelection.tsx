import React from 'react';

interface PlayerSelectionProps {
  onSelect: (count: number) => void;
}

export const PlayerSelection: React.FC<PlayerSelectionProps> = ({ onSelect }) => {
  return (
    <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center z-50 p-10 select-none">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800 to-slate-950" />
        <div className="absolute inset-0 bg-[url('/assets/textures/grid.png')] opacity-20" />
      </div>

      <div className="z-10 flex flex-col items-center">
        <h1 className="text-5xl font-black text-white mb-2 tracking-widest text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]">
          PUZZLE PERFECT
        </h1>

        <div className="mt-12 p-8 border-2 border-cyan-500/30 rounded-lg bg-black/50 backdrop-blur-sm text-center w-full max-w-2xl shadow-[0_0_30px_rgba(6,182,212,0.2)]">
          <p className="text-xl text-cyan-100 mb-2 tracking-wide font-mono">INITIATE CONNECTION SEQUENCE</p>
          <p className="text-sm text-slate-400 mb-6 uppercase tracking-widest">Select Players</p>

          <div className="flex flex-wrap justify-center gap-4">
            {[1, 2, 3, 4, 5].map(count => (
              <button
                key={count}
                onClick={() => onSelect(count)}
                className="w-20 h-20 bg-slate-900 hover:bg-cyan-600 border-2 border-cyan-500/50 hover:border-cyan-400 text-white text-3xl font-bold transition-all transform hover:scale-110 flex items-center justify-center rounded-lg shadow-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.6)]"
              >
                {count}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
