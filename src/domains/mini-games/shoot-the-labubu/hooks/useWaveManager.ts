/**
 * Wave spawning: exposes getWavePattern for use by main game loop.
 * Spawn logic is consumed inside useShootTheLabubu via getWavePattern from utils.
 */

import { getWavePattern } from '../utils/wave-patterns';

export { getWavePattern };
export type { SpawnEvent } from '../utils/wave-patterns';
