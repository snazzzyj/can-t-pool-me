/**
Scene 03: Mysterious Caller
Rab discovers a news article about a pool player who never misses, then receives a threatening call from an unknown number warning him to stop.
 */

import type { Scene } from '@/shared/types/game';

export const scene02MysteriousCaller: Scene = {
  sceneId: 2,
  title: 'Mysterious Caller',
  backgroundImage: '/assets/backgrounds/Pool_Article.png',
  backgroundTransform: 'scale(1) translateY(-10%)',
  backgroundPosition: 'center top',
  backgroundMusic: '/assets/audio/Scheming%20music.mp3',

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
      backgroundImage: '/assets/backgrounds/Mysterious_Call.png',

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
      backgroundImage: '/assets/backgrounds/Picked up phone.png',

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