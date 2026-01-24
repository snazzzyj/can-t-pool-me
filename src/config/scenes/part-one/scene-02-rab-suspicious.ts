/**
 * Scene 02: Rab Suspicious
 * Rab becomes suspicious of the situation
 */

import type { Scene } from '@/shared/types/game';

export const SCENE_RAB_GETS_SUSPICIOUS: Scene = {
  sceneId: 2,
  title: 'Rab gets suspicious',
  backgroundImage: '/assets/backgrounds/scene-1.jpg',
  backgroundMusic: '/assets/audio/music/scene-1.mp3',
  duration: 120,
  dialogues: [
    {
      speaker: 'Rab',
      text: 'hmmm I wonder how they\'re doing that...',
      characterImage: '/assets/characters/Rab/Rab_Idle_Suss.png',
    },
    {
      speaker: '...',
      text: '*phone vibrates*',
      characterImage: '/assets/characters/',
    },
    {
      speaker: 'Mysterious Caller',
      text: 'We know what you\'re doing and we suggest you stop immediately.',
      characterImage: '/assets/characters/',
    },
    {
      speaker: 'Rab',
      text: 'Who are you? Stop what?',
      characterImage: '/assets/characters/Rab/Rab_Idle_Suss.png',
    },
    {
      speaker: 'Mysterious Caller',
      text: 'It doesn\'t matter who we are. You know what to stop.',
      characterImage: '/assets/characters/',
    },
    {
      speaker: 'Mysterious Caller',
      text: '*hangs up*',
      characterImage: '/assets/characters/',
    },
  ],
};