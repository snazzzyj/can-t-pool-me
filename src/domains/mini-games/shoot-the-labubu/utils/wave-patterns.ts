/**
 * Labubu spawn patterns per level and wave.
 * Each pattern is an array of { delayMs, x } for spawn timing and horizontal position.
 */

import { SCREEN_WIDTH, LABUBUS_PER_WAVE } from '../constants';
import type { LabubuColor } from '../types';
import { LABUBU_COLORS } from '../constants';

const LEFT = 400;
const CENTER = 960;
const RIGHT = 1520;

function spread(n: number, minX: number, maxX: number): number[] {
  const step = (maxX - minX) / Math.max(1, n - 1);
  return Array.from({ length: n }, (_, i) => minX + i * step);
}

/** Level 1 Wave 1: Straight vertical columns (3 columns of 5) */
function level1Wave1(): { delayMs: number; x: number }[] {
  const positions: { delayMs: number; x: number }[] = [];
  const columns = [LEFT, CENTER, RIGHT];
  let delayMs = 0;
  for (let row = 0; row < 5; row++) {
    for (const x of columns) {
      positions.push({ delayMs, x });
      delayMs += 400;
    }
  }
  return positions;
}

/** Level 1 Wave 2: Gentle horizontal wave */
function level1Wave2(): { delayMs: number; x: number }[] {
  const positions: { delayMs: number; x: number }[] = [];
  const xs = spread(15, 300, SCREEN_WIDTH - 300);
  xs.forEach((x, i) => {
    positions.push({ delayMs: i * 600, x: x + Math.sin(i * 0.8) * 80 });
  });
  return positions;
}

/** Level 1 Wave 3: Staggered diagonal */
function level1Wave3(): { delayMs: number; x: number }[] {
  const positions: { delayMs: number; x: number }[] = [];
  const lanes = [LEFT, CENTER, RIGHT];
  for (let i = 0; i < 15; i++) {
    const lane = lanes[i % 3];
    const offset = (i % 3) * 60 - 60;
    positions.push({ delayMs: i * 500, x: lane + offset });
  }
  return positions;
}

/** Level 2 Wave 1: Zigzag snake */
function level2Wave1(): { delayMs: number; x: number }[] {
  const positions: { delayMs: number; x: number }[] = [];
  let x = LEFT;
  let dir = 1;
  for (let i = 0; i < 20; i++) {
    positions.push({ delayMs: i * 350, x });
    x += dir * 120;
    if (x >= RIGHT) {
      x = RIGHT;
      dir = -1;
    } else if (x <= LEFT) {
      x = LEFT;
      dir = 1;
    }
  }
  return positions;
}

/** Level 2 Wave 2: V-formation with center focus */
function level2Wave2(): { delayMs: number; x: number }[] {
  const positions: { delayMs: number; x: number }[] = [];
  const left = spread(10, 250, CENTER - 50);
  const right = spread(10, CENTER + 50, SCREEN_WIDTH - 250);
  left.forEach((x, i) => positions.push({ delayMs: i * 300, x }));
  right.forEach((x, i) => positions.push({ delayMs: i * 300, x }));
  return positions.slice(0, 20);
}

/** Level 2 Wave 3: Alternating column drops */
function level2Wave3(): { delayMs: number; x: number }[] {
  const positions: { delayMs: number; x: number }[] = [];
  const cols = [LEFT, CENTER, RIGHT];
  for (let i = 0; i < 20; i++) {
    const x = cols[i % 3];
    positions.push({ delayMs: i * 400, x });
  }
  return positions;
}

/** Level 3 Wave 1: Chaotic swarm */
function level3Wave1(): { delayMs: number; x: number }[] {
  const positions: { delayMs: number; x: number }[] = [];
  const minX = 150;
  const maxX = SCREEN_WIDTH - 150;
  for (let i = 0; i < 25; i++) {
    const x = minX + Math.random() * (maxX - minX);
    positions.push({ delayMs: i * 250, x });
  }
  return positions;
}

/** Level 3 Wave 2: Pincer formation */
function level3Wave2(): { delayMs: number; x: number }[] {
  const positions: { delayMs: number; x: number }[] = [];
  const fromLeft = spread(13, 100, CENTER);
  const fromRight = spread(12, CENTER, SCREEN_WIDTH - 100);
  fromLeft.forEach((x, i) => positions.push({ delayMs: i * 200, x }));
  fromRight.forEach((x, i) => positions.push({ delayMs: i * 200, x }));
  return positions.slice(0, 25);
}

/** Level 3 Wave 3: Full screen cascade */
function level3Wave3(): { delayMs: number; x: number }[] {
  const positions: { delayMs: number; x: number }[] = [];
  const xs = spread(25, 100, SCREEN_WIDTH - 100);
  xs.forEach((x, i) => {
    positions.push({ delayMs: i * 150, x });
  });
  return positions;
}

const PATTERNS: Record<1 | 2 | 3, Record<1 | 2 | 3, () => { delayMs: number; x: number }[]>> = {
  1: { 1: level1Wave1, 2: level1Wave2, 3: level1Wave3 },
  2: { 1: level2Wave1, 2: level2Wave2, 3: level2Wave3 },
  3: { 1: level3Wave1, 2: level3Wave2, 3: level3Wave3 },
};

export interface SpawnEvent {
  delayMs: number;
  x: number;
  color: LabubuColor;
}

export function getWavePattern(
  level: 1 | 2 | 3,
  wave: 1 | 2 | 3
): SpawnEvent[] {
  const positions = PATTERNS[level][wave]();
  const count = LABUBUS_PER_WAVE[level];
  return positions.slice(0, count).map((p, i) => ({
    ...p,
    color: LABUBU_COLORS[i % LABUBU_COLORS.length],
  }));
}
