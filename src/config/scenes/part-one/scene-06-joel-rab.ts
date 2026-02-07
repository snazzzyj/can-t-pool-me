/**
Scene 06: Joel & Rab
The team recruits Joel, finding him in his tech-filled lair, and convinces him to join with the promise of ice cream.
 */

import type { Scene } from '@/shared/types/game';

export const scene06JoelRab: Scene = {
  sceneId: 6,
  title: 'Joel & Rab',
  backgroundImage: '/assets/backgrounds/Joel_Screen.png',
  backgroundMusic: '/assets/audio/music/scene-6.mp3',
  duration: 45,

  dialogues: [
    {
      speaker: 'Joel',
      text: 'How did you get in here? I have like 50 traps and surveillance cameras.',
      characterImage: '/assets/characters/Joel-1.png',
    },
    {
      speaker: 'Rab',
      text: 'Saff just let us in.',
      characterImage: '/assets/characters/Rab-1.png',
    },
    {
      speaker: 'Joel',
      text: 'Oh right.',
      characterImage: '/assets/characters/Joel-1.png',
    },
    {
      speaker: 'Rab',
      text: 'Are you…',
      characterImage: '/assets/characters/Rab-1.png',
    },
    {
      speaker: 'Joel',
      text: 'Totally not hacking the dark web? Yes.',
      characterImage: '/assets/characters/Joel-1.png',
    },
    {
      speaker: 'Rab',
      text: 'Ok then…',
      characterImage: '/assets/characters/Rab-1.png',
    },
    {
      speaker: 'Rab',
      text: 'Anyways, we\'re going on a little mission and could use some hacker man skills... You in?',
      characterImage: '/assets/characters/Rab-1.png',
    },
    {
      speaker: 'Joel',
      text: 'Who and when and why?',
      characterImage: '/assets/characters/Joel-1.png',
    },
    {
      speaker: 'Rab',
      text: 'We\'ll explain on the way.',
      characterImage: '/assets/characters/Rab-1.png',
    },
    {
      speaker: 'Jenn',
      text: 'And we\'ll stop for some ice cream on the way too!',
      characterImage: '/assets/characters/Jenn-1.png',
    },
    {
      speaker: 'Joel',
      text: 'Will they have mint choc chip?',
      characterImage: '/assets/characters/Joel-1.png',
    },
    {
      speaker: 'Debbie',
      text: 'We\'ve already pre-ordered it ;)',
      characterImage: '/assets/characters/Debbie-1.png',
    },
    {
      speaker: 'Joel',
      text: 'I\'m in.',
      characterImage: '/assets/characters/Joel-1.png',
    },
  ],
};