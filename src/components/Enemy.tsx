import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
  damageEnemy,
  setSelected,
  selectEnemies,
  selectSelectedEnemy,
} from '../slices/enemySlice';
import {
  playCard,
  discard,
  draw,
  setSelectedCard,
  selectSelectedCard,
} from '../slices/deckSlice';
import { displayPartsToString } from 'typescript';
import { selectMana } from '../slices/deckSlice';

export interface EnemyProps {
  id: string;
}

export const Enemy = ({ id }: EnemyProps) => {
  const enemies = useAppSelector(selectEnemies);
  const name = enemies[id].name;
  const health = enemies[id].health;
  const maxHealth = enemies[id].maxHealth;

  const selectedCard = useAppSelector(selectSelectedCard);
  const selectedEnemy = useAppSelector(selectSelectedEnemy);

  const mana = useAppSelector(selectMana);

  const dispatch = useAppDispatch();

  return (
    <div
      className="enemy"
      onMouseEnter={() => dispatch(setSelected(id))}
      onMouseLeave={() => dispatch(setSelected(null))}
      onClick={() => {
        if (selectedCard) {
          if (mana < selectedCard.cost) {
            console.log('Not enough mana');
          } else if (selectedCard.damage) {
            dispatch(playCard(selectedCard));
            if (selectedEnemy)
              dispatch(
                damageEnemy({
                  value: selectedCard.damage,
                  id: selectedEnemy.id,
                })
              );
            if (selectedCard.effect?.draw) {
              dispatch(draw(selectedCard.effect.draw));
            }
            dispatch(setSelectedCard(null));
          }
        }
      }}
    >
      <div>{name}</div>
      <div className="healthbar">
        <div className="number">
          {health} / {maxHealth}
        </div>
        <div
          className="fill"
          style={{
            width: `${(health / maxHealth) * 100}%`,
          }}
        ></div>
      </div>
    </div>
  );
};
