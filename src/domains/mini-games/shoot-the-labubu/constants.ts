/**
 * Shoot the Labubu - Game constants
 */

import type { LevelConfig } from './types';
import { getAssetPath } from '@/shared/utils/game';

export const SCREEN_WIDTH = 1920;
export const SCREEN_HEIGHT = 1080;

/** Top bar height; game area below */
export const TOP_BAR_HEIGHT = 80;
/** Y position where Labubus count as "reached shooter line" (damage) */
export const SHOOTER_LINE_Y = 880;
/** Bottom bar starts */
export const BOTTOM_BAR_TOP = 920;

/** Shared health pool */
export const MAX_HEALTH = 30;

/** Ammo = labubus per wave * 1.3, per shooter */
export const AMMO_MULTIPLIER = 1.3;

/** Labubus per wave by level */
export const LABUBUS_PER_WAVE: Record<1 | 2 | 3, number> = {
  1: 15,
  2: 20,
  3: 25,
};

/** Wave duration in seconds */
export const WAVE_DURATION_SECONDS = 45;
/** Inter-wave pause in ms */
export const INTER_WAVE_PAUSE_MS = 3000;
/** Countdown seconds before wave */
export const COUNTDOWN_SECONDS = 3;

/** Bullet size and speed */
export const BULLET_SIZE = 8;
export const BULLET_SPEED = 600; // px per second

/** Labubu size */
export const LABUBU_SIZE = 42;

/** Collector bucket width (2 Labubu widths) and forgiveness */
export const BUCKET_WIDTH = 84;
export const BUCKET_FORGIVENESS = 10;
export const BUCKET_HEIGHT = 48;
/** Collector movement speed px/s */
export const COLLECTOR_SPEED = 300;

/** Bodies per heal and HP per heal */
export const BODIES_PER_HEAL = 10;
export const HP_PER_HEAL = 5;

/** Shooter lane X positions (center of lane) */
export const SHOOTER_LANE_X: Record<'left' | 'center' | 'right', number> = {
  left: 400,
  center: 960,
  right: 1520,
};

/** Shooter portrait Y (above ammo bar) */
export const SHOOTER_PORTRAIT_Y = 950;
/** Shooter movement speed px/s */
export const SHOOTER_SPEED = 400;
/** Collector track: min and max X for bucket center */
export const COLLECTOR_MIN_X = 200;
export const COLLECTOR_MAX_X = 1720;

/** Shooter track bounds (prevent them from leaving their designated areas if desired, or allow full screen) */
/** For now, let's allow them to move across the whole screen but stay within safe margins */
export const SHOOTER_MIN_X = 100;
export const SHOOTER_MAX_X = 1820;

/** Level configs: labubus per wave, base speed (px/s), wave duration, ammo per shooter */
export const LEVEL_CONFIGS: Record<1 | 2 | 3, LevelConfig> = {
  1: {
    labubusPerWave: 15,
    baseSpeed: 120,
    waveDurationSeconds: 45,
    ammoPerShooter: 40,
  },
  2: {
    labubusPerWave: 20,
    baseSpeed: 160,
    waveDurationSeconds: 45,
    ammoPerShooter: 40,
  },
  3: {
    labubusPerWave: 25,
    baseSpeed: 200,
    waveDurationSeconds: 45,
    ammoPerShooter: 40,
  },
};

/** Speed ramp: wave progresses 0% -> 100%, speed goes base -> base * 1.25 */
export const WAVE_SPEED_RAMP_END = 1.25;

/** Character portrait paths (shooters and collectors) */
export const CHARACTER_PORTRAITS = {
  rab: getAssetPath('/assets/characters/Rab-1.png'),
  jenn: getAssetPath('/assets/characters/Jenn-1.png'),
  joel: getAssetPath('/assets/characters/Joel-1.png'),
  elyse: getAssetPath('/assets/characters/Elyse-1.png'),
  debbie: getAssetPath('/assets/characters/Debbie-1.png'),
} as const;

/** Labubu sprite paths: Labubu-1 through Labubu-5 map to colors */
export const LABUBU_SPRITES: Record<'red' | 'blue' | 'green' | 'yellow' | 'purple', string> = {
  red: getAssetPath('/assets/minigames/shoot-the-labubu/Labubus/Labubu-1.png'),
  blue: getAssetPath('/assets/minigames/shoot-the-labubu/Labubus/Labubu-2.png'),
  green: getAssetPath('/assets/minigames/shoot-the-labubu/Labubus/Labubu-3.png'),
  yellow: getAssetPath('/assets/minigames/shoot-the-labubu/Labubus/Labubu-4.png'),
  purple: getAssetPath('/assets/minigames/shoot-the-labubu/Labubus/Labubu-5.png'),
};

export const BASKET_SPRITE = getAssetPath('/assets/minigames/shoot-the-labubu/Basket.png');

export const LABUBU_COLORS: Array<'red' | 'blue' | 'green' | 'yellow' | 'purple'> = [
  'red',
  'blue',
  'green',
  'yellow',
  'purple',
];

/** Fire cooldown in ms between shots per shooter */
export const FIRE_COOLDOWN_MS = 150;
