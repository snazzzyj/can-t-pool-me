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
    title: 'The Beginning',
    backgroundImage: '/assets/backgrounds/scene-1.jpg',
    backgroundMusic: '/assets/audio/music/scene-1.mp3',
    duration: 120,
    dialogues: [
      {
        speaker: 'Character A',
        text: 'Welcome to the adventure!',
        emotion: 'happy',
        characterImage: '/assets/characters/character-a.png',
      },
      {
        speaker: 'Character B',
        text: 'Are you ready to begin?',
        emotion: 'neutral',
        characterImage: '/assets/characters/character-b.png',
      },
    ],
  },
  // Additional scenes would follow this pattern
};

export const CHARACTER_EMOTIONS = [
  'happy',
  'sad',
  'angry',
  'neutral',
  'surprised',
] as const;

export const MINI_GAME_TYPES = [
  'quick-time',
  'memory',
  'quiz',
  'rhythm',
  'puzzle',
] as const;

export const BOSS_PHASES = 3;
export const BOSS_HEALTH_PER_PHASE = 100;
