import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
  shuffle,
  emptyGraveyard,
  draw,
  fill,
  discardHand,
  discard,
  selectDeck,
  selectGraveyard,
  selectHand,
  selectHandSize,
} from '../slices/deckSlice';
import {
  startPlayerTurn,
  endPlayerTurn,
  selectPlayerTurn,
  startEnemyTurn,
  endEnemyTurn,
  selectEnemyTurn,
  startBattle,
} from '../slices/gameLogicSlice';
import { HandCard } from './Card';

export const Hand = () => {
  const playerTurn = useAppSelector(selectPlayerTurn);
  const enemyTurn = useAppSelector(selectEnemyTurn);

  useEffect(() => {
    if (playerTurn) {
      dispatch(fill());
    }
    if (!playerTurn) {
      dispatch(discardHand());
    }
  }, [playerTurn]);

  const hand = useAppSelector(selectHand);
  const handSize = useAppSelector(selectHandSize);

  const deck = useAppSelector(selectDeck);
  const graveyard = useAppSelector(selectGraveyard);

  useEffect(() => {
    dispatch(shuffle());
  }, []);

  const dispatch = useAppDispatch();

  return (
    <section id="hand">
      {hand.length > 0 &&
        hand.map((card) => {
          return (
            <HandCard
              key={card.id}
              id={card.id}
              name={card.name}
              type={card.type}
              cost={card.cost}
              damage={card.damage}
              block={card.block}
              effect={card.effect}
            />
          );
        })}
    </section>
  );
};
