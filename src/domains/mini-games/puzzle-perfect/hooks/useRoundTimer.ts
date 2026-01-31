import { useState, useEffect, useRef, useCallback } from 'react';

export const useRoundTimer = (
  initialTime: number,
  isRunning: boolean,
  onTimeExpire: () => void
) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const initialTimeRef = useRef(initialTime);

  // Reset timer when initialTime changes (new round)
  useEffect(() => {
    setTimeLeft(initialTime);
    initialTimeRef.current = initialTime;
    startTimeRef.current = null;
  }, [initialTime]);

  const tick = useCallback((timestamp: number) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;

    // Calculate elapsed time based on when we started THIS resume cycle
    // But we need to account for paused time.
    // Simpler approach for React hooks without complex pause/resume logic:
    // Just subtract delta from previous frame.
  }, []);

  // Use a simpler interval or delta approach for robustness
  useEffect(() => {
    if (!isRunning) {
      return;
    }

    let lastTime = Date.now();
    const interval = setInterval(() => {
      const now = Date.now();
      const delta = now - lastTime;
      lastTime = now;

      setTimeLeft((prev) => {
        const newTime = prev - delta;
        if (newTime <= 0) {
          clearInterval(interval);
          onTimeExpire();
          return 0;
        }
        return newTime;
      });
    }, 100); // 100ms update is smooth enough for progress bar

    return () => clearInterval(interval);
  }, [isRunning, onTimeExpire]);

  const addTime = useCallback((amount: number) => {
    setTimeLeft(prev => prev + amount);
  }, []);

  return { timeLeft, addTime };
};
