import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export interface TestState {
  value: number;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: TestState = {
  value: 25,
  status: 'idle',
};

export let max: number = 25;

export const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    smallHeal: (state) => {
      state.value <= max - 3 ? (state.value += 3) : (state.value = max);
    },
    damage: (state, action: PayloadAction<number>) => {
      state.value -= action.payload;
    },
  },
});

export const { smallHeal, damage } = testSlice.actions;

export const selectTest = (state: RootState) => state.test.value;

export default testSlice.reducer;
