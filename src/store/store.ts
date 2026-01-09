import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import gameReducer from './slices/game-slice';
import playersReducer from './slices/players-slice';

export const store = configureStore({
  reducer: {
    game: gameReducer,
    players: playersReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: process.env.NODE_ENV === 'development',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
