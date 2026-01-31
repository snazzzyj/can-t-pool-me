/**
 * Scene 13: Operator (Elyse Game)
 * The team encounters guards and Labubus, leading to Elyse's minigame challenge.
 */

import type { Scene } from '@/shared/types/game';

export const scene13MinigameElyse: Scene = {
  sceneId: 13,
  title: 'Operator (Elyse Game)',
  backgroundImage: '/assets/backgrounds/scene-13.jpg',
  backgroundMusic: '/assets/audio/music/scene-13.mp3',
  duration: 30,
  dialogues: [
    {
      speaker: 'Hackerman',
      text: 'Guards everywhere.',
      characterImage: '/assets/characters/Joel-1.png',
    },
    {
      speaker: 'Big Iron McGee',
      text: 'Wait… are those…',
      characterImage: '/assets/characters/Elyse-1.png',
    },
    {
      speaker: 'Big Iron McGee',
      text: 'LABUBUS?',
      characterImage: '/assets/characters/Elyse-1.png',
    },
    {
      speaker: 'Sharker',
      text: 'There\'s heaps, but if we take it in turns we should be able to push through.',
      characterImage: '/assets/characters/Rab-1.png',
    },
    {
      speaker: 'Big Iron McGee',
      text: 'If we kill them can I keep the bodies?... They\'d be worth a fortune on FaceBook Marketplace.',
      characterImage: '/assets/characters/Elyse-1.png',
    },
  ],
};

export default scene13MinigameElyse;