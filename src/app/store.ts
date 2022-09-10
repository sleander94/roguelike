import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import testReducer from '../features/test/testSlice';
import playerStatsReducer from '../features/playerStatsSlice';
import enemiesReducer from '../features/enemySlice';
import deckReducer from '../features/deckSlice';
import gameLogicReducer from '../features/gameLogicSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    test: testReducer,
    gameLogic: gameLogicReducer,
    player: playerStatsReducer,
    enemies: enemiesReducer,
    deck: deckReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
