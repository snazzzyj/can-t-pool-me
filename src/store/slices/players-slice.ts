import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Player } from '@/shared/types/game';

/**
 * Players State Slice
 * Manages active players, their roles, scores, and connection status
 * Following: Avoid context duplication - "players" context is implicit
 */

type State = {
  readonly items: ReadonlyArray<Player>;
  readonly currentId: string | null;
  readonly maxCount: number;
};

const initialState: State = {
  items: [],
  currentId: null,
  maxCount: 5,
};

const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Player>) => {
      if (state.items.length < state.maxCount) {
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      }
      return state;
    },
    remove: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        items: state.items.filter((p) => p.id !== action.payload),
      };
    },
    update: (state, action: PayloadAction<Player>) => {
      const index = state.items.findIndex((p) => p.id === action.payload.id);
      if (index >= 0) {
        const newItems = [...state.items];
        newItems[index] = action.payload;
        return {
          ...state,
          items: newItems,
        };
      }
      return state;
    },
    setCurrentId: (state, action: PayloadAction<string | null>) => {
      state.currentId = action.payload;
    },
    setAll: (state, action: PayloadAction<ReadonlyArray<Player>>) => {
      state.items = [...action.payload];
    },
    reset: () => initialState,
  },
});

export const { add, remove, update, setCurrentId, setAll, reset } = playersSlice.actions;

export default playersSlice.reducer;

