import { useState, useCallback } from 'react';

export const usePuzzleRotation = (
  maxOrientations: number,
  initialOrientation: number = 0
) => {
  const [orientation, setOrientation] = useState(initialOrientation);

  // Allow manual reset for new puzzles
  const resetOrientation = useCallback((newOrientation: number) => {
    setOrientation(newOrientation);
  }, []);

  const rotate = useCallback(() => {
    setOrientation((prev) => (prev + 1) % maxOrientations);
  }, [maxOrientations]);

  return { orientation, setOrientation, rotate, resetOrientation };
};
