import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../app/store';
import { v4 as uuidv4 } from 'uuid';

export interface Enemy {
  id: string;
  name: string;
  health: number;
  maxHealth: number;
  attack: number;
}

export interface EnemiesState {
  enemies: any;
  selectedEnemy: Enemy | null;
}

const initialState: EnemiesState = {
  enemies: {},
  selectedEnemy: null,
};

export const enemiesSlice = createSlice({
  name: 'enemies',
  initialState,
  reducers: {
    setSelected: (state, action: PayloadAction<string | null>) => {
      if (action.payload) state.selectedEnemy = state.enemies[action.payload];
      else state.selectedEnemy = null;
    },
    addEnemy: (
      state,
      action: PayloadAction<{
        name: string;
        health: number;
        maxHealth: number;
        attack: number;
      }>
    ) => {
      const id = uuidv4();
      const enemy: Enemy = {
        id: id,
        name: action.payload.name,
        health: action.payload.health,
        maxHealth: action.payload.maxHealth,
        attack: action.payload.attack,
      };
      state.enemies[id] = enemy;
    },
    damageEnemy: (
      state,
      action: PayloadAction<{ value: number; id: string }>
    ) => {
      state.enemies[action.payload.id].health -= action.payload.value;
      if (state.enemies[action.payload.id].health <= 0)
        delete state.enemies[action.payload.id];
    },
  },
});

export const { setSelected, addEnemy, damageEnemy } = enemiesSlice.actions;

export const selectEnemies = (state: RootState) => state.enemies.enemies;
export const selectSelectedEnemy = (state: RootState) =>
  state.enemies.selectedEnemy;

export default enemiesSlice.reducer;
