
import React from 'react';
import { PLAYER_DISPLAY_NAMES, PLAYER_ORDER } from '../constants';

interface PreGameInstructionsProps {
  onStart: () => void;
}

const PreGameInstructions: React.FC<PreGameInstructionsProps> = ({ onStart }) => {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
      onClick={onStart}
    >
      <div className="max-w-4xl w-full border-4 border-green-500 p-8 rounded-lg shadow-[0_0_30px_rgba(34,197,94,0.3)] bg-black font-mono">
        <h1 className="text-4xl text-center text-green-500 font-bold mb-8 animate-pulse">
          HACKING THE MAINFRAME
        </h1>
        
        <p className="text-xl text-green-400 mb-8 text-center uppercase tracking-widest">
          RELAY MODE INITIALIZED
        </p>

        <div className="bg-green-950 bg-opacity-30 border border-green-800 p-6 rounded-lg mb-8">
          <h2 className="text-green-300 text-lg font-bold mb-4 border-b border-green-800 pb-2">HOW TO PLAY:</h2>
          <ul className="text-gray-300 space-y-3 list-disc pl-5">
            <li>This is a <strong>relay race</strong>. Players take turns typing full commands.</li>
            <li>Each player must move to the keyboard when their turn is signaled.</li>
            <li>Complete <strong>5 commands</strong> per round (one for each team member).</li>
            <li>Watch the <span className="text-white font-bold">TURN INDICATOR</span> to see who is up next.</li>
          </ul>
        </div>

        <div className="flex justify-center items-center gap-4 mb-8">
          {PLAYER_ORDER.map((player, idx) => (
            <div key={player} className="flex flex-col items-center">
              <div className="w-12 h-12 bg-green-900 border border-green-500 rounded-full flex items-center justify-center font-bold text-white mb-2">
                {idx + 1}
              </div>
              <span className="text-[10px] text-green-500 text-center w-20 leading-tight">
                {PLAYER_DISPLAY_NAMES[player]}
              </span>
            </div>
          ))}
        </div>

        <div className="text-center animate-bounce text-2xl text-yellow-500 font-bold">
          PRESS ANY KEY TO INITIALIZE RELAY...
        </div>
      </div>
    </div>
  );
};

export default PreGameInstructions;
