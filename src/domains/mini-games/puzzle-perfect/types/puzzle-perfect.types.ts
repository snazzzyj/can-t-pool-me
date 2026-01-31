export interface PlayerInfo {
  id: string;
  name: string;
  color: string;
  portrait: string; // URL to image
}

export interface PuzzlePerfectState {
  // Game State
  currentRound: 1 | 2 | 3 | 4;
  currentPlayerIndex: 0 | 1 | 2 | 3 | 4; // Jenn, Joel, Debbie, Elyse, Rab
  gameStatus: 'idle' | 'playing' | 'paused' | 'round-complete' | 'round-failed' | 'game-complete';

  // Round State
  livesRemaining: number[]; // Array of lives per player
  timeRemaining: number; // milliseconds
  puzzlesCompleted: number; // 0-5 (or 0-10 for frenzy)

  // Current Puzzle
  currentPuzzle: {
    shape: number[][]; // Polygon coordinates
    correctOrientation: number; // 0-7 (depending on round)
    currentOrientation: number; // 0-7
    targetHoleIndex: number; // 0-4
  };

  // Failed Players (must wait for retry)
  failedPlayers: number[]; // Array of player indices waiting to retry

  // Performance Tracking
  playerStats: PlayerStats[];

  // Round History
  roundResults: RoundResult[];
}

export interface PlayerStats {
  playerId: number;
  completionTimes: number[]; // milliseconds per puzzle
  errorCount: number;
  fastestSolve: number;
}

export interface RoundResult {
  roundNumber: number;
  completed: boolean;
  timeUsed: number;
  livesLost: number;
}

export interface GameStats {
  playerStats: PlayerStats[];
  roundResults: RoundResult[];
  totalTime: number;
  totalErrors: number;
}

export interface PuzzlePerfectProps {
  onComplete: (stats: GameStats) => void;
  onFail?: () => void;
}
