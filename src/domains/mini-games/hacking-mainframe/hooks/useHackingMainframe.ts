
import { useState, useEffect, useCallback, useRef } from 'react';
import { GameStatus, RoundStat, PlayerStats } from '../types';
import { ROUNDS_DATA, MAX_LIVES, PLAYER_ORDER, VILLAIN_ADDRESS } from '../constants';

export const useHackingMainframe = () => {
  const [status, setStatus] = useState<GameStatus>(GameStatus.PRE_GAME);
  const [roundIdx, setRoundIdx] = useState(0);
  const [commandIdx, setCommandIdx] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const [errorIdx, setErrorIdx] = useState<number | null>(null);
  const [lives, setLives] = useState(MAX_LIVES);
  const [timeRemaining, setTimeRemaining] = useState(10);
  const [shake, setShake] = useState(false);

  const [roundStartTime, setRoundStartTime] = useState(0);
  const [currentRoundStats, setCurrentRoundStats] = useState<RoundStat | null>(null);
  const [playerAccuracy, setPlayerAccuracy] = useState<Record<string, PlayerStats>>({
    rab: { correct: 0, total: 0 },
    elyse: { correct: 0, total: 0 },
    debbie: { correct: 0, total: 0 },
    jenn: { correct: 0, total: 0 },
    joel: { correct: 0, total: 0 },
  });

  const timerRef = useRef<number | null>(null);

  const currentRound = ROUNDS_DATA[roundIdx];
  const currentCommand = currentRound?.commands[commandIdx];
  const currentPlayer = PLAYER_ORDER[commandIdx % PLAYER_ORDER.length];

  const initRound = useCallback((rIdx: number) => {
    setRoundIdx(rIdx);
    setCommandIdx(0);
    setTypedChars(0);
    setLives(MAX_LIVES);
    setErrorIdx(null);
    setPlayerAccuracy({
      rab: { correct: 0, total: 0 },
      elyse: { correct: 0, total: 0 },
      debbie: { correct: 0, total: 0 },
      jenn: { correct: 0, total: 0 },
      joel: { correct: 0, total: 0 },
    });
    setRoundStartTime(Date.now());
    setStatus(GameStatus.COUNTDOWN);
  }, []);

  const startCommand = useCallback(() => {
    const cmd = ROUNDS_DATA[roundIdx]?.commands[commandIdx];
    if (cmd) {
      setTimeRemaining(cmd.timeLimit);
      setStatus(GameStatus.PLAYING);
    }
  }, [roundIdx, commandIdx]);

  const failRound = useCallback(() => {
    setStatus(GameStatus.ROUND_FAILED);
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  const nextCommand = useCallback(() => {
    if (commandIdx + 1 < (currentRound?.commands.length || 0)) {
      const nextIdx = commandIdx + 1;
      setCommandIdx(nextIdx);
      setTypedChars(0);
      setErrorIdx(null);
      const nextCmd = currentRound.commands[nextIdx];
      setTimeRemaining(nextCmd.timeLimit);
      setStatus(GameStatus.PLAYING);
    } else {
      const timeElapsed = (Date.now() - roundStartTime) / 1000;
      const stats: RoundStat = {
        round: currentRound?.id || 0,
        totalKeypresses: (Object.values(playerAccuracy) as PlayerStats[]).reduce((acc: number, curr: PlayerStats) => acc + curr.total, 0),
        correctKeypresses: (Object.values(playerAccuracy) as PlayerStats[]).reduce((acc: number, curr: PlayerStats) => acc + curr.correct, 0),
        incorrectKeypresses: MAX_LIVES - lives,
        timeElapsed,
        playerAccuracy,
      };
      setCurrentRoundStats(stats);

      if (roundIdx + 1 < ROUNDS_DATA.length) {
        setStatus(GameStatus.ROUND_COMPLETE);
      } else {
        setStatus(GameStatus.VICTORY);
      }

      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [commandIdx, currentRound, playerAccuracy, roundStartTime, lives, roundIdx]);

  useEffect(() => {
    if (status === GameStatus.PLAYING) {
      timerRef.current = window.setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 0.1) {
            failRound();
            return 0;
          }
          return prev - 0.1;
        });
      }, 100);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [status, failRound]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (['Control', 'Alt', 'Meta', 'Shift', 'CapsLock', 'Tab'].includes(e.key)) return;

    if (status === GameStatus.PRE_GAME) {
      initRound(0);
      return;
    }

    if (status === GameStatus.ROUND_FAILED && (e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      initRound(roundIdx);
      return;
    }

    if (status === GameStatus.ROUND_COMPLETE && (e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      initRound(roundIdx + 1);
      return;
    }

    if (status !== GameStatus.PLAYING) return;

    const key = e.key;
    const expected = currentCommand?.text[typedChars];

    if (!expected) return;

    const keyMatch = key.toLowerCase() === expected.toLowerCase();

    if (keyMatch) {
      setTypedChars(prev => prev + 1);
      setErrorIdx(null);
      setPlayerAccuracy(prev => ({
        ...prev,
        [currentPlayer]: { ...prev[currentPlayer], correct: prev[currentPlayer].correct + 1, total: prev[currentPlayer].total + 1 }
      }));

      if (currentCommand && typedChars + 1 === currentCommand.text.length) {
        nextCommand();
      }
    } else {
      setLives(prev => {
        if (prev <= 1) {
          failRound();
          return 0;
        }
        return prev - 1;
      });
      setErrorIdx(typedChars);
      setShake(true);
      setTimeout(() => setShake(false), 200);
      setPlayerAccuracy(prev => ({
        ...prev,
        [currentPlayer]: { ...prev[currentPlayer], total: prev[currentPlayer].total + 1 }
      }));
    }
  }, [status, currentCommand, typedChars, initRound, roundIdx, nextCommand, failRound, currentPlayer]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return {
    status,
    roundIdx,
    commandIdx,
    typedChars,
    errorIdx,
    lives,
    timeRemaining,
    shake,
    currentRound,
    currentCommand,
    currentRoundStats,
    currentPlayer,
    initRound,
    startCommand,
    VILLAIN_ADDRESS
  };
};
