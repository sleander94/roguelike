import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../app/store';

export interface GameLogicState {
  gameStarted: boolean;
  navigate: boolean;
  battle: boolean;
  playerTurn: boolean;
  enemyTurn: boolean;
  rewards: boolean;
}

const initialState: GameLogicState = {
  gameStarted: true,
  navigate: false,
  battle: false,
  playerTurn: true,
  enemyTurn: false,
  rewards: false,
};

export const gameLogicSlice = createSlice({
  name: 'game logic',
  initialState,
  reducers: {
    startGame: (state) => {
      state.gameStarted = true;
    },
    endGame: (state) => {
      state.gameStarted = false;
    },
    startBattle: (state) => {
      state.battle = true;
    },
    endBattle: (state) => {
      state.battle = false;
    },
    startPlayerTurn: (state) => {
      state.playerTurn = true;
    },
    endPlayerTurn: (state) => {
      state.playerTurn = false;
    },
    startEnemyTurn: (state) => {
      state.enemyTurn = true;
    },
    endEnemyTurn: (state) => {
      state.enemyTurn = false;
    },
  },
});

export const {
  startGame,
  endGame,
  startBattle,
  endBattle,
  startPlayerTurn,
  endPlayerTurn,
  startEnemyTurn,
  endEnemyTurn,
} = gameLogicSlice.actions;

export const selectGameStarted = (state: RootState) =>
  state.gameLogic.gameStarted;
export const selectBattleStarted = (state: RootState) => state.gameLogic.battle;
export const selectPlayerTurn = (state: RootState) =>
  state.gameLogic.playerTurn;
export const selectEnemyTurn = (state: RootState) => state.gameLogic.enemyTurn;

export default gameLogicSlice.reducer;
