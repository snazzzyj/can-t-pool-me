/**
 * Game State Types
 * Following naming conventions: PascalCase for types, domain-focused naming
 */

export type GamePhase = 'menu' | 'visual-novel-part-1' | 'visual-novel-part-2' | 'mini-games' | 'boss-level' | 'results';

export type PlayerRole = 'spectator' | 'active-player' | 'dialogue-partner';

export type Player = {
  readonly id: string;
  readonly name: string;
  readonly role: PlayerRole;
  readonly joinedAt: Date;
  readonly score: number;
  readonly isConnected: boolean;
};

export type GameSession = {
  readonly sessionId: string;
  readonly players: ReadonlyArray<Player>;
  readonly currentPhase: GamePhase;
  readonly createdAt: Date;
  readonly maxPlayers: number;
};

export type SceneDialogue = {
  readonly speaker: string;
  readonly text: string;
  readonly characterImage?: string;
};

export type Scene = {
  readonly sceneId: number;
  readonly id?: string; // For Part Two scenes
  readonly title: string;
  readonly part?: 'one' | 'two'; // For Part Two scenes
  readonly order?: number; // For Part Two scenes
  readonly backgroundImage: string;
  readonly dialogues: ReadonlyArray<SceneDialogue>;
  readonly backgroundMusic?: string;
  readonly duration?: number;
  readonly nextScene?: string; // ← ADD THIS LINE - Links to next scene
};

export type MiniGameType = 'quick-time' | 'memory' | 'quiz' | 'rhythm' | 'puzzle';

export type MiniGameScore = {
  readonly playerId: string;
  readonly gameType: MiniGameType;
  readonly score: number;
  readonly completedAt: Date;
};

export type BossPhase = {
  readonly phaseNumber: number;
  readonly health: number;
  readonly maxHealth: number;
  readonly difficulty: 'normal' | 'hard' | 'insane';
};

export type TransitionSlide = {
  readonly type: 'transition';
  readonly title: string;
  readonly subtitle: string;
  readonly backgroundImage?: string;
};

export type SceneEntry = Scene | TransitionSlide;