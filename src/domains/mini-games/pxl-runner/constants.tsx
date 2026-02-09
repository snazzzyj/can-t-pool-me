import { LevelType, LevelConfig, Animal } from './types';

export const SCREEN_WIDTH = 1920;
export const SCREEN_HEIGHT = 1080;
export const LANE_HEIGHT = 216;
export const PLAYER_X = SCREEN_WIDTH * 0.2;
export const GROUND_Y = LANE_HEIGHT * 0.8;
export const GRAVITY = 0.4;
export const INITIAL_LIVES = 3;
export const INVINCIBILITY_DURATION = 1000;
export const DEATH_DURATION = 2000;
export const LEVEL_TIME = 30;

export const ANIMALS: Animal[] = [
  { id: 'chicken', name: 'Chicken', assetPath: '/assets/minigames/pxl-runner/animals/Chicken.png' },
  { id: 'snail', name: 'Snail', assetPath: '/assets/minigames/pxl-runner/animals/Snail.png' },
  { id: 'frog', name: 'Frog', assetPath: '/assets/minigames/pxl-runner/animals/Frog.png' },
  { id: 'goose', name: 'Goose', assetPath: '/assets/minigames/pxl-runner/animals/Goose.png' },
  { id: 'dino', name: 'Dino', assetPath: '/assets/minigames/pxl-runner/animals/Dino.png' },
  { id: 'rabbit', name: 'Rabbit', assetPath: '/assets/minigames/pxl-runner/animals/Bun.png' },
];

export const PLAYERS_INIT = [
  { id: 0, codename: 'Rab', key: 'R', color: '#3498DB' },
  { id: 1, codename: 'Big Iron McGee', key: 'E', color: '#E74C3C' },
  { id: 2, codename: '.pxl', key: 'D', color: '#2ECC71' },
  { id: 3, codename: 'Hacktress', key: 'H', color: '#F39C12' },
  { id: 4, codename: 'Hackerman', key: 'J', color: '#9B59B6' },
];

export const LEVELS: Record<LevelType, LevelConfig> = {
  [LevelType.DESERT]: {
    name: 'Desert',
    speed: 280,
    spawnFreq: [1.5, 2.5],
    bgColor: '#F4D03F',
    backgroundImage: '/assets/minigames/pxl-runner/backgrounds/Desert.png',
    obstacles: [
      { type: 'Small Cactus', width: 24, height: 32, emoji: '🌵' },
      { type: 'Large Rock', width: 32, height: 40, emoji: '🪨' },
      { type: 'Tumbleweed', width: 28, height: 28, emoji: '🌾' },
    ],
  },
  [LevelType.RAINFOREST]: {
    name: 'Rainforest',
    speed: 336,
    spawnFreq: [1.2, 2.0],
    bgColor: '#27AE60',
    backgroundImage: '/assets/minigames/pxl-runner/backgrounds/rainforest.png',
    obstacles: [
      { type: 'Low Vine', width: 20, height: 36, emoji: '🌿' },
      { type: 'Tree Trunk', width: 36, height: 44, emoji: '🪵' },
      { type: 'Jungle Snake', width: 40, height: 24, emoji: '🐍' },
    ],
  },
  [LevelType.SNOWSTORM]: {
    name: 'Snowstorm',
    speed: 437,
    spawnFreq: [1.0, 1.5],
    bgColor: '#ECF0F1',
    backgroundImage: '/assets/minigames/pxl-runner/backgrounds/snowstorm.png',
    obstacles: [
      { type: 'Ice Spike', width: 22, height: 38, emoji: '🍦' },
      { type: 'Snowdrift', width: 38, height: 42, emoji: '☃️' },

      { type: 'Rock', width: 40, height: 46, emoji: '🪨' },
    ],
  },
};