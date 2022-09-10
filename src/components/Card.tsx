import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { setSelectedCard, selectSelectedCard } from '../features/deckSlice';
import { Card } from '../cards';

export const HandCard = ({
  id,
  cost,
  name,
  damage,
  block,
  type,
  effect,
}: Card) => {
  const selectedCard = useAppSelector(selectSelectedCard);
  const dispatch = useAppDispatch();
  return (
    <button
      style={{ border: selectedCard?.id === id ? '2px solid red' : 'none' }}
      className="card"
      onMouseOver={() => {
        dispatch(
          setSelectedCard({ id, cost, name, damage, block, type, effect })
        );
      }}
    >
      <div className="card-cost">{cost}</div>
      <p className="card-name">{name}</p>
      <p className="card-type">{type}</p>
      {effect && <div className="card-effect">{effect.description}</div>}
      {!effect && damage && (
        <div className="card-effect">Deal {damage} damage.</div>
      )}
      {!effect && block && (
        <div className="card-effect">Gain {block} block.</div>
      )}
    </button>
  );
};
