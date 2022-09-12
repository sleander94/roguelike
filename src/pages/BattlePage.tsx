import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { EnemiesDisplay } from '../containers/EnemiesDisplay';
import { Healthbar } from '../components/Healthbar';
import {
  fill,
  draw,
  playCard,
  discardHand,
  selectMana,
  selectMaxMana,
  refillMana,
  setSelectedCard,
  selectSelectedCard,
} from '../slices/deckSlice';
import {
  startBattle,
  endBattle,
  selectBattleStarted,
  startTargeting,
  endTargeting,
  selectTargeting,
  startPlayerTurn,
  endPlayerTurn,
  selectPlayerTurn,
  startEnemyTurn,
  endEnemyTurn,
  selectEnemyTurn,
  setMouseX,
  setMouseY,
  selectMouseX,
  selectMouseY,
} from '../slices/gameLogicSlice';
import {
  damagePlayer,
  healPlayer,
  addBlock,
  removeBlock,
  selectHealth,
  selectMaxHealth,
  selectBlock,
  selectPlayerName,
} from '../slices/playerStatsSlice';
import {
  addEnemy,
  damageEnemy,
  selectEnemies,
  selectSelectedEnemy,
} from '../slices/enemySlice';
import { DeckContainer } from '../containers/DeckContainer';
import { ManaBar } from '../components/Manabar';

export const BattlePage = () => {
  const battle = useAppSelector(selectBattleStarted);
  const playerTurn = useAppSelector(selectPlayerTurn);
  const enemyTurn = useAppSelector(selectEnemyTurn);
  const targeting = useAppSelector(selectTargeting);

  const selectedCard = useAppSelector(selectSelectedCard);

  const playerName = useAppSelector(selectPlayerName);
  const playerHealth = useAppSelector(selectHealth);
  const playerMaxHealth = useAppSelector(selectMaxHealth);
  const block = useAppSelector(selectBlock);

  const mana = useAppSelector(selectMana);
  const maxMana = useAppSelector(selectMaxMana);

  const selectedEnemy = useAppSelector(selectSelectedEnemy);
  const enemies = useAppSelector(selectEnemies);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('Player Turn: ' + playerTurn);
    if (!playerTurn) {
      dispatch(startEnemyTurn());
    }
  }, [playerTurn]);

  useEffect(() => {
    if (enemyTurn) {
      console.log('Enemy Turn');
      if (Object.keys(enemies).length > 0) {
        for (const enemy of Object.keys(enemies)) {
          dispatch(damagePlayer(enemies[enemy].attack));
        }
        dispatch(removeBlock());
        dispatch(endEnemyTurn());
        dispatch(refillMana());
        dispatch(startPlayerTurn());
      } else {
        console.log('Victory');
      }
    }
  }, [enemyTurn]);

  return (
    <section
      id="battle-page"
      onMouseMove={(e) => {
        dispatch(setMouseX(e.pageX));
        dispatch(setMouseY(e.pageY));
      }}
      onMouseUp={() => {
        if (targeting) {
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
          dispatch(endTargeting());
        }
      }}
    >
      <Healthbar
        name={playerName}
        health={playerHealth}
        maxHealth={playerMaxHealth}
        block={block}
      />
      <img
        id="player-image"
        src={require('../assets/character-images/pepo-ranger.png')}
        alt="player character"
      />
      <ManaBar />
      <button
        className="end-turn"
        onClick={() => {
          dispatch(endPlayerTurn());
        }}
      >
        End Turn
      </button>
      <DeckContainer />
      <EnemiesDisplay />
    </section>
  );
};
