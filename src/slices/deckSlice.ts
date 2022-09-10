import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../app/store';
import { Card, ArcherDeck } from '../cards';

export interface DeckState {
  mana: number;
  maxMana: number;
  drawPile: Card[];
  graveyard: Card[];
  hand: Card[];
  handSize: number;
  selectedCard: Card | null;
}

const initialState: DeckState = {
  mana: 3,
  maxMana: 3,
  drawPile: ArcherDeck,
  graveyard: [],
  hand: [],
  handSize: 5,
  selectedCard: null,
};

export const deckSlice = createSlice({
  name: 'deck',
  initialState,
  reducers: {
    shuffle: (state) => {
      let currentIndex = state.drawPile.length,
        randomIndex;
      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [state.drawPile[currentIndex], state.drawPile[randomIndex]] = [
          state.drawPile[randomIndex],
          state.drawPile[currentIndex],
        ];
      }
    },
    emptyGraveyard: (state, action: PayloadAction<Card[]>) => {
      state.drawPile = action.payload;
      state.graveyard = [];
      deckSlice.caseReducers.shuffle(state);
    },
    draw: (state, action: PayloadAction<number>) => {
      while (action.payload > 0) {
        if (state.drawPile.length === 0) {
          deckSlice.caseReducers.emptyGraveyard(state, {
            type: 'Refill draw pile',
            payload: state.graveyard,
          });
        }
        if (state.hand.length >= state.handSize) break;
        state.hand.push(state.drawPile[0]);
        state.drawPile.shift();
        action.payload--;
      }
    },
    fill: (state) => {
      deckSlice.caseReducers.draw(state, {
        type: 'draw',
        payload: state.handSize,
      });
    },
    discardHand: (state) => {
      state.graveyard = [...state.graveyard, ...state.hand];
      state.hand = [];
    },
    discard: (state, action: PayloadAction<Card>) => {
      state.hand = state.hand.filter((card) => card.id != action.payload.id);
      state.graveyard.push(action.payload);
    },
    setSelectedCard: (state, action: PayloadAction<Card | null>) => {
      state.selectedCard = action.payload;
    },
    playCard: (state, action: PayloadAction<Card>) => {
      if (state.mana >= action.payload.cost) {
        state.mana -= action.payload.cost;
        state.hand = state.hand.filter((card) => card.id != action.payload.id);
        state.graveyard.push(action.payload);
      }
    },
    refillMana: (state) => {
      state.mana = state.maxMana;
    },
  },
});

export const {
  shuffle,
  emptyGraveyard,
  draw,
  fill,
  discardHand,
  discard,
  playCard,
  refillMana,
  setSelectedCard,
} = deckSlice.actions;

export const selectDeck = (state: RootState) => state.deck.drawPile;
export const selectGraveyard = (state: RootState) => state.deck.graveyard;
export const selectHand = (state: RootState) => state.deck.hand;
export const selectHandSize = (state: RootState) => state.deck.handSize;
export const selectSelectedCard = (state: RootState) => state.deck.selectedCard;
export const selectMana = (state: RootState) => state.deck.mana;
export const selectMaxMana = (state: RootState) => state.deck.maxMana;

export default deckSlice.reducer;
