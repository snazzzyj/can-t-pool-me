/**
 * Scene 15: Rescue Mushi
 * The team scrambles to save Mushi and confronts the pool villain in a final showdown
 */

import type { Scene } from '@/shared/types/game';

export const scene15RescueMushi: Scene = {
  sceneId: 15,
  title: 'Rescue Mushi',
  backgroundImage: '/assets/backgrounds/scene-15.jpg',
  backgroundMusic: '/assets/audio/music/scene-15.mp3',
  duration: 30,
  dialogues: [
    {
      speaker: 'Everyone',
      text: 'Mushi!',
    },
    {
      speaker: 'Mushi',
      text: '<3 <3',
      characterImage: '/assets/characters/Mushi.png',
    },
    {
      speaker: 'Pool villain',
      text: 'You\'ll never get away with this!',
      characterImage: '/assets/characters/Villain/Hooded-Villain.png',
    },
    {
      speaker: 'Sharker',
      text: 'No, you\'ll never get away with this.',
      characterImage: '/assets/characters/Rab/Rab_Concerned.png',
    },
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

export default scene15RescueMushi;