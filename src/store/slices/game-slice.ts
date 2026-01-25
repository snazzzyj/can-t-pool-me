import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { GamePhase } from '@/shared/types/game';

/**
 * Game State Slice
 * Manages global game progression, session, and loading states
 * Following: Avoid context duplication - "game" context is implicit from filename
 */

type State = {
  readonly phase: GamePhase;
  readonly sessionId: string | null;
  readonly isLoading: boolean;
  readonly error: string | null;
  readonly sceneId: number;
  readonly currentScene: string;
};

const initialState: State = {
  phase: 'menu',
  sessionId: null,
  isLoading: false,
  error: null,
  sceneId: 1,
  currentScene: 'scene-01-finn-rab', // or your starting scene
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setPhase: (state, action: PayloadAction<GamePhase>) => {
      state.phase = action.payload;
    },
    setSessionId: (state, action: PayloadAction<string>) => {
      state.sessionId = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setSceneId: (state, action: PayloadAction<number>) => {
      state.sceneId = action.payload;
    },
    setCurrentScene: (state, action: PayloadAction<string>) => {
      state.currentScene = action.payload;
    },
    reset: () => initialState,
  },
});

export const { 
  setPhase, 
  setSessionId, 
  setIsLoading, 
  setError, 
  setSceneId, 
  setCurrentScene,
  reset 
} = gameSlice.actions;

export default gameSlice.reducer;

// Selectors
export const selectCurrentScene = (state: { game: State }) => state.game.currentScene;
export const selectSceneId = (state: { game: State }) => state.game.sceneId;