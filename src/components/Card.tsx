import { useEffect, useRef, useState } from 'react';
import Xarrow from 'react-xarrows';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { Card } from '../cards';
import {
  setSelectedCard,
  selectSelectedCard,
  draw,
  discard,
  playCard,
  selectMana,
} from '../slices/deckSlice';
import { damageEnemy, selectSelectedEnemy } from '../slices/enemySlice';
import { addBlock } from '../slices/playerStatsSlice';
import {
  startTargeting,
  selectTargeting,
  selectMouseX,
  selectMouseY,
} from '../slices/gameLogicSlice';

export const HandCard = ({
  id,
  targeted,
  cost,
  name,
  image,
  type,
  effect,
}: Card) => {
  const mana = useAppSelector(selectMana);
  const selectedCard = useAppSelector(selectSelectedCard);
  const selectedEnemy = useAppSelector(selectSelectedEnemy);

  const targeting = useAppSelector(selectTargeting);
  const [dragging, setDragging] = useState<boolean>(false);

  const mouseX = useAppSelector(selectMouseX);
  const mouseY = useAppSelector(selectMouseY);

  const startRef = useRef(null);

  const dispatch = useAppDispatch();
  return (
    <button
      ref={startRef}
      style={
        dragging
          ? {
              position: 'absolute',
              top: `${mouseY - 100}px`,
              left: `${mouseX - 75}px`,
              animation: 'none',
            }
          : targeting
          ? { position: 'static' }
          : {}
      }
      id={selectedCard?.id === id ? 'active-card' : ''}
      className={
        dragging && mouseY < document.body.scrollHeight * 0.7 - 200
          ? 'card dragging playable'
          : dragging
          ? 'card dragging'
          : 'card'
      }
      onClick={() => {
        dispatch(
          setSelectedCard({ id, targeted, cost, image, name, type, effect })
        );
      }}
      onMouseOver={() => {
        dispatch(
          setSelectedCard({ id, targeted, cost, image, name, type, effect })
        );
      }}
      onMouseDown={() => {
        if (!targeted) {
          setDragging(true);
        } else {
          dispatch(startTargeting());
        }
      }}
      onMouseUp={() => {
        // Calculation for card being above deck area
        if (dragging && mouseY < document.body.scrollHeight * 0.7 - 200) {
          if (!selectedEnemy && selectedCard) {
            if (mana < selectedCard.cost) {
              console.log('Not enough mana');
            } else {
              dispatch(playCard(selectedCard));
              if (selectedCard.effect.block)
                dispatch(addBlock(selectedCard.effect.block));
              if (selectedCard.effect.draw) {
                dispatch(draw(selectedCard.effect.draw));
              }
              dispatch(setSelectedCard(null));
            }
          }
          setDragging(false);
        } else if (targeting) {
          if (selectedEnemy && selectedCard) {
            if (mana < selectedCard.cost) {
              console.log('Not enough mana');
            } else if (selectedCard.effect.damage) {
              dispatch(playCard(selectedCard));
              if (selectedEnemy)
                dispatch(
                  damageEnemy({
                    value: selectedCard.effect.damage,
                    id: selectedEnemy.id,
                  })
                );
              if (selectedCard.effect?.draw) {
                dispatch(draw(selectedCard.effect.draw));
              }
              dispatch(setSelectedCard(null));
            }
          }
        }
      }}
    >
      {targeting && selectedCard?.id === id && (
        <div
          id="arrow-end"
          style={{
            position: 'absolute',
            top: `${mouseY}px`,
            left: `${mouseX}px`,
          }}
        ></div>
      )}
      {targeting && selectedCard?.id === id && (
        <Xarrow
          start={startRef}
          end="arrow-end"
          color={selectedEnemy ? 'red' : 'grey'}
        />
      )}
      <div className="card-cost">{cost}</div>
      <p className="card-name">{name}</p>
      <img src={image} alt="card image" draggable="false" />
      <p className="card-type">{type}</p>
      <p className="description">{effect.description}</p>
    </button>
  );
};
