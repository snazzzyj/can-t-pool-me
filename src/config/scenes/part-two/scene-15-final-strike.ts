/**
 * Scene 15-B: Final Strike
 * Standalone minigame for the final hit
 */

import type { Scene } from '@/shared/types/game';
import FinalStrikeScene from '@/domains/mini-games/boss-battle/FinalStrikeScene';

export const scene15FinalStrike: Scene = {
  sceneId: 22, // Will be adjusted in game.ts re-indexing
  title: 'Final Strike',
  backgroundImage: '/assets/backgrounds/scene-15.jpg',
  backgroundMusic: '/assets/audio/music/scene-15.mp3',
  dialogues: [],
  minigameComponent: FinalStrikeScene,
};

export default scene15FinalStrike;
