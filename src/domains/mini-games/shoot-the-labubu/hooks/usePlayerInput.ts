'use client';

/**
 * Keyboard input for all 5 players.
 * Exposes ref that the game loop reads: shooting (R, H, J) and collector movement (arrows, A/D).
 * Fixed sticky keys and added robust key matching.
 */

import { useEffect, useRef } from 'react';

export interface PlayerInputState {
  shootRab: boolean;
  shootJenn: boolean;
  shootJoel: boolean;
  elyseMove: -1 | 0 | 1;
  debbieMove: -1 | 0 | 1;
}

const KEYS = ['KeyR', 'KeyH', 'KeyJ', 'ArrowLeft', 'ArrowRight', 'KeyA', 'KeyD'] as const;

function deriveMove(left: boolean, right: boolean): -1 | 0 | 1 {
  if (left && !right) return -1;
  if (right && !left) return 1;
  return 0;
}

export function usePlayerInput() {
  const stateRef = useRef<PlayerInputState>({
    shootRab: false,
    shootJenn: false,
    shootJoel: false,
    elyseMove: 0,
    debbieMove: 0,
  });

  const keysPressed = useRef<Set<string>>(new Set());

  useEffect(() => {
    const updateInputState = () => {
      const keys = keysPressed.current;
      const s = stateRef.current;

      s.shootRab = keys.has('KeyR') || keys.has('r');
      s.shootJenn = keys.has('KeyH') || keys.has('h');
      s.shootJoel = keys.has('KeyJ') || keys.has('j');

      const elyseLeft = keys.has('ArrowLeft') || keys.has('arrowleft');
      const elyseRight = keys.has('ArrowRight') || keys.has('arrowright');
      s.elyseMove = deriveMove(elyseLeft, elyseRight);

      const debbieLeft = keys.has('KeyA') || keys.has('a');
      const debbieRight = keys.has('KeyD') || keys.has('d');
      s.debbieMove = deriveMove(debbieLeft, debbieRight);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const { code, key } = e;
      const lowerKey = key.toLowerCase();

      // Check if it's one of our monitored keys
      if (
        KEYS.includes(code as (typeof KEYS)[number]) ||
        ['r', 'h', 'j', 'a', 'd', 'arrowleft', 'arrowright'].includes(lowerKey)
      ) {
        // Prevent scrolling with arrows
        if (lowerKey.startsWith('arrow')) e.preventDefault();

        keysPressed.current.add(code);
        keysPressed.current.add(lowerKey);
        updateInputState();
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      const { code, key } = e;
      const lowerKey = key.toLowerCase();

      keysPressed.current.delete(code);
      keysPressed.current.delete(lowerKey);
      updateInputState();
    };

    // Also handle window blur to prevent stuck keys
    const onBlur = () => {
      keysPressed.current.clear();
      updateInputState();
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('blur', onBlur);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('blur', onBlur);
    };
  }, []);

  return stateRef;
}
