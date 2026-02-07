
export enum GameState {
  PLAYER_COUNT_SELECTION = 'PLAYER_COUNT_SELECTION',
  ANIMAL_SELECTION = 'ANIMAL_SELECTION',
  COUNTDOWN = 'COUNTDOWN',
  PLAYING = 'PLAYING',
  PAUSED = 'PAUSED',
  TRANSITION = 'TRANSITION',
  VICTORY = 'VICTORY',
  GAME_OVER = 'GAME_OVER'
}

export enum LevelType {
  DESERT = 'DESERT',
  RAINFOREST = 'RAINFOREST',
  SNOWSTORM = 'SNOWSTORM'
}

export interface PlayerData {
  id: number;
  codename: string;
  key: string;
  color: string;
  animal: string;
  lives: number;
  y: number;
  vy: number;
  isJumping: boolean;
  isInvincible: boolean;
  invincibilityTimer: number;
  isDead: boolean;
  deathTimer: number;
  progress: number;
  finishTime: number | null;
  assetPath: string;
}

export interface Obstacle {
  id: string;
  x: number;
  type: string;
  width: number;
  height: number;
  emoji?: string;
  color?: string;
}
export interface LevelConfig {
  name: string;
  speed: number;
  spawnFreq: [number, number];
  bgColor: string;
  backgroundImage: string;
  obstacles: Array<{
    type: string;
    width: number;
    height: number;
    emoji?: string;
  }>;
}

export interface Animal {
  id: string;
  name: string;
  assetPath: string;
}