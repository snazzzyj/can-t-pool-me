import { useState, useCallback } from 'react';

export const useLivesSystem = (maxLives: number, playerCount: number) => {
  const [lives, setLives] = useState<number[]>(new Array(playerCount).fill(maxLives));

  const loseLife = useCallback((playerIndex: number) => {
    setLives(prev => {
      const newLives = [...prev];
      if (newLives[playerIndex] > 0) {
        newLives[playerIndex] -= 1;
      }
      return newLives;
    });
  }, []);

  const resetLives = useCallback(() => {
    setLives(new Array(playerCount).fill(maxLives));
  }, [maxLives, playerCount]);

  return { lives, loseLife, resetLives };
};
