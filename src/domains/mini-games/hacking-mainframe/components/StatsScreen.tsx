
import React from 'react';
import { PLAYER_DISPLAY_NAMES } from '../constants';
import { RoundStat, PlayerKey } from '../types';

interface StatsScreenProps {
  stats: RoundStat;
  isVictory?: boolean;
  address?: string;
  onContinue: () => void;
}

const StatsScreen: React.FC<StatsScreenProps> = ({ stats, isVictory, address, onContinue }) => {
  const wpm = Math.round((stats.correctKeypresses / 5) / (stats.timeElapsed / 60) || 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95 p-4 font-mono">
      <div className={`max-w-2xl w-full border-4 ${isVictory ? 'border-yellow-500' : 'border-cyan-500'} p-10 rounded-lg shadow-2xl bg-black`}>
        <h2 className={`text-4xl text-center font-bold mb-8 ${isVictory ? 'text-yellow-500' : 'text-cyan-500'}`}>
          {isVictory ? 'MAINFRAME BREACHED!' : `ROUND ${stats.round} COMPLETE!`}
        </h2>
        <div className="space-y-6">
          <div className="flex justify-between text-2xl border-b border-gray-800 pb-2">
            <span className="text-gray-400 uppercase">Overall WPM:</span>
            <span className="text-white font-bold">{wpm}</span>
          </div>
          <div>
            <h3 className="text-xl text-gray-400 mb-4 uppercase">Team Accuracy Profile:</h3>
            <div className="space-y-3">
              {(Object.keys(stats.playerAccuracy) as PlayerKey[]).map((player) => {
                const pStat = stats.playerAccuracy[player];
                const accuracy = pStat.total > 0 ? Math.round((pStat.correct / pStat.total) * 100) : 100;
                return (
                  <div key={player} className="flex justify-between items-center">
                    <span className="text-gray-300">{PLAYER_DISPLAY_NAMES[player]}</span>
                    <div className="flex items-center gap-4">
                      <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 transition-all duration-1000" style={{ width: `${accuracy}%` }} />
                      </div>
                      <span className="w-12 text-right font-bold text-green-400">{accuracy}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {isVictory && address && (
            <div className="mt-8 p-6 bg-yellow-900 bg-opacity-30 border border-yellow-500 rounded-lg animate-fade-in">
              <h4 className="text-yellow-400 font-bold mb-2 uppercase tracking-widest text-center">Villain Hideout Located:</h4>
              <p className="text-white text-2xl font-bold text-center italic">{address}</p>
            </div>
          )}
        </div>
        <div className="mt-10 text-center">
          <button 
            onClick={onContinue}
            className={`px-8 py-3 text-2xl font-bold rounded-full transition-all hover:scale-105 active:scale-95 ${
              isVictory ? 'bg-yellow-500 text-black' : 'bg-cyan-500 text-black'
            }`}
          >
            {isVictory ? 'EXIT SYSTEM' : 'NEXT BREACH (Cmd+Enter)'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatsScreen;
