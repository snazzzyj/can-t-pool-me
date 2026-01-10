/**
 * Visual Novel Configuration
 * 7 scenes across 2 parts with dialogue, characters, and music
 */

import type { Scene } from '@/shared/types/game';

export const GAME_CONFIG = {
  MAX_PLAYERS: 5,
  SCENE_COUNT: 7,
  SCENES_PART_1: 4,
  SCENES_PART_2: 3,
  MINI_GAMES_COUNT: 5,
};

export const SCENE_DATABASE: Record<number, Scene> = {
  1: {
    sceneId: 1,
    title: 'Jenn & Rab',
    backgroundImage: '/assets/backgrounds/scene-1.jpg',
    backgroundMusic: '/assets/audio/music/scene-1.mp3',
    duration: 120,
    dialogues: [
      {
  speaker: 'Jenn',
  text: 'Brohoe! What are you doing out here?',
  characterImage: 'assets/characters/Jenn-1.png',
},
  {
    speaker: 'Rab',
    text: 'I could ask you the same thing.',
    characterImage: '/assets/characters/Rab-1.png',
  },
  {
    speaker: 'Jenn',
    text: 'Well I\m just practicing my drop-ins while I wait for my 3D print to finish and my latest single while also trying to beat my PB on the rubik\s cube.',
    characterImage: 'assets/characters/Jenn-1.png',
  },
  {
    speaker: 'Jenn',
    text: 'Now what are you doing here?',
    characterImage: 'assets/characters/Jenn-1.png',
  },
  {
    speaker: 'Rab',
    text: 'Well, just wanted to ask if you wanted to go on a bit of an undercover field trip…',
    characterImage: '/assets/characters/Rab-1.png',
  },
  {
    speaker: 'Jenn',
    text: 'Wait, like a mission? Is it a HEIST?!',
    characterImage: 'assets/characters/Jenn-1.png',
  },
  {
    speaker: 'Rab',
    text: 'Maybe…',
    characterImage: '/assets/characters/Rab-1.png',
  },
  {
    speaker: 'Jenn',
    text: 'I\m in. Let\s go.',
    characterImage: 'assets/characters/Jenn-1.png',
  },
  {
    speaker: 'Rab',
    text: 'Don\t you have any questions?',
    characterImage: '/assets/characters/Rab-1.png',
  },
  {
    speaker: 'Jenn',
    text: 'Yeah…',
    characterImage: 'assets/characters/Jenn-1.png',
  },
  {
    speaker: 'Jenn',
    text: 'Can we get a slushy on the way there?',
    characterImage: 'assets/characters/Jenn-1.png',
  },
    ],
  },
  // Additional scenes would follow this pattern
};



export const MINI_GAME_TYPES = [
  'quick-time',
  'memory',
  'quiz',
  'rhythm',
  'puzzle',
] as const;

export const BOSS_PHASES = 3;
export const BOSS_HEALTH_PER_PHASE = 100;
