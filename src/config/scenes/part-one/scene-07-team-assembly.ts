/**
 * Scene 07: The Kidnapping
 * The team is interrupted by a mysterious caller who reveals they've kidnapped Mushi 
 * and demands Rab destroy all evidence within 48 hours.
 */

import type { Scene } from '@/shared/types/game';

export const scene07TeamAssembly: Scene = {
  sceneId: 7,
  title: 'The Kidnapping',
  backgroundImage: '/assets/backgrounds/scene-7.jpg',
  backgroundMusic: '/assets/audio/music/scene-7.mp3',
  duration: 60,
  dialogues: [
    {
      speaker: 'Elyse',
      text: 'So where are they?',
      characterImage: '/assets/characters/Elyse-1.png',
    },
    {
      speaker: 'Joel',
      text: 'What are the entrances?',
      characterImage: '/assets/characters/Joel-1.png',
    },
    {
      speaker: 'Rab',
      text: 'I don\'t know their exact address but let me just pull up the bluepri-',
      characterImage: '/assets/characters/Rab-1.png',
    },
    {
      speaker: 'Narrator',
      text: 'RING RING, RING RING',
    },
    {
      speaker: 'Narrator',
      text: 'Anonymous caller calls Rab\'s laptop',
    },
    {
      speaker: 'Mysterious Caller',
      text: 'You just don\'t know how to listen do you? Well it\'s too late now. We\'ve taken your son.',
      characterImage: '/assets/characters/Hooded-Caller.png',
    },
    {
      speaker: 'Rab',
      text: 'My son?!',
      characterImage: '/assets/characters/Rab-1.png',
    },
    {
      speaker: 'Elyse',
      text: 'We have a son?',
      characterImage: '/assets/characters/Elyse-1.png',
    },
    {
      speaker: 'Joel',
      text: 'Did you just assume their gender?',
      characterImage: '/assets/characters/Joel-1.png',
    },
    {
      speaker: 'Debbie',
      text: 'So rude.',
      characterImage: '/assets/characters/Debbie-1.png',
    },
    {
      speaker: 'Jenn',
      text: 'I\'m going to have to write you up for that one.',
      characterImage: '/assets/characters/Jenn-1.png',
    },
    {
      speaker: 'Narrator',
      text: 'Mysterious Caller puts Mushi on FaceTime',
    },
    {
      speaker: 'Mysterious Caller',
      text: 'SHUT UP. If you don\'t destroy all of the evidence you have on us…',
      characterImage: '/assets/characters/Hooded-Caller.png',
    },
    {
      speaker: 'Mysterious Caller',
      text: 'We kill him.',
      characterImage: '/assets/characters/Hooded-Caller.png',
    },
    {
      speaker: 'Rab',
      text: 'What? NO!',
      characterImage: '/assets/characters/Rab-1.png',
    },
    {
      speaker: 'Mysterious Caller',
      text: 'You have 48 hours.',
      characterImage: '/assets/characters/Hooded-Caller.png',
    },
    {
      speaker: 'Elyse',
      text: 'So what are we going to do?',
      characterImage: '/assets/characters/Elyse-1.png',
    },
    {
      speaker: 'Rab',
      text: 'We prepare for war. Here\'s the plan…',
      characterImage: '/assets/characters/Rab-1.png',
    },
  ],
};

export default scene07TeamAssembly;