/**
Scene: Debbie & Rab
Rab visits Debbie at her cafe and recruits her to investigate a mysterious pool player who never misses a shot.
 */

import type { Scene } from '@/shared/types/game';

export const scene04DebbieRab: Scene = {
  sceneId: 4,
  title: 'Debbie & Rab',
  backgroundImage: '/assets/backgrounds/Deb_Screen.png',
  backgroundPosition: 'center bottom',
  backgroundTransform: 'scale(1.1) translateY(-20%)',
  backgroundMusic: '/assets/audio/music/scene-5.mp3',
  duration: 45,

  characters: [
    {
      image: '/assets/characters/Debbie-Moth.png',
      position: 'left',
      zIndex: 10,
      scale: 5,
      offsetX: '60%',
      offsetY: '50%',
    },
  ],

  dialogues: [
    {
      speaker: 'Rab',
      text: 'One long black please!',
      characterImage: '/assets/characters/Rab-1.png',
    },
    {
      speaker: 'Debbie',
      text: 'Rab!!! How have you been?!',
      characterImage: '/assets/characters/Debbie-1.png',
    },
    {
      speaker: 'Rab',
      text: 'Pretty good homie. Wow I love what you\'ve done with the place!',
      characterImage: '/assets/characters/Rab-1.png',
    },
    {
      speaker: 'Debbie',
      text: 'Thanks! It was a bit of a mission but I\'m really proud of it...',
      characterImage: '/assets/characters/Debbie-1.png',
    },
    {
      speaker: 'Debbie',
      text: 'And so are Moth and Mantis!',
      characterImage: '/assets/characters/Debbie-1.png',
    },
    {
      speaker: 'Debbie',
      text: 'How have you been?',
      characterImage: '/assets/characters/Debbie-1.png',
    },
    {
      speaker: 'Rab',
      text: 'Yeah pretty good. I\'ve been researching this pool player who never seems to miss a shot…',
      characterImage: '/assets/characters/Rab-1.png',
    },
    {
      speaker: 'Rab',
      text: 'Seems a bit sketchy. I was gonna go do some digging… wanna join?',
      characterImage: '/assets/characters/Rab-1.png',
    },
    {
      speaker: 'Debbie',
      text: 'Yeah man! Let\'s go!',
      characterImage: '/assets/characters/Debbie-1.png',
    },
    {
      speaker: 'Rab',
      text: 'Haha I knew I could count on Dark Debbie.',
      characterImage: '/assets/characters/Rab-1.png',
    },
  ],
};