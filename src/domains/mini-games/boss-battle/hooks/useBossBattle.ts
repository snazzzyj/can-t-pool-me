import { useState, useCallback, useEffect } from 'react';
import { GameStatus, PlayerResult } from '../types';
import { TIMING_LEVELS, PLAYER_CONFIG, SCORING, FINAL_LEVEL_CONFIG } from '../constants';

export const useBossBattle = (onVictory: (score: number) => void) => {
  const [currentLevel, setCurrentLevel] = useState<1 | 2 | 3 | 4>(1);
  const [status, setStatus] = useState<GameStatus>('instructions');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [playerResults, setPlayerResults] = useState<Record<number, PlayerResult | null>>({
    1: null, 2: null, 3: null, 4: null, 5: null
  });
  const [isVillainHit, setIsVillainHit] = useState(false);

  // Initialize level
  const startLevel = useCallback((level: number) => {
    setCurrentLevel(level as any);
    setPlayerResults({ 1: null, 2: null, 3: null, 4: null, 5: null });
    if (level <= 3) {
      const config = TIMING_LEVELS[level as 1 | 2 | 3];
      setTimeLeft(config.timeLimit);
      setStatus('playing');
    } else {
      setTimeLeft(FINAL_LEVEL_CONFIG.timeLimit);
      setStatus('playing');
    }
  }, []);

  const handleTimingPress = useCallback((playerId: number, position: number) => {
    if (status !== 'playing' || currentLevel > 3 || playerResults[playerId]) return;

    const levelConfig = TIMING_LEVELS[currentLevel as 1 | 2 | 3];
    const halfZone = levelConfig.greenZoneSize / 2;
    const center = 50;
    const distanceFromCenter = Math.abs(position - center);

    const hitGreenZone = distanceFromCenter <= halfZone;
    const hitPerfectZone = distanceFromCenter <= halfZone * 0.2;

    let points = 0;
    if (hitPerfectZone) points = SCORING.PERFECT_HIT;
    else if (hitGreenZone) points = SCORING.GOOD_HIT;

    setPlayerResults(prev => ({
      ...prev,
      [playerId]: {
        playerId: playerId as 1 | 2 | 3 | 4 | 5,
        characterName: PLAYER_CONFIG.find(p => p.id === playerId)?.name || '',
        keyPressed: true,
        pressTimestamp: Date.now(),
        linePosition: position,
        hitGreenZone,
        hitPerfectZone,
        pointsEarned: points
      }
    }));

    setScore(prev => prev + points);
  }, [currentLevel, status, playerResults]);

  const handleFinalPress = useCallback(() => {
    setScore(prev => prev + SCORING.FINAL_PRESS_POINTS);
  }, []);

  // Timer logic for levels 1-3
  useEffect(() => {
    if (status !== 'playing' || currentLevel > 3) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [status, currentLevel]);

  // Check level completion
  useEffect(() => {
    if (status !== 'playing' || currentLevel > 3) return;

    const allPressed = Object.values(playerResults).every(r => r !== null);
    const timeOut = timeLeft === 0;

    if (allPressed || timeOut) {
      // Stay in playing but disable further inputs for 2 seconds
      setStatus('between-levels'); // Temporary state to freeze the bars

      setTimeout(() => {
        const results = Object.values(playerResults);
        const successes = results.filter(r => r?.hitGreenZone).length;
        const passed = successes >= 3;

        if (passed) {
          // Handle success
          const allSucceeded = successes === 5;
          if (allSucceeded) {
            setScore(prev => prev + SCORING.ALL_SUCCESS_BONUS);
          }
          setScore(prev => prev + SCORING.LEVEL_COMPLETE_BONUS);

          setIsVillainHit(true);
          setTimeout(() => {
            setIsVillainHit(false);
            if (currentLevel < 3) {
              startLevel(currentLevel + 1);
            } else {
              startLevel(4);
            }
          }, 2000);
        } else {
          setStatus('retry');
        }
      }, 2000);
    }
  }, [playerResults, timeLeft, status, currentLevel, startLevel]);

  const handleFinalComplete = useCallback((success: boolean) => {
    if (success) {
      setScore(prev => prev + SCORING.FINAL_COMPLETION_BONUS);
      setStatus('victory');
      setTimeout(() => onVictory(score + SCORING.FINAL_COMPLETION_BONUS), 3000);
    } else {
      setStatus('retry');
    }
  }, [onVictory, score]);

  const retry = useCallback(() => {
    setScore(0);
    startLevel(1);
  }, [startLevel]);

  return {
    currentLevel,
    status,
    score,
    timeLeft,
    playerResults,
    isVillainHit,
    setStatus,
    startLevel,
    handleTimingPress,
    handleFinalPress,
    handleFinalComplete,
    retry
  };
};
