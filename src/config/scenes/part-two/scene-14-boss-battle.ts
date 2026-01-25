/**
 * Scene 14: Boss Battle
 * The team confronts the Pool Villain to rescue Mushi in an epic showdown.
 */

import type { Scene } from '@/shared/types/game';

export const scene14BossBattle: Scene = {
  sceneId: 14,
  title: 'Boss Battle',
  backgroundImage: '/assets/backgrounds/scene-14.jpg',
  backgroundMusic: '/assets/audio/music/scene-14.mp3',
  duration: 20,
  dialogues: [
    {
      speaker: 'Pool Villain',
      text: 'What?! How did you get in here?',
      characterImage: '/assets/characters/Pool-Villain.png',
    },
    {
      speaker: 'Sharker',
      text: 'Doesn\'t matter. Give us back Mushi or else.',
      characterImage: '/assets/characters/Rab-1.png',
    },
    {
      speaker: 'Pool Villain',
      text: 'Hahahah you imbeciles think you can defeat me? You can die trying.',
      characterImage: '/assets/characters/Pool-Villain.png',
    },
    {
      speaker: 'Sharker',
      text: 'Oh we\'ve done more impossible things. Trust us.',
      characterImage: '/assets/characters/Rab-1.png',
    },
  ],
};

export default scene14BossBattle;