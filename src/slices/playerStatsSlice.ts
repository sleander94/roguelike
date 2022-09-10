import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../app/store';

export interface PlayerStats {
  health: number;
  maxHealth: number;
  block: number;
}

export interface PlayerInfoState {
  name: string;
  stats: PlayerStats;
}

const initialState: PlayerInfoState = {
  name: 'Player',
  stats: {
    health: 30,
    maxHealth: 30,
    block: 0,
  },
};

export const resourceBarSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    damagePlayer: (state, action: PayloadAction<number>) => {
      let damage = action.payload;
      damage -= state.stats.block;
      state.stats.block = Math.max((state.stats.block -= action.payload), 0);
      if (damage > 0) state.stats.health -= damage;
    },
    healPlayer: (state, action: PayloadAction<number>) => {
      if (state.stats.health + action.payload <= state.stats.maxHealth) {
        state.stats.health += action.payload;
      } else {
        state.stats.health = state.stats.maxHealth;
      }
    },
    addBlock: (state, action: PayloadAction<number>) => {
      state.stats.block += action.payload;
    },
    removeBlock: (state) => {
      state.stats.block = 0;
    },
  },
});

export const { damagePlayer, healPlayer, addBlock, removeBlock } =
  resourceBarSlice.actions;

export const selectHealth = (state: RootState) => state.player.stats.health;
export const selectMaxHealth = (state: RootState) =>
  state.player.stats.maxHealth;
export const selectBlock = (state: RootState) => state.player.stats.block;

export default resourceBarSlice.reducer;
