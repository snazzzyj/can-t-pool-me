/**
 * Scene 12: Breaking In (Hacktress Game)
 * The team discovers a hidden entrance with locks and puzzles, leading to Hacktress's minigame.
 */

import type { Scene } from '@/shared/types/game';
import PuzzlePerfectScene from '@/domains/mini-games/puzzle-perfect/PuzzlePerfectScene';

export const scene12MinigameJenn: Scene = {
  sceneId: 12,
  title: 'Breaking In',
  backgroundImage: '/assets/backgrounds/scene-12.jpg',
  backgroundMusic: '/assets/audio/music/scene-12.mp3',
  duration: 20,
  dialogues: [
    {
      speaker: 'Sharker',
      text: 'Okay, they\'ve definitely got security systems everywhere.',
      characterImage: '/assets/characters/Rab-1.png',
    },
    {
      speaker: 'Big Iron McGee',
      text: 'How do we disable it?',
      characterImage: '/assets/characters/Elyse-1.png',
    },
    {
      speaker: 'Hackerman',
      text: 'Working on it...',
      characterImage: '/assets/characters/Joel-1.png',
    },
    {
      speaker: 'Hackerman',
      text: 'What the?... There\'s a captcha blocking our access.',
      characterImage: '/assets/characters/Joel-1.png',
    },
    {
      speaker: 'Hacktress',
      text: 'Wait, is that a giant puzzle game?',
      characterImage: '/assets/characters/Jenn-1.png',
    },
  ],
  minigameComponent: PuzzlePerfectScene,
};

export default scene12MinigameJenn;