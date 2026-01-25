/**
 * Scene 05: Jenn & Rab
 * Introduction of Jenn (Hacktress)
 */

import type { Scene } from '@/shared/types/game';

export const scene05JennRab: Scene = {
  sceneId: 5,
  title: 'Jenn & Rab',
  backgroundImage: '/assets/backgrounds/scene-1.jpg',
  backgroundMusic: '/assets/audio/music/scene-1.mp3',
  duration: 120,
  dialogues: [
    {
      speaker: 'Jenn',
      text: 'Brohoe! What are you doing out here?',
      characterImage: '/assets/characters/Jenn-1.png',
    },
    {
      speaker: 'Rab',
      text: 'I could ask you the same thing.',
      characterImage: '/assets/characters/Rab-1.png',
    },
    {
      speaker: 'Jenn',
      text: 'Well I\'m just practicing my drop-ins while I wait for my 3D print to finish while also trying to beat my PB on the Rubik\'s cube.',
      characterImage: '/assets/characters/Jenn-1.png',
    },
    {
      speaker: 'Jenn',
      text: 'Now what are you doing here?',
      characterImage: '/assets/characters/Jenn-1.png',
    },
    {
      speaker: 'Rab',
      text: 'Well, just wanted to ask if you wanted to go on a bit of an undercover field trip…',
      characterImage: '/assets/characters/Rab-1.png',
    },
    {
      speaker: 'Jenn',
      text: 'Wait, like a mission? Is it a HEIST?!',
      characterImage: '/assets/characters/Jenn-1.png',
    },
    {
      speaker: 'Rab',
      text: 'Maybe…',
      characterImage: '/assets/characters/Rab-1.png',
    },
    {
      speaker: 'Jenn',
      text: 'I\'m in. Let\'s go.',
      characterImage: '/assets/characters/Jenn-1.png',
    },
    {
      speaker: 'Rab',
      text: 'Don\'t you have any questions?',
      characterImage: '/assets/characters/Rab-1.png',
    },
    {
      speaker: 'Jenn',
      text: 'Yeah…',
      characterImage: '/assets/characters/Jenn-1.png',
    },
    {
      speaker: 'Jenn',
      text: 'Can we get a slushy on the way there?',
      characterImage: '/assets/characters/Jenn-1.png',
    },
  ],
};
