/**
 * Visual Novel Configuration
 * 7 scenes across 2 parts with dialogue, characters, and music
 */
import type { Scene, TransitionSlide } from '@/shared/types/game';
import {
  // Part One scenes
  SCENE_FINN_AND_RAB,
  SCENE_MYSTERIOUS_CALLER,
  SCENE_JENN_AND_RAB,
  SCENE_ELYSE_AND_RAB,
  SCENE_DEBBIE_AND_RAB,
  SCENE_JOEL_AND_RAB,
  SCENE_TEAM_ASSEMBLY,
  // ... other scenes
  
  // Transitions
  transition01intro,
  transition02discovery,
  transition03elyse,
  transition04debbie,
  transition05jenn,
  transition06joel,
  transition07hostage,  
} from './scenes';

export const GAME_CONFIG = {
  MAX_PLAYERS: 5,
  SCENE_COUNT: 16, // Total scenes including transitions
  MINI_GAMES_COUNT: 4,
};

export const SCENE_DATABASE: Record<number, Scene | TransitionSlide> = {
  0: transition01intro,
  1: SCENE_FINN_AND_RAB,
  2: transition02discovery,
  3: SCENE_MYSTERIOUS_CALLER,
  4: transition03elyse,
  5: SCENE_ELYSE_AND_RAB,
  6: transition04debbie,
  7: SCENE_DEBBIE_AND_RAB,
  8: transition05jenn,
  9: SCENE_JENN_AND_RAB,
  10: transition06joel,
  11: SCENE_JOEL_AND_RAB,
  12: transition07hostage,
  13: SCENE_TEAM_ASSEMBLY,
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