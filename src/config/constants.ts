/**
 * Global Game Constants
 * Using as const for literal type inference
 */

export const GAME_LIMITS = {
  MAX_PLAYERS: 5,
  MIN_PLAYERS: 1,
  SCENE_COUNT: 7,
  SCENES_PART_1: 4,
  SCENES_PART_2: 3,
  MINI_GAMES_COUNT: 5,
  BOSS_HEALTH_PER_PHASE: 100,
  BOSS_PHASES: 3,
} as const;

export const GAME_TIMEOUTS = {
  SCENE_DURATION_MS: 2000,
  MINI_GAME_DURATION_MS: 180000, // 3 minutes
  BOSS_PHASE_DURATION_MS: 60000, // 1 minute per phase
} as const;

export const GAME_PHASES = [
  'menu',
  'visual-novel-part-1',
  'visual-novel-part-2',
  'mini-games',
  'boss-level',
  'results',
] as const;
