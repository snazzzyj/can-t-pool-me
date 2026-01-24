/**
 * Visual Novel Configuration
 * 7 scenes across 2 parts with dialogue, characters, and music
 */

import type { Scene, TransitionSlide } from '@/shared/types/game';

export const GAME_CONFIG = {
  MAX_PLAYERS: 5,
  SCENE_COUNT: 9, // Updated to include transition slides
  MINI_GAMES_COUNT: 5,
};

export const SCENE_DATABASE: Record<number, Scene | TransitionSlide> = {
  0: {
    type: 'transition',
    title: 'Chapter 1',
    subtitle: 'The Mystery Begins',
    // backgroundImage: '/assets/backgrounds/transition-1.png', // Optional
  },

  1: {
    type: 'scene',
    sceneId: 1,
    title: 'Finn & Rab',
    backgroundImage: '/assets/backgrounds/scene-1.jpg',
    backgroundMusic: '/assets/audio/music/scene-1.mp3',
    duration: 120,
    dialogues: [
      {
        speaker: 'Finn',
        text: 'Sup Broooskiiiii',
        characterImage: '/assets/characters/Finn.png',
      },
      {
        speaker: 'Rab',
        text: 'Yo wassupppp',
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
        text: 'Yeah nah, I don\'t know.',
        characterImage: '/assets/characters/Rab-1.png',
      },
      {
        speaker: 'Rab',
        text: 'I think I want to try something completely different now…',
        characterImage: '/assets/characters/Rab-1.png',
      },
      {
        speaker: 'Finn',
        text: 'Oh what was that?',
        characterImage: '/assets/characters/Finn.png',
      },
      {
        speaker: 'Rab',
        text: 'I was thinking maybe something to do with pool? I\'m not sure yet man, but what do you think?',
        characterImage: '/assets/characters/Rab-1.png',
      },
      {
        speaker: 'Finn',
        text: 'I think you should *insert genuine advice that Finn would actually say*',
        characterImage: '/assets/characters/Finn.png',
      },
      {
        speaker: 'Rab',
        text: 'Alright man, I\'m gonna do more thinking on it. Goodnight! Or Goodmorning or whatever time it is there.',
        characterImage: '/assets/characters/Rab-1.png',
      },
      {
        speaker: 'Finn',
        text: 'Haha alright, good luck man!',
        characterImage: '/assets/characters/Finn.png',
      },
    ],
  },

  2: {
    type: 'transition',
    title: 'A Few Days Later',
    subtitle: 'Rab discovers something suspicious...',
    // backgroundImage: '/assets/backgrounds/transition-2.png', // Optional
  },

  3: {
    type: 'scene',
    sceneId: 2,
    title: 'Rab gets suspicious',
    backgroundImage: '/assets/backgrounds/scene-1.jpg',
    backgroundMusic: '/assets/audio/music/scene-1.mp3',
    duration: 120,
    dialogues: [
      {
        speaker: 'Rab',
        text: 'hmmm I wonder how they\'re doing that...',
        characterImage: '/assets/characters/Rab-1.png',
      },
    ],
  },

  4: {
    type: 'transition',
    title: 'Chapter 2',
    subtitle: 'The plot thickens',
    // backgroundImage: '/assets/backgrounds/transition-3.png', // Optional
  },

  5: {
    type: 'scene',
    sceneId: 3,
    title: 'Mysterious Caller',
    backgroundImage: '/assets/backgrounds/scene-1.jpg',
    backgroundMusic: '/assets/audio/music/scene-1.mp3',
    duration: 120,
    dialogues: [
      {
        speaker: '...',
        text: '*phone vibrates*',
        characterImage: '/assets/characters/',
      },
      {
        speaker: 'Mysterious Caller',
        text: 'We know what you\'re doing and we suggest you stop immediately.',
        characterImage: '/assets/characters/',
      },
      {
        speaker: 'Rab',
        text: 'Who are you? Stop what?',
        characterImage: '/assets/characters/Rab/Rab_Idle_Suss.png',
      },
      {
        speaker: 'Mysterious Caller',
        text: 'It doesn\'t matter who we are. You know what to stop.',
        characterImage: '/assets/characters/',
      },
      {
        speaker: 'Mysterious Caller',
        text: '*hangs up*',
        characterImage: '/assets/characters/',
      },
    ],
  },

  6: {
    type: 'transition',
    title: 'Chapter 3',
    subtitle: 'Rab assembles his team',
    // backgroundImage: '/assets/backgrounds/transition-4.png', // Optional
  },

  7: {
    type: 'scene',
    sceneId: 4,
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
  },

  8: {
    type: 'transition',
    title: 'To Be Continued...',
    subtitle: 'The adventure is just beginning',
    // backgroundImage: '/assets/backgrounds/transition-5.png', // Optional
  },
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