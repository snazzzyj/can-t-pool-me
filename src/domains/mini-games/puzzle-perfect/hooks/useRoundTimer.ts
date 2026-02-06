import { useState, useEffect, useCallback } from 'react';

export const useRoundTimer = (
  initialTime: number,
  isRunning: boolean,
  onTimeExpire: () => void
) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  // Reset timer when initialTime changes (new round)
  useEffect(() => {
    setTimeLeft(initialTime);
  }, [initialTime]);


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

  const reset = useCallback(() => {
    setTimeLeft(initialTime);
  }, [initialTime]);

  return { timeLeft, addTime, reset };
};
