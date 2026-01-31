import React, { useMemo } from 'react';
import { PlayerStats } from '../types/puzzle-perfect.types';
import { PLAYERS } from '../constants/puzzle-perfect.constants';

interface GameResultsProps {
  playerStats: PlayerStats[];
  onExit: () => void;
}

export const GameResults: React.FC<GameResultsProps> = ({ playerStats, onExit }) => {
  const enrichedStats = useMemo(() => {
    return playerStats.map(stat => {
      const player = PLAYERS[stat.playerId];
      const totalSolves = stat.completionTimes.length;
      const totalTime = stat.completionTimes.reduce((a, b) => a + b, 0);
      const avgTime = totalSolves > 0 ? totalTime / totalSolves : 0;

      return {
        ...stat,
        player,
        totalSolves,
        avgTime,
        // If fastestSolve is Infinity, treat as 0 or N/A
        displayFastest: stat.fastestSolve === Infinity ? '-' : (stat.fastestSolve / 1000).toFixed(2) + 's',
        displayAvg: (avgTime / 1000).toFixed(2) + 's'
      };
    });
  }, [playerStats]);

  // Find winner? (Least errors? Or fastest time? Usually puzzle games are about speed/accuracy)
  // For now just listing them.

  return (
    <div className="absolute inset-0 bg-slate-950/95 z-50 flex flex-col items-center justify-center animate-fade-in p-4 overflow-hidden">
      <h2 className="text-4xl font-black text-cyan-400 mb-1 tracking-widest uppercase">Mission Debrief</h2>
      <p className="text-slate-400 mb-4 tracking-widest uppercase text-sm">Performance Analysis Complete</p>

      <div className="w-full max-w-4xl bg-slate-900/50 border border-slate-700/50 rounded-lg overflow-hidden backdrop-blur mb-4 flex-1 max-h-[60vh] flex flex-col">
        <div className="grid grid-cols-6 bg-slate-800/80 p-3 font-bold text-slate-300 text-sm uppercase tracking-wider text-center flex-shrink-0">
          <div className="col-span-2 text-left pl-4">Operative</div>
          <div>Solves</div>
          <div>Errors</div>
          <div>Fastest</div>
          <div>Avg Time</div>
        </div>

        <div className="divide-y divide-slate-800/50 overflow-y-auto custom-scrollbar">
          {enrichedStats.map((stat) => (
            <div key={stat.playerId} className="grid grid-cols-6 p-3 items-center text-center hover:bg-slate-800/30 transition-colors">
              <div className="col-span-2 flex items-center gap-3 pl-4">
                <div
                  className="w-2 h-8 rounded-full shadow-[0_0_10px_currentColor]"
                  style={{ backgroundColor: stat.player.color, color: stat.player.color }}
                />
                <div className="flex flex-col items-start">
                  <span className="font-bold text-base text-white">{stat.player.name}</span>
                  <span className="text-[10px] text-slate-500 uppercase">Unit {stat.player.id}</span>
                </div>
              </div>

              <div className="text-cyan-300 font-mono text-base">{stat.totalSolves}</div>
              <div className={`${stat.errorCount > 0 ? 'text-red-400' : 'text-emerald-400'} font-mono text-base`}>
                {stat.errorCount}
              </div>
              <div className="text-yellow-300 font-mono text-sm">{stat.displayFastest}</div>
              <div className="text-slate-300 font-mono text-sm">{stat.displayAvg}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4 flex-shrink-0">
        <button
          onClick={onExit}
          className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded shadow-[0_0_20px_rgba(8,145,178,0.5)] transition-all transform hover:scale-105 uppercase tracking-widest text-sm"
        >
          Next
        </button>
      </div>
    </div>
  );
};
