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
  rabMove: -1 | 0 | 1;
  jennMove: -1 | 0 | 1;
  joelMove: -1 | 0 | 1;
  elyseMove: -1 | 0 | 1;
  debbieMove: -1 | 0 | 1;
}

const KEYS = [
  'Digit1', 'Digit2', 'Digit3',
  'Digit7', 'Digit8', 'Digit9',
  'KeyJ', 'KeyK', 'KeyL',
  'ArrowLeft', 'ArrowRight', 'KeyA', 'KeyD'
] as const;

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
    rabMove: 0,
    jennMove: 0,
    joelMove: 0,
    elyseMove: 0,
    debbieMove: 0,
  });

  const keysPressed = useRef<Set<string>>(new Set());

  useEffect(() => {
    const updateInputState = () => {
      const keys = keysPressed.current;
      const s = stateRef.current;

      // Rab: 1 (Left), 2 (Shoot), 3 (Right)
      s.shootRab = keys.has('Digit2') || keys.has('2');
      const rabLeft = keys.has('Digit1') || keys.has('1');
      const rabRight = keys.has('Digit3') || keys.has('3');
      s.rabMove = deriveMove(rabLeft, rabRight);

      // Jenn: 7 (Left), 8 (Shoot), 9 (Right)
      s.shootJenn = keys.has('Digit8') || keys.has('8');
      const jennLeft = keys.has('Digit7') || keys.has('7');
      const jennRight = keys.has('Digit9') || keys.has('9');
      s.jennMove = deriveMove(jennLeft, jennRight);

      // Joel: J (Left), K (Shoot), L (Right)
      s.shootJoel = keys.has('KeyK') || keys.has('k');
      const joelLeft = keys.has('KeyJ') || keys.has('j');
      const joelRight = keys.has('KeyL') || keys.has('l');
      s.joelMove = deriveMove(joelLeft, joelRight);

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
        ['1', '2', '3', '7', '8', '9', 'j', 'k', 'l', 'a', 'd', 'arrowleft', 'arrowright'].includes(lowerKey)
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
