import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../slices/counter/counterSlice';
import testReducer from '../slices/test/testSlice';
import playerStatsReducer from '../slices/playerStatsSlice';
import enemiesReducer from '../slices/enemySlice';
import deckReducer from '../slices/deckSlice';
import gameLogicReducer from '../slices/gameLogicSlice';

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
