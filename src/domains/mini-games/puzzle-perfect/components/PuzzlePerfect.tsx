import React, { useEffect, useState } from 'react';
import { usePuzzlePerfect } from '../hooks/usePuzzlePerfect';
import { usePuzzleRotation } from '../hooks/usePuzzleRotation';
import { PuzzlePiece } from './PuzzlePiece';
import { TargetHole } from './TargetHole';
import { GameTimer } from './GameTimer';
import { LivesDisplay } from './LivesDisplay';
import { PlayerIndicator } from './PlayerIndicator';
import { PLAYERS } from '../constants/puzzle-perfect.constants';
import { GameStats } from '../types/puzzle-perfect.types';
import { PlayerSelection } from './PlayerSelection';
import { GameResults } from './GameResults';

interface PuzzlePerfectProps {
  onComplete: (stats: GameStats) => void;
  onFail?: () => void;
}

export const PuzzlePerfect: React.FC<PuzzlePerfectProps> = ({ onComplete, onFail }) => {
  const [showSelection, setShowSelection] = useState(true);
  const [playerCount, setPlayerCount] = useState(5);

  const {
    state,
    state: {
      currentRound,
      currentPlayerIndex,
      gameStatus,
      lives,
      timeLeft,
      currentPuzzle,
      roundConfig,
      playerStats,
      isError
    },
    actions: {
      startRound,
      handleConfirm,
      advanceRound,
      retryRound,
      finishGame
    }
  } = usePuzzlePerfect(onComplete, onFail, playerCount);

  // Filter players based on selection
  const activePlayers = PLAYERS.slice(0, playerCount);

  // Rotation Logic
  // We need to pass the INITIAL orientation to the hook, but ONLY when the puzzle changes.
  // The hook internal state persists. We use resetOrientation when puzzle changes.
  const { orientation, rotate, resetOrientation } = usePuzzleRotation(
    roundConfig.orientations,
    currentPuzzle?.initialOrientation || 0
  );

  // Reset rotation when puzzle changes
  useEffect(() => {
    if (currentPuzzle) {
      resetOrientation(currentPuzzle.initialOrientation);
    }
  }, [currentPuzzle, resetOrientation]);

  // Keyboard Controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showSelection) return; // Disable game controls during selection

      if (gameStatus !== 'playing') {
        // Space to start/retry if invalid state?
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        rotate();
        // Play SFX
      } else if (e.code === 'Enter') {
        e.preventDefault();
        handleConfirm(orientation);
        // Play SFX
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStatus, rotate, handleConfirm, orientation, showSelection]);

  // Initial Start
  const handlePlayerSelect = (count: number) => {
    setPlayerCount(count);
    setShowSelection(false);
    // Game will start via effect below or we trigger it?
    // usePuzzlePerfect likely waits for 'idle' status to be changed or startRound called.
  };

  useEffect(() => {
    if (!showSelection && gameStatus === 'idle') {
      startRound();
    }
  }, [gameStatus, startRound, showSelection]);

  // Render Helpers
  const currentPlayer = activePlayers[currentPlayerIndex];

  // Safe guard if current player is undefined (shouldn't happen with correct logic)
  if (!currentPlayer && !showSelection) return null;

  if (showSelection) {
    return <PlayerSelection onSelect={handlePlayerSelect} />;
  }

  return (
    <div className="relative w-full h-full bg-slate-950 text-white overflow-hidden flex flex-col items-center justify-between p-8 font-mono select-none">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800 to-slate-950" />
        {/* Grid pattern created with CSS */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent),
                            linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Red Flash Overlay */}
      {isError && (
        <div className="absolute inset-0 bg-red-600/40 z-[100] pointer-events-none animate-pulse" />
      )}

      {/* Top HUD */}
      <div className="w-full flex justify-between items-center z-10 pr-24">
        <GameTimer
          timeLimit={roundConfig.timeLimit}
          timeLeft={timeLeft}
          isWarning={timeLeft < roundConfig.timeLimit * 0.2}
        />

        <LivesDisplay lives={lives[currentPlayerIndex]} />
      </div>

      {/* Primary Round Title - Perfectly Centered at Top */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-10 pointer-events-none">
        <h2 className="text-xl font-bold tracking-widest text-cyan-400">ROUND {currentRound}/4</h2>
        <span className="text-xs text-slate-400 uppercase tracking-widest">{roundConfig.label}</span>
      </div>

      {/* Player Indicators */}
      <div className="w-full z-10 mt-4">
        <PlayerIndicator players={activePlayers} currentPlayerIndex={currentPlayerIndex} />
      </div>

      {/* Main Game Area */}
      <div className="flex-1 w-full flex items-center justify-center relative z-20">

        {/* Large Middle Round Title (Watermark) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none z-0 opacity-10">
          <h2 className="text-[120px] font-black tracking-tighter text-cyan-900 uppercase">ROUND {currentRound}</h2>
          <span className="text-2xl text-cyan-800 uppercase tracking-[1em] -mt-6">
            {roundConfig.label}
          </span>
        </div>

        {/* Game Content */}
        {gameStatus === 'playing' && currentPuzzle && (
          <div className="relative w-full max-w-4xl h-96 flex items-center justify-center">

            {/* Target Holes */}
            <div className={`flex w-full px-12 items-center absolute ${currentRound === 4 ? 'justify-center' : 'justify-between'}`}>
              {currentRound === 4 ? (
                <TargetHole
                  key="frenzy-hole"
                  shape={currentPuzzle.shape}
                  isActive={true}
                  isFilled={false}
                  color={currentPlayer.color}
                  ghostOrientation={orientation}
                  totalOrientations={roundConfig.orientations}
                  correctOrientation={currentPuzzle.correctOrientation}
                />
              ) : (
                Array.from({ length: roundConfig.puzzlesPerPlayer }).map((_, idx) => (
                  <TargetHole
                    key={idx}
                    shape={currentPuzzle.shape}
                    isActive={idx === currentPuzzle.targetHoleIndex}
                    isFilled={idx < (state.puzzlesCompleted % roundConfig.puzzlesPerPlayer)}
                    color={currentPlayer.color}
                    ghostOrientation={orientation}
                    totalOrientations={roundConfig.orientations}
                    correctOrientation={currentPuzzle.correctOrientation}
                  />
                ))
              )}
            </div>

            {/* Active Piece (Floating) */}
            <div
              className="absolute transition-all duration-300 pointer-events-none"
              style={{
                top: '0%'
              }}
            >
              <PuzzlePiece
                shape={currentPuzzle.shape}
                orientation={orientation}
                totalOrientations={roundConfig.orientations}
                color={currentPlayer.color}
                isActive={true}
              />
              <div className="text-xs text-center mt-4 text-cyan-200 opacity-70 animate-pulse">
                SPACE to Rotate
              </div>
            </div>

          </div>
        )}

        {/* Failed / Complete Screens */}
        {(gameStatus === 'round-failed') && (
          <div className="absolute inset-0 bg-red-950/90 z-50 flex flex-col items-center justify-center animate-fade-in">
            <h2 className="text-6xl font-black text-red-500 mb-4 tracking-widest">ROUND FAILED</h2>
            <p className="text-xl text-red-200 mb-8">CONNECTION TERMINATED</p>
            <button
              onClick={retryRound}
              className="px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded shadow-[0_0_20px_rgba(220,38,38,0.5)] transition-all transform hover:scale-105"
            >
              SYSTEM REBOOT
            </button>
          </div>
        )}

        {(gameStatus === 'round-complete') && (
          <div className="absolute inset-0 bg-cyan-950/90 z-50 flex flex-col items-center justify-center animate-fade-in">
            <h2 className="text-6xl font-black text-cyan-400 mb-4 tracking-widest">ACCESS GRANTED</h2>
            <p className="text-xl text-cyan-200 mb-8">Security Layer {currentRound} Bypassed</p>
            <button
              onClick={advanceRound}
              className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded shadow-[0_0_20px_rgba(8,145,178,0.5)] transition-all transform hover:scale-105"
            >
              {currentRound < 4 ? `PROCEED TO LAYER ${currentRound + 1}` : 'SYSTEM OVERRIDE COMPLETE'}
            </button>
          </div>
        )}

        {/* Results Screen */}
        {(gameStatus === 'game-complete') && (
          <GameResults
            playerStats={playerStats}
            onExit={finishGame}
          />
        )}

      </div>

      {/* Footer Instructions */}
      <div className="w-full text-center text-slate-500 text-xs tracking-widest uppercase">
        Use [SPACE] to Rotate • [ENTER] to lock in Data Packet
      </div>
    </div>
  );
};
