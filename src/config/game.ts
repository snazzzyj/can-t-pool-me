/**
 * Visual Novel Configuration
 * 16 scenes across 2 parts with dialogue, characters, and music
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
  
  // Part Two scenes
  scene09CodenameIntros,
  scene10MinigameJoel,
  scene11MinigameDebbie,
  scene12MinigameJenn,
  scene13MinigameElyse,
  scene14BossBattle,
  scene15RescueMushi,
  
  // Transitions
  transition01intro,
  transition02discovery,
  transition03elyse,
  transition04debbie,
  transition05jenn,
  transition06joel,
  transition07hostage,
  transition08heistBegins,
} from './scenes';

export const GAME_CONFIG = {
  MAX_PLAYERS: 5,
  SCENE_COUNT: 16, // Total scenes including transitions
  MINI_GAMES_COUNT: 4,
};

export const SCENE_DATABASE: Record<number, Scene | TransitionSlide> = {
  // PART ONE
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
  
  // PART TWO
  14: transition08heistBegins,
  15: scene09CodenameIntros,
  16: scene10MinigameJoel,
  17: scene11MinigameDebbie,
  18: scene12MinigameJenn,
  19: scene13MinigameElyse,
  20: scene14BossBattle,
  21: scene15RescueMushi,
};