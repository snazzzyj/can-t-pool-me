/**
Scene 03: Mysterious Caller
Rab discovers a news article about a pool player who never misses, then receives a threatening call from an unknown number warning him to stop.
 */

import type { Scene } from '@/shared/types/game';

export const scene02MysteriousCaller: Scene = {
  sceneId: 2,
  title: 'Mysterious Caller',
  backgroundImage: '/assets/backgrounds/scene-3.jpg',
  backgroundMusic: '/assets/audio/Scheming%20music.mp3',
  characters: [
    {
      image: '/assets/characters/Newspaper-1.png',
      position: 'center',
      scale: 6.0,
      animation: 'spin-in',
      offsetY: '35%',
    },
  ],
  dialogues: [
    {
      speaker: 'Narrator',
      text: 'Rab clicks on News article of Pool player who never misses a shot',
    },
    {
      speaker: 'Rab',
      text: 'hmmm I wonder how they\'re doing that',
      characterImage: '/assets/characters/Rab/Rab_Concerned.png',
    },
    {
      speaker: 'Narrator',
      text: 'RING RING, RING RING',
    },
    {
      speaker: 'Narrator',
      text: 'Rab\'s Phone vibrates from an unknown caller',
    },
    {
      speaker: 'Narrator',
      text: 'Rab picks up',
    },
    {
      speaker: 'Mysterious Caller',
      text: 'We know what you\'re doing and we suggest you stop immediately.',
      characterImage: '/assets/characters/Hooded-Caller.png',
    },
    {
      speaker: 'Rab',
      text: 'Who are you? Stop what?',
      characterImage: '/assets/characters/Rab/Rab_Concerned.png',
    },
    {
      speaker: 'Mysterious Caller',
      text: 'It doesn\'t matter who we are. You know what to stop.',
      characterImage: '/assets/characters/Hooded-Caller.png',
    },
    {
      speaker: 'Narrator',
      text: 'hangs up',
    },
  ],
};