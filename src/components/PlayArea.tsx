import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
  setSelectedCard,
  selectSelectedCard,
  draw,
  discard,
  playCard,
  selectMana,
} from '../slices/deckSlice';
import { selectSelectedEnemy } from '../slices/enemySlice';
import { addBlock } from '../slices/playerStatsSlice';

export const PlayArea = () => {
  const selectedCard = useAppSelector(selectSelectedCard);
  const selectedEnemy = useAppSelector(selectSelectedEnemy);

  const mana = useAppSelector(selectMana);

  const dispatch = useAppDispatch();

  return (
    <section
      id="play-area"
      onMouseUp={() => {
        if (!selectedEnemy && selectedCard) {
          if (mana < selectedCard.cost) {
            console.log('Not enough mana');
          } else {
            dispatch(playCard(selectedCard));
            if (selectedCard.block) dispatch(addBlock(selectedCard.block));
            if (selectedCard.effect?.draw) {
              dispatch(draw(selectedCard.effect.draw));
            }
            dispatch(setSelectedCard(null));
          }
        }
      }}
    ></section>
  );
};
