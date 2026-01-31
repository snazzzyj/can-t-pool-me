
export enum GameStatus {
  PRE_GAME = 'pre-game',
  COUNTDOWN = 'countdown',
  PLAYING = 'playing',
  ROUND_COMPLETE = 'round-complete',
  ROUND_FAILED = 'round-failed',
  VICTORY = 'victory'
}

export interface PlayerStats {
  correct: number;
  total: number;
}

export interface RoundStat {
  round: number;
  totalKeypresses: number;
  correctKeypresses: number;
  incorrectKeypresses: number;
  timeElapsed: number;
  playerAccuracy: Record<string, PlayerStats>;
}

export type PlayerKey = 'rab' | 'elyse' | 'debbie' | 'jenn' | 'joel';

export interface Command {
  text: string;
  timeLimit: number;
}

export interface Round {
  id: number;
  title: string;
  commands: Command[];
}
