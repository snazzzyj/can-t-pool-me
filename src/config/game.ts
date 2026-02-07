/**
 * Visual Novel Configuration
 * 16 scenes across 2 parts with dialogue, characters, and music
 */
import type { Scene, TransitionSlide } from '@/shared/types/game';
import {
  // Part One scenes
  scene01FinnRab,
  scene02MysteriousCaller,
  scene03ElyseRab,
  scene04DebbieRab,
  scene05JennRab,
  scene06JoelRab,
  scene07TeamAssembly,


  // Part Two scenes
  scene09CodenameIntros,
  scene10MinigameJoel,
  scene11MinigameDebbie,
  scene12MinigameJenn,
  scene13MinigameElyse,
  scene14BossBattle,
  scene15RescueMushi,
  scene15FinalStrike,
  scene15Aftermath,
  scene16Victory,

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
  SCENE_COUNT: 25, // Total scenes including transitions
  MINI_GAMES_COUNT: 4,
};

export const SCENE_DATABASE: Record<number, Scene | TransitionSlide> = {
  // PART ONE
  0: transition01intro,
  1: scene01FinnRab,
  2: transition02discovery,
  3: scene02MysteriousCaller,
  4: transition03elyse,
  5: scene03ElyseRab,
  6: transition04debbie,
  7: scene04DebbieRab,
  8: transition05jenn,
  9: scene05JennRab,
  10: transition06joel,
  11: scene06JoelRab,
  12: transition07hostage,
  13: scene07TeamAssembly,

  // PART TWO
  14: transition08heistBegins,
  15: scene09CodenameIntros,
  16: scene10MinigameJoel,
  17: scene11MinigameDebbie,
  18: scene12MinigameJenn,
  19: scene13MinigameElyse,
  20: scene14BossBattle,
  21: scene15RescueMushi,
  22: scene15FinalStrike,
  23: scene15Aftermath,
  24: scene16Victory,
};