import React from 'react';

interface GameTimerProps {
  timeLimit: number;
  timeLeft: number;
  isWarning: boolean;
}

export const GameTimer: React.FC<GameTimerProps> = ({ timeLimit, timeLeft, isWarning }) => {
  const percentage = Math.max(0, (timeLeft / timeLimit) * 100);

  return (
    <div className="w-[300px] h-6 bg-slate-900 border-2 border-cyan-500 rounded-sm relative overflow-hidden shadow-[0_0_10px_rgba(6,182,212,0.5)]">
      <div
        className={`h-full transition-all duration-100 ease-linear ${isWarning ? 'bg-red-500 animate-pulse' : 'bg-cyan-500'}`}
        style={{ width: `${Math.min(100, percentage)}%` }}
      />
      <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white drop-shadow-md">
        {(timeLeft / 1000).toFixed(1)}s
      </div>
      {isWarning && (
        <div className="absolute top-0 right-1 text-xs text-red-500 font-bold animate-ping">!</div>
      )}
    </div>
  );
};
