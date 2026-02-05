export type GameStatus = 'instructions' | 'playing' | 'between-levels' | 'victory' | 'retry';

export interface PlayerResult {
  playerId: 1 | 2 | 3 | 4 | 5;
  characterName: string;
  keyPressed: boolean;
  pressTimestamp: number | null;
  linePosition: number; // 0-100
  hitGreenZone: boolean;
  hitPerfectZone: boolean;
  pointsEarned: number;
}

export interface LevelState {
  greenZoneSize: number; // percentage
  lineSpeed: number; // ms per sweep
  timeLimit: number;
  timeRemaining: number;
}
