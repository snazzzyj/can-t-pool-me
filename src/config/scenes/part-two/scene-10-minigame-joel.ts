/**
 * Scene 10: Hacking the Mainframe (Hackerman Minigame)
 * Sharker tasks Hackerman with hacking the mainframe to locate Mushi's whereabouts.
 */

import type { Scene } from '@/shared/types/game';

export const scene10MinigameJoel: Scene = {
  sceneId: 10,
  title: 'Hacking the Mainframe',
  backgroundImage: '/assets/backgrounds/scene-10.jpg',
  backgroundMusic: '/assets/audio/music/scene-10.mp3',
  duration: 10,
  dialogues: [
    {
      speaker: 'Sharker',
      text: 'First thing we need to do is find where they\'re holding Mushi.',
      characterImage: '/assets/characters/Rab-1.png',
    },
    {
      speaker: 'Hackerman',
      text: 'I\'m on it. Let me hack the mainframe.',
      characterImage: '/assets/characters/Joel-Vinny.png',
    },
  ],
};

export default scene10MinigameJoel;