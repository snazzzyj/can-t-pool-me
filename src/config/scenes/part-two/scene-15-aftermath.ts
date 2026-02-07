/**
 * Scene 15-C: Aftermath
 * Dialogues after the final hit
 */

import type { Scene } from '@/shared/types/game';

export const scene15Aftermath: Scene = {
  sceneId: 23, // Will be adjusted in game.ts re-indexing
  title: 'The End of the Villain',
  backgroundImage: '/assets/backgrounds/scene-15.jpg',
  backgroundMusic: '/assets/audio/music/scene-15.mp3',
  dialogues: [
    {
      speaker: 'Narrator',
      text: 'Rab destroys the cue',
    },
    {
      speaker: 'Sharker',
      text: 'Memento Mori bitch.',
      characterImage: '/assets/characters/Rab/Rab_Concerned.png',
    },
  ],
};

export default scene15Aftermath;
