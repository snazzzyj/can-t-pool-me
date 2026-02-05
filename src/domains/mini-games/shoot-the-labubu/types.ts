/**
 * Shoot the Labubu - Type definitions
 */

export type GameStatus =
  | 'pre-game'
  | 'countdown'
  | 'playing'
  | 'wave-complete'
  | 'level-complete'
  | 'game-over'
  | 'victory';

export type ShooterId = 'rab' | 'jenn' | 'joel';
export type CollectorId = 'elyse' | 'debbie';
export type Lane = 'left' | 'center' | 'right';
export type LabubuColor = 'red' | 'blue' | 'green' | 'yellow' | 'purple';

export interface ShooterState {
  isAlive: boolean;
  ammo: number;
  maxAmmo: number;
  position: { x: number; y: number };
  lane: Lane;
}

export interface CollectorState {
  position: { x: number; y: number };
  bodiesCaught: number;
}

export interface LabubuEntity {
  id: string;
  position: { x: number; y: number };
  color: LabubuColor;
  speed: number;
  isAlive: boolean;
  /** When true, Labubu is in death poof then becomes falling body */
  isDying?: boolean;
  /** When true, entity is a falling body (same sprite, falling) */
  isFalling?: boolean;
}

export interface BulletEntity {
  id: string;
  position: { x: number; y: number };
  shooterId: ShooterId;
}

export interface FallingBodyEntity {
  id: string;
  position: { x: number; y: number };
  color: LabubuColor;
}

export interface ShooterStats {
  shotsFired: number;
  shotsHit: number;
  accuracy: number;
  kills: number;
}

export interface ShootTheLabubuState {
  gameStatus: GameStatus;
  currentLevel: 1 | 2 | 3;
  currentWave: 1 | 2 | 3;
  waveTimer: number;
  sharedHealth: number;
  maxHealth: number;
  shooters: {
    rab: ShooterState;
    jenn: ShooterState;
    joel: ShooterState;
  };
  collectors: {
    elyse: CollectorState;
    debbie: CollectorState;
  };
  labubus: LabubuEntity[];
  bullets: BulletEntity[];
  fallingBodies: FallingBodyEntity[];
  stats: {
    totalBodiesCaught: number;
    elyseBodies: number;
    debbieBodies: number;
    rabStats: ShooterStats;
    jennStats: ShooterStats;
    joelStats: ShooterStats;
  };
  /** Bodies caught since last +5 HP (0-9); every 10 = +5 HP */
  bodiesSinceLastHeal: number;
  /** For visual feedback */
  screenShake: number;
  damageFlash: number;
  healFlash: number;
  /** Wave start time for speed ramp (0% -> 25% over wave) */
  waveStartTime: number | null;
}

export interface LevelConfig {
  labubusPerWave: number;
  baseSpeed: number;
  waveDurationSeconds: number;
  ammoPerShooter: number;
}
