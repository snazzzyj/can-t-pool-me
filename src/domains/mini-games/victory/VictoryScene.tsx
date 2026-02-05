import React, { useState } from 'react';
import { Press_Start_2P } from 'next/font/google';
import { CelebrationPlayers } from './CelebrationPlayers';
import { Confetti } from './Confetti';
import { CreditsScene } from './CreditsScene';
import './victory.css';

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin']
});

interface VictorySceneProps {
  onComplete: () => void;
}

const VictoryScene: React.FC<VictorySceneProps> = () => {
  const [view, setView] = useState<'victory' | 'credits'>('victory');

  const handlePlayAgain = () => {
    // This will reset the entire game state and take user back to WelcomeScreen
    // assuming Home component renders WelcomeScreen when gameStarted is false 
    // or phase is 'menu'.
    // Looking at Home component: it uses gameStarted local state.
    // We might need to refresh or use a more global reset.
    // For now, let's trigger a page reload or a clean reset if possible.
    window.location.reload();
  };

  return (
    <div className={`relative w-full h-screen overflow-hidden bg-black ${pressStart2P.className}`}>
      <div
        className={`flex flex-col w-full h-full transition-transform duration-[1500ms] ease-in-out ${view === 'credits' ? '-translate-y-full' : 'translate-y-0'
          }`}
      >
        {/* Victory View Section */}
        <div className="victory-view relative w-full h-full flex flex-col items-center justify-center p-8">
          <Confetti />

          <h1 className="victory-title text-7xl text-yellow-400 mb-12 tracking-widest text-center">
            VICTORY
          </h1>

          <CelebrationPlayers />

          <div className="mt-20 flex gap-6 z-10">
            <button
              onClick={() => setView('credits')}
              className="pixel-button px-8 py-4 text-black hover:bg-purple-100 uppercase text-lg cursor-pointer"
            >
              Credits
            </button>
            <button
              onClick={handlePlayAgain}
              className="pixel-button px-8 py-4 text-black hover:bg-green-100 uppercase text-lg cursor-pointer"
            >
              Play again
            </button>
          </div>
        </div>

        {/* Credits View Section */}
        <div className="relative w-full h-full bg-black">
          {view === 'credits' && <CreditsScene onComplete={() => setView('victory')} />}
        </div>
      </div>
    </div>
  );
};

export default VictoryScene;
