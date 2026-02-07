/**
 * Scene 1: Finn & Rab
 * Rab calls Finn to discuss feeling restless after Expanse and his interest in starting something new involving pool.
 */

import type { Scene } from '@/shared/types/game';

export const scene01FinnRab: Scene = {
  sceneId: 1,
  title: 'Finn & Rab',
  backgroundImage: '/assets/backgrounds/Finn_Scene.png',
  backgroundTransform: 'scale(1) translateY(-25%)',
  backgroundMusic: '/assets/audio/music/scene-1.mp3',
  duration: 50,
  dialogues: [
    {
      speaker: 'Finn',
      text: 'Sup Broooskiiii',
      characterImage: '/assets/characters/Finn.png',
    },
    {
      speaker: 'Rab',
      text: 'Yo yo wasssuppppp',
      characterImage: '/assets/characters/Rab-1.png',
    },
    {
      speaker: 'Finn',
      text: 'Nothin much, just chillin with the Fam and *insert weird flex from Finn*',
      characterImage: '/assets/characters/Finn.png',
    },
    {
      speaker: 'Rab',
      text: 'Haha cool man!',
      characterImage: '/assets/characters/Rab-1.png',
    },
    {
      speaker: 'Rab',
      text: 'Listen, I\'ve been feeling kinda bored and restless since Expanse. I\'m thinking of starting something new again.',
      characterImage: '/assets/characters/Rab-1.png',
    },
    {
      speaker: 'Finn',
      text: 'Oh cool, like another tech startup?',
      characterImage: '/assets/characters/Finn.png',
    },
    {
      speaker: 'Rab',
      text: 'Yeah nah, I don\'t know…',
      characterImage: '/assets/characters/Rab-1.png',
    },
    {
      speaker: 'Rab',
      text: 'I think I want to try something completely different now…',
      characterImage: '/assets/characters/Rab-1.png',
    },
    {
      speaker: 'Rab',
      text: 'I was thinking something to do with pool? I\'m not sure yet man, but what do you think?',
      characterImage: '/assets/characters/Rab-1.png',
    },
    {
      speaker: 'Finn',
      text: 'I think you should *insert genuine advice that Finn would actually say*',
      characterImage: '/assets/characters/Finn.png',
    },
    {
      speaker: 'Rab',
      text: 'Alright man, I\'m gonna do more thinking on it. Goodnight! Or Good morning or whatever time it is there.',
      characterImage: '/assets/characters/Rab-1.png',
    },
    {
      speaker: 'Finn',
      text: 'Haha alright, good luck man!',
      characterImage: '/assets/characters/Finn.png',
    },
  ],
};