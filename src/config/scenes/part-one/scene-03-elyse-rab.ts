/**
Scene: Elyse & Rab
Rab and Elyse discuss suspicious activity and consider investigating further.
 */

import type { Scene } from '@/shared/types/game';

export const scene03ElyseRab: Scene = {
  sceneId: 3,
  title: 'Elyse & Rab',
  backgroundImage: '/assets/backgrounds/Elyse_Screen.png',
  backgroundMusic: '/assets/audio/Scheming%20music.mp3#t=20',
  backgroundTransform: 'scale(1) translateY(-20%)',
  dialogues: [
    {
      speaker: 'Rab',
      text: 'It just doesn\'t make sense. They never seem to miss a shot, yet most of the shots are impossible!',
      characterImage: '/assets/characters/Rab/Rab_Idle_Suss.png',
    },
    {
      speaker: 'Elyse',
      text: 'Weird. Do you think there\'s something fishy going on?',
      characterImage: '/assets/characters/Elyse-1.png',
    },
    {
      speaker: 'Rab',
      text: 'Almost certainly…',
      characterImage: '/assets/characters/Rab_Concerned.png',
    },
    {
      speaker: 'Rab',
      text: 'I\'m not sure what. But I\'m going to find out.',
      characterImage: '/assets/characters/Rab/Rab_Concerned.png',
    },
    {
      speaker: 'Elyse',
      text: 'Do you want me to stalk them online?',
      characterImage: '/assets/characters/Elyse-1.png',
    },
    {
      speaker: 'Elyse',
      text: 'I could find out who their mother\'s, sister\'s grandfather\'s second cousin is…',
      characterImage: '/assets/characters/Elyse-1.png',
    },
    {
      speaker: 'Elyse',
      text: 'Maybe they committed incest…',
      characterImage: '/assets/characters/Elyse-1.png',
    },
    {
      speaker: 'Elyse',
      text: 'Or maybe they were Asian.',
      characterImage: '/assets/characters/Elyse-1.png',
    },
    {
      speaker: 'Elyse',
      text: 'Or autistic.',
      characterImage: '/assets/characters/Elyse-1.png',
    },
    {
      speaker: 'Rab',
      text: 'Hm… I think we could do something even better…',
      characterImage: '/assets/characters/Rab-1.png',
    },
  ],
};