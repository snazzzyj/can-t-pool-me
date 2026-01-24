/**
 * Visual Novel Configuration
 * 7 scenes across 2 parts with dialogue, characters, and music
 */
import type { Scene, TransitionSlide } from '@/shared/types/game';
import {
  // Part One scenes
  SCENE_FINN_AND_RAB,
  SCENE_RAB_GETS_SUSPICIOUS,
  SCENE_MYSTERIOUS_CALLER,
  SCENE_JENN_AND_RAB,
  SCENE_ELYSE_AND_RAB,
  SCENE_DEBBIE_AND_RAB,
  SCENE_JOEL_AND_RAB,
  SCENE_TEAM_ASSEMBLY,
  // ... other scenes
  
  // Transitions
  transition01Chapter1,
  transition02FewDaysLater,
  transition03Chapter2,
  // ... other transitions
} from './scenes';

export const GAME_CONFIG = {
  MAX_PLAYERS: 5,
  SCENE_COUNT: 16, // Total scenes including transitions
  MINI_GAMES_COUNT: 4,
};

export const SCENE_DATABASE: Record<number, Scene | TransitionSlide> = {
  0: transition01Chapter1,
  1: SCENE_FINN_AND_RAB,
  2: transition02FewDaysLater,
  3: SCENE_RAB_GETS_SUSPICIOUS,
  4: transition03Chapter2,
  5: SCENE_MYSTERIOUS_CALLER,  // Use it here
  6: SCENE_JENN_AND_RAB,
  7: SCENE_ELYSE_AND_RAB,
  8: SCENE_DEBBIE_AND_RAB,
  9: SCENE_JOEL_AND_RAB,
  10: SCENE_TEAM_ASSEMBLY,
  // ... etc
};

export const MINI_GAME_TYPES = [
  'quick-time',
  'memory',
  'quiz',
  'rhythm',
  'puzzle',
] as const;

export const BOSS_PHASES = 3;
export const BOSS_HEALTH_PER_PHASE = 100;