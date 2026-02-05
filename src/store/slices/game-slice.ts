import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { GamePhase } from '@/shared/types/game';

/**
 * Game State Slice
 * Manages global game progression, session, and loading states
 */

type State = {
  readonly phase: GamePhase;
  readonly sessionId: string | null;
  readonly isLoading: boolean;
  readonly error: string | null;
  readonly sceneId: number;
};

const initialState: State = {
  phase: 'menu',
  sessionId: null,
  isLoading: false,
  error: null,
  sceneId: 0,
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
    reset: () => initialState,
  },
});

export const {
  setPhase,
  setSessionId,
  setIsLoading,
  setError,
  setSceneId,
  reset
} = gameSlice.actions;

export default gameSlice.reducer;

// Selectors
export const selectSceneId = (state: { game: State }) => state.game.sceneId;
export const selectGamePhase = (state: { game: State }) => state.game.phase;

// Derived selector - formats scene ID as string for menu
export const selectCurrentSceneString = (state: { game: State }) =>
  `db-${String(state.game.sceneId).padStart(2, '0')}`;