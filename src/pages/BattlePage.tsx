import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { EnemiesDisplay } from '../containers/EnemiesDisplay';
import { Hand } from '../components/Hand';
import { Healthbar } from '../components/Healthbar';
import {
  fill,
  discardHand,
  selectMana,
  selectMaxMana,
  refillMana,
} from '../features/deckSlice';
import {
  startBattle,
  endBattle,
  selectBattleStarted,
  startPlayerTurn,
  endPlayerTurn,
  selectPlayerTurn,
  startEnemyTurn,
  endEnemyTurn,
  selectEnemyTurn,
} from '../features/gameLogicSlice';
import {
  damagePlayer,
  healPlayer,
  addBlock,
  removeBlock,
  selectHealth,
  selectMaxHealth,
  selectBlock,
} from '../features/playerStatsSlice';
import {
  addEnemy,
  selectEnemies,
  selectSelectedEnemy,
} from '../features/enemySlice';
import { PlayArea } from '../components/PlayArea';
import { DeckContainer } from '../containers/DeckContainer';
import { ManaBar } from '../components/Manabar';

export const BattlePage = () => {
  const battle = useAppSelector(selectBattleStarted);
  const playerTurn = useAppSelector(selectPlayerTurn);
  const enemyTurn = useAppSelector(selectEnemyTurn);

  const playerHealth = useAppSelector(selectHealth);
  const playerMaxHealth = useAppSelector(selectMaxHealth);
  const block = useAppSelector(selectBlock);

  const mana = useAppSelector(selectMana);
  const maxMana = useAppSelector(selectMaxMana);

  const enemies = useAppSelector(selectEnemies);
  const dispatch = useAppDispatch();

  /*   useEffect(() => {
    console.log(enemies);
  }, [enemies]); */

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
    <section id="battle-page">
      <Healthbar
        health={playerHealth}
        maxHealth={playerMaxHealth}
        block={block}
      />
      <PlayArea />
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

{
  /* <button
onClick={() => {
  dispatch(startBattle());
}}
>
Start Battle
</button>
<button
onClick={() => {
  dispatch(startPlayerTurn());
}}
>
Start Turn
</button>
<button
onClick={() => {
  dispatch(endPlayerTurn());
}}
>
End Turn
</button> */
}
