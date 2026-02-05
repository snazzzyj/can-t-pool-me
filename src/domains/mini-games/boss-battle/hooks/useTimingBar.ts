import { useState, useEffect, useRef, useCallback } from 'react';

interface UseTimingBarProps {
  lineSpeed: number; // ms per full sweep
  isPaused: boolean;
}

export const useTimingBar = ({ lineSpeed, isPaused }: UseTimingBarProps) => {
  const [position, setPosition] = useState(0); // 0 to 100
  const requestRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const animate = useCallback((time: number) => {
    if (startTimeRef.current === null) {
      startTimeRef.current = time;
    }

    const elapsed = time - startTimeRef.current;

    // Calculate position based on time and speed
    // A full sweep takes lineSpeed ms
    const progress = (elapsed % lineSpeed) / lineSpeed;

    // Triangle wave function to sweep 0 -> 100 -> 0
    let newPos = progress * 200;
    if (newPos > 100) {
      newPos = 200 - newPos;
    }

    setPosition(newPos);
    requestRef.current = requestAnimationFrame(animate);
  }, [lineSpeed]);

  useEffect(() => {
    if (!isPaused) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    }
    return () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isPaused, animate]);

  return { position };
};
