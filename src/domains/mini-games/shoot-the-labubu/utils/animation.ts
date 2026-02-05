/**
 * Animation / visual effect helpers
 */

/** Screen shake duration in ms */
export const SHAKE_DURATION_MS = 200;
/** Screen shake intensity in px */
export const SHAKE_INTENSITY = 5;

/** Damage flash duration in ms */
export const DAMAGE_FLASH_DURATION_MS = 300;
/** Heal flash duration in ms */
export const HEAL_FLASH_DURATION_MS = 300;

export function applyDecay(
  current: number,
  deltaMs: number,
  durationMs: number
): number {
  if (current <= 0) return 0;
  const decay = (deltaMs / durationMs) * current;
  return Math.max(0, current - decay);
}
