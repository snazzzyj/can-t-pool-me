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
  readonly backgroundImage?: string;
};

export type Scene = {
  readonly sceneId: number;
  readonly id?: string;
  readonly title: string;
  readonly order?: number;
  readonly backgroundImage: string;
  readonly backgroundPosition?: string;
  readonly backgroundTransform?: string;
  readonly dialogues: ReadonlyArray<SceneDialogue>;
  readonly backgroundMusic?: string;
  readonly musicVolume?: number;
  readonly duration?: number;
  readonly nextScene?: number;
  readonly minigameComponent?: React.ComponentType<{ onComplete: () => void }>;
  readonly customIntro?: React.ComponentType<{ onComplete: () => void }>;

  readonly characters?: ReadonlyArray<{
    readonly image: string;
    readonly position?: 'left' | 'center' | 'right';
    readonly zIndex?: number;
    readonly scale?: number;
    readonly offsetX?: string;
    readonly offsetY?: string;
    readonly mirror?: boolean; // Add this
    readonly animation?: 'spin-in';
  }>;
};

export type TransitionSlide = {
  readonly type: 'transition';
  readonly title: string;
  readonly subtitle: string;
  readonly backgroundImage?: string;
};

export type SceneEntry = Scene | TransitionSlide;