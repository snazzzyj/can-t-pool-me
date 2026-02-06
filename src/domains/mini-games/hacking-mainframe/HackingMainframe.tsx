import React, { useEffect, useState } from 'react';
import { GameStatus } from './types';
import { useHackingMainframe } from './hooks/useHackingMainframe';
import MatrixBackground from './components/MatrixBackground';
import PreGameInstructions from './components/PreGameInstructions';
import GameHUD from './components/GameHUD';
import TerminalWindow from './components/TerminalWindow';
import StatsScreen from './components/StatsScreen';
import { useBackgroundMusic } from '@/shared/hooks/useBackgroundMusic';
import { HACKING_MAINFRAME_AUDIO } from './audio/audioConfig';

interface HackingMainframeProps {
  onComplete: () => void;
}

const HackingMainframe: React.FC<HackingMainframeProps> = ({ onComplete }) => {
  const {
    status, roundIdx, commandIdx, typedChars, errorIdx, lives, timeRemaining, shake,
    currentRound, currentCommand, currentRoundStats, currentPlayer, initRound, startCommand, VILLAIN_ADDRESS
  } = useHackingMainframe();

  const [countdown, setCountdown] = useState(3);

  // Start background music when game enters playing state
  useBackgroundMusic(
    status === GameStatus.PRE_GAME || status === GameStatus.PLAYING || status === GameStatus.COUNTDOWN
      ? HACKING_MAINFRAME_AUDIO.backgroundMusic
      : undefined,
    0.5
  );

  useEffect(() => {
    if (status === GameStatus.COUNTDOWN) {
      setCountdown(3);
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            startCommand();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [status, startCommand]);

  return (
    <div className="relative w-full h-full min-h-screen bg-black text-white overflow-hidden flex flex-col items-center justify-center font-mono">
      <MatrixBackground />

      {status === GameStatus.PRE_GAME && <PreGameInstructions onStart={() => initRound(0)} />}

      {(status === GameStatus.PLAYING || status === GameStatus.COUNTDOWN) && (
        <div className="z-10 w-full max-w-5xl px-4 flex flex-col items-center">
          <GameHUD
            timeRemaining={timeRemaining} currentRound={roundIdx + 1}
            currentCommand={commandIdx + 1} totalCommands={currentRound.commands.length}
            lives={lives} roundTitle={currentRound.title} currentPlayer={currentPlayer}
          />
          <TerminalWindow commandText={currentCommand?.text || ''} typedIndex={typedChars} errorIndex={errorIdx} shake={shake} />

          <div className="mt-8 text-gray-500 text-xs uppercase tracking-widest text-center max-w-2xl border border-gray-900 p-2 rounded bg-black bg-opacity-50">
            RELAY PROTOCOL: Hand over keyboard to {currentPlayer.toUpperCase()}
          </div>

          {status === GameStatus.COUNTDOWN && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-20">
              <div className="text-center">
                <div className="text-cyan-400 text-2xl font-bold mb-4 animate-pulse">INITIATING ROUND BREACH...</div>
                <div className="text-[12rem] font-bold text-green-500 animate-ping">{countdown > 0 ? countdown : 'GO!'}</div>
              </div>
            </div>
          )}
        </div>
      )}

      {status === GameStatus.ROUND_FAILED && (
        <div className="z-30 fixed inset-0 flex items-center justify-center bg-red-900 bg-opacity-40 backdrop-blur-sm">
          <div className="bg-black border-4 border-red-500 p-12 rounded-lg text-center shadow-[0_0_50px_rgba(239,68,68,0.5)]">
            <h2 className="text-6xl font-bold text-red-500 mb-6 uppercase">Connection Lost</h2>
            <button onClick={() => initRound(roundIdx)} className="bg-red-600 hover:bg-red-500 text-white px-10 py-4 rounded-full text-2xl font-bold">RETRY BREACH</button>
          </div>
        </div>
      )}

      {status === GameStatus.ROUND_COMPLETE && currentRoundStats && (
        <StatsScreen stats={currentRoundStats} onContinue={() => initRound(roundIdx + 1)} />
      )}

      {status === GameStatus.VICTORY && currentRoundStats && (
        <StatsScreen stats={currentRoundStats} isVictory address={VILLAIN_ADDRESS} onContinue={onComplete} />
      )}
    </div>
  );
};

export default HackingMainframe;