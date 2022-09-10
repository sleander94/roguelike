import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { Enemy } from '../components/Enemy';
import {
  addEnemy,
  selectEnemies,
  selectSelectedEnemy,
} from '../features/enemySlice';

export const EnemiesDisplay = () => {
  const enemies = useAppSelector(selectEnemies);
  const selectedEnemy = useAppSelector(selectSelectedEnemy);
  const dispatch = useAppDispatch();
  return (
    <div id="enemies">
      <button
        onClick={() => {
          dispatch(
            addEnemy({ name: 'Skeleton', health: 10, maxHealth: 10, attack: 2 })
          );
        }}
      >
        Add Skeleton
      </button>
      <button
        onClick={() => {
          dispatch(
            addEnemy({ name: 'Zombie', health: 7, maxHealth: 7, attack: 4 })
          );
        }}
      >
        Add Zombie
      </button>
      {Object.keys(enemies).map((enemy) => {
        return <Enemy key={enemy} id={enemy} />;
      })}
    </div>
  );
};
