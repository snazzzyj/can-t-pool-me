/**
 * Keyboard input for all 5 players.
 * Exposes ref that the game loop reads: shooting (R, H, J) and collector movement (arrows, A/D).
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

  const keysRef = useRef({
    KeyR: false,
    KeyH: false,
    KeyJ: false,
    ArrowLeft: false,
    ArrowRight: false,
    KeyA: false,
    KeyD: false,
  });

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (KEYS.includes(e.code as (typeof KEYS)[number])) {
        e.preventDefault();
        keysRef.current[e.code as keyof typeof keysRef.current] = true;
        const k = keysRef.current;
        stateRef.current.shootRab = k.KeyR;
        stateRef.current.shootJenn = k.KeyH;
        stateRef.current.shootJoel = k.KeyJ;
        stateRef.current.elyseMove = deriveMove(k.ArrowLeft, k.ArrowRight);
        stateRef.current.debbieMove = deriveMove(k.KeyA, k.KeyD);
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (KEYS.includes(e.code as (typeof KEYS)[number])) {
        e.preventDefault();
        keysRef.current[e.code as keyof typeof keysRef.current] = false;
        const k = keysRef.current;
        stateRef.current.shootRab = k.KeyR;
        stateRef.current.shootJenn = k.KeyH;
        stateRef.current.shootJoel = k.KeyJ;
        stateRef.current.elyseMove = deriveMove(k.ArrowLeft, k.ArrowRight);
        stateRef.current.debbieMove = deriveMove(k.KeyA, k.KeyD);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  return stateRef;
}
