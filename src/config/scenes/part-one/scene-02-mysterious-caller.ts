/**
Scene 03: Mysterious Caller
Rab discovers a news article about a pool player who never misses, then receives a threatening call from an unknown number warning him to stop.
 */

import type { Scene } from '@/shared/types/game';

export const SCENE_MYSTERIOUS_CALLER: Scene = {
  sceneId: 2,
  title: 'Mysterious Caller',
  backgroundImage: '/assets/backgrounds/scene-3.jpg',
  backgroundMusic: '/assets/audio/music/scene-3.mp3',
  duration: 35,
  dialogues: [
    {
      speaker: 'Narrator',
      text: 'Rab clicks on News article of Pool player who never misses a shot',
      characterImage: '/assets/characters/Narrator.png',
    },
    {
      speaker: 'Rab',
      text: 'hmmm I wonder how they\'re doing that',
      characterImage: '/assets/characters/Rab-1.png',
    },
    {
      speaker: 'Narrator',
      text: 'RING RING, RING RING',
      characterImage: '/assets/characters/Narrator.png',
    },
    {
      speaker: 'Narrator',
      text: 'Rab\'s Phone vibrates from an unknown caller',
      characterImage: '/assets/characters/Narrator.png',
    },
    {
      speaker: 'Narrator',
      text: 'Rab picks up',
      characterImage: '/assets/characters/Narrator.png',
    },
    {
      speaker: 'Mysterious Caller',
      text: 'We know what you\'re doing and we suggest you stop immediately.',
      characterImage: '/assets/characters/Mysterious-Caller.png',
    },
    {
      speaker: 'Rab',
      text: 'Who are you? Stop what?',
      characterImage: '/assets/characters/Rab-1.png',
    },
    {
      speaker: 'Mysterious Caller',
      text: 'It doesn\'t matter who we are. You know what to stop.',
      characterImage: '/assets/characters/Mysterious-Caller.png',
    },
    {
      speaker: 'Narrator',
      text: 'hangs up',
      characterImage: '/assets/characters/Narrator.png',
    },
  ],
};