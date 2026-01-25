/**
 * Scene 12: Breaking In (Hacktress Game)
 * The team discovers a hidden entrance with locks and puzzles, leading to Hacktress's minigame.
 */

import type { Scene } from '@/shared/types/game';

export const scene12MinigameJenn: Scene = {
  sceneId: 12,
  title: 'Breaking In (Hacktress Game)',
  backgroundImage: '/assets/backgrounds/scene-12.jpg',
  backgroundMusic: '/assets/audio/music/scene-12.mp3',
  duration: 20,
  dialogues: [
    {
      speaker: 'Sharker',
      text: 'Okay, we need to find an entry point without being seen. Any ideas?',
      characterImage: '/assets/characters/Rab-1.png',
    },
    {
      speaker: 'Pxl',
      text: 'I think I see a hidden entrance down there.',
      characterImage: '/assets/characters/Debbie-1.png',
    },
    {
      speaker: 'Big Iron McGee',
      text: 'But it looks like there\'s a series of locks and puzzles.',
      characterImage: '/assets/characters/Elyse-1.png',
    },
    {
      speaker: 'Hacktress',
      text: 'Puzzles?...',
      characterImage: '/assets/characters/Jenn-1.png',
    },
  ],
};

export default scene12MinigameJenn;