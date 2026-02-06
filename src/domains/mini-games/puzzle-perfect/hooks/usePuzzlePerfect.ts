import { useState, useCallback, useEffect, useRef } from 'react';
import { useRoundTimer } from './useRoundTimer';
import { useLivesSystem } from './useLivesSystem';
import { generatePuzzleShape } from '../utils/puzzle-generator';
import { ROUND_CONFIGS, MAX_LIVES, PLAYERS } from '../constants/puzzle-perfect.constants';
import { PuzzlePerfectState, GameStats, RoundResult, PlayerStats } from '../types/puzzle-perfect.types';

export const usePuzzlePerfect = (
  onComplete: (stats: GameStats) => void,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _onFail?: () => void,
  playerCount: number = 5
) => {
  // Game State
  const [currentRound, setCurrentRound] = useState<1 | 2 | 3 | 4>(1);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [gameStatus, setGameStatus] = useState<PuzzlePerfectState['gameStatus']>('idle');
  const [puzzlesCompleted, setPuzzlesCompleted] = useState(0);
  const [isWarning, setIsWarning] = useState(false);
  const [isError, setIsError] = useState(false);

  // Stats
  const [roundResults, setRoundResults] = useState<RoundResult[]>([]);
  const [playerStats, setPlayerStats] = useState<PlayerStats[]>(
    Array.from({ length: playerCount }).map((_, i) => ({ playerId: i, completionTimes: [], errorCount: 0, fastestSolve: Infinity }))
  );

  // Refs for logic
  const puzzleStartTime = useRef<number>(0);

  // Current Round Config
  const roundConfig = ROUND_CONFIGS[currentRound as 1 | 2 | 3 | 4];

  // Logic: Next Puzzle
  // We need to store the current puzzle state. 
  // The rotation (user input) is better managed by the UI component or a separate hook, 
  // but "correctOrientation" must be known here.
  const [currentPuzzle, setCurrentPuzzle] = useState<{
    shape: number[][];
    correctOrientation: number;
    initialOrientation: number;
    targetHoleIndex: number;
  } | null>(null);

  // Lives System
  const { lives, loseLife, resetLives } = useLivesSystem(MAX_LIVES, PLAYERS.length);

  // Timer System
  const handleTimeExpire = useCallback(() => {
    setGameStatus('round-failed');
  }, []);

  const { timeLeft, addTime, reset: resetTimer } = useRoundTimer(
    roundConfig.timeLimit,
    gameStatus === 'playing',
    handleTimeExpire
  );

  useEffect(() => {
    // Warning at < 20%
    setIsWarning(timeLeft <= roundConfig.timeLimit * 0.2);
  }, [timeLeft, roundConfig.timeLimit]);

  // Audio refs context (if needed) or just return flags

  // --- Actions ---

  const nextPuzzle = useCallback((overrideCount?: number) => {
    // Get latest config from ref? No, currentRound dependency is fine.
    const config = ROUND_CONFIGS[currentRound as 1 | 2 | 3 | 4];
    // Using currentRound from dependency.

    // We also need roundConfig inside this callback. 
    // roundConfig is derived from currentRound, so dependent on currentRound.

    const shape = generatePuzzleShape(config.complexity);
    const correct = Math.floor(Math.random() * config.orientations);
    const initial = Math.floor(Math.random() * config.orientations);

    // Target Logic: Sequential filling 0->1->2->3->4
    // We use puzzlesCompleted to determine which hole we are on.
    // Since puzzlesCompleted resets or increments, we need to be careful.
    // In our logic, puzzlesCompleted is TOTAL game puzzles.
    // But we know we do batches of 5.
    // So puzzlesCompleted % 5 should give 0..4
    const count = overrideCount ?? puzzlesCompleted;
    const targetIndex = currentRound === 4 ? 0 : count % config.puzzlesPerPlayer;

    setCurrentPuzzle({
      shape,
      correctOrientation: correct,
      initialOrientation: initial,
      targetHoleIndex: targetIndex,
    });

    puzzleStartTime.current = Date.now();
  }, [currentRound, currentPlayerIndex, puzzlesCompleted]);

  const startRound = useCallback(() => {
    setGameStatus('playing');
    setPuzzlesCompleted(0);
    resetLives();
    setCurrentPlayerIndex(0);
    resetTimer();
    // nextPuzzle will be triggered by effect when status/index changes
  }, [resetLives, resetTimer]);

  // Ensure nextPuzzle runs when turn changes or round starts (status playing)
  useEffect(() => {
    if (gameStatus === 'playing') {
      nextPuzzle();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlayerIndex, gameStatus]);

  const advanceTurn = useCallback(() => {
    setCurrentPlayerIndex(prev => (prev + 1) % playerCount);
  }, [playerCount]);

  const handleRoundComplete = useCallback(() => {
    // Save stats
    const timeUsed = roundConfig.timeLimit - timeLeft;
    setRoundResults(prev => [...prev, {
      roundNumber: currentRound,
      completed: true,
      timeUsed,
      livesLost: (MAX_LIVES * playerCount) - lives.reduce((a, b) => a + b, 0)
    }]);

    setGameStatus('round-complete');
  }, [currentRound, timeLeft, lives, roundConfig.timeLimit]);

  const handleConfirm = useCallback((currentOrientation: number) => {
    if (gameStatus !== 'playing' || !currentPuzzle) return;

    if (currentOrientation === currentPuzzle.correctOrientation) {
      // Success
      const solveTime = Date.now() - puzzleStartTime.current;

      // Add bonus time
      addTime(3000);

      // Update stats
      setPlayerStats(prev => {
        const newStats = [...prev];
        const pStat = newStats[currentPlayerIndex];
        pStat.completionTimes.push(solveTime);
        if (solveTime < pStat.fastestSolve) pStat.fastestSolve = solveTime;
        return newStats;
      });

      const newCompleted = puzzlesCompleted + 1;
      setPuzzlesCompleted(newCompleted);

      // Check Round Win
      const needed = roundConfig.puzzlesPerPlayer * playerCount; // 25 (5*5) or 10 in frenzy
      if (newCompleted >= needed) {
        handleRoundComplete();
      } else {
        // Logic for Rounds 1-3: 5 puzzles in a row per player
        // Logic for Round 4: Frenzy (Alternate turns usually, or 2 per player as per config)

        // Check if we stay on same player or move to next
        const currentRoundNum = currentRound;
        if (currentRoundNum <= 3) {
          // Check if player has finished their batch
          // Since puzzlesPerPlayer is 5, we check if user has done 5, 10, 15 etc...
          // But we track total game puzzlesCompleted.
          // We need to know how many THIS player has done in THIS round.
          // Simplest way: if (newCompleted % roundConfig.puzzlesPerPlayer === 0) -> Next Player

          if (newCompleted % roundConfig.puzzlesPerPlayer === 0) {
            advanceTurn();
          } else {
            // SAME PLAYER, NEW PUZZLE
            nextPuzzle(newCompleted);
          }
        } else {
          // Round 4 (Frenzy) - Cycle players every puzzle
          advanceTurn();
        }
      }
    } else {
      // Failure
      loseLife(currentPlayerIndex);
      setPlayerStats(prev => {
        const newStats = [...prev];
        newStats[currentPlayerIndex].errorCount++;
        return newStats;
      });

      // Failure behavior varies by round
      if (currentRound <= 3) {
        // Rounds 1-3: Don't advance turn, just retry or new puzzle? 
        // "Must solve 5 in a row" implies they keep trying till they get 5.
        // User said "each player must solve 5 puzzles in a row".
        // Usually if you fail, you lose a life but stay on same puzzle or get new one.
        // Let's stay on same puzzle (retry) for simplicity and fairness, or could shuffle.
        // Existing logic was 'advanceTurn' after small delay.
        // We REMOVE advanceTurn here.

        // Optional: Re-shuffle puzzle on fail? or just let them retry orientation?
        // Let's keep same puzzle (allow retry of orientation)
      } else {
        // Round 4 or others: Advance turn on fail (Frenzy style)
        setTimeout(() => {
          advanceTurn();
        }, 500);
      }

      // Flash Red Effect
      setIsError(true);
      setTimeout(() => setIsError(false), 500);
    }
  }, [
    gameStatus,
    currentPuzzle,
    currentPlayerIndex,
    puzzlesCompleted,
    roundConfig,
    handleRoundComplete,
    advanceTurn,
    loseLife
  ]);

  const advanceRound = useCallback(() => {
    if (currentRound < 4) {
      // @ts-ignore
      setCurrentRound(prev => (prev + 1));
      startRound();
    } else {
      // Game Over - Show Results
      setGameStatus('game-complete');
    }
  }, [currentRound, startRound]);

  const finishGame = useCallback(() => {
    const totalTime = roundResults.reduce((acc, r) => acc + r.timeUsed, 0);
    const totalErrors = playerStats.reduce((acc, p) => acc + p.errorCount, 0);
    onComplete({ playerStats, roundResults, totalTime, totalErrors });
  }, [roundResults, playerStats, onComplete]);

  const retryRound = useCallback(() => {
    startRound();
  }, [startRound]);

  return {
    state: {
      currentRound,
      currentPlayerIndex,
      gameStatus,
      lives,
      timeLeft,
      currentPuzzle,
      puzzlesCompleted,
      isWarning,
      isError,
      roundConfig,
      playerStats
    },
    actions: {
      startRound,
      handleConfirm,
      advanceRound,
      retryRound,
      finishGame
    }
  };
};
