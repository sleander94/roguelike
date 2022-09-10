import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
  selectBlock,
  selectHealth,
  selectMaxHealth,
} from '../features/playerStatsSlice';

export interface HealthbarProps {
  health: number;
  maxHealth: number;
  block: number;
}

export const Healthbar = ({ health, maxHealth, block }: HealthbarProps) => {
  const dispatch = useAppDispatch();
  const [damageAmount, setDamageAmount] = useState<number>(2);
  return (
    <div className="healthbar">
      <div className="number">
        {health} / {maxHealth}
      </div>
      <div
        className="fill"
        style={{
          width: `${(health / maxHealth) * 100}%`,
          backgroundColor:
            health / maxHealth > 0.5
              ? 'green'
              : health / maxHealth > 0.25
              ? 'yellow'
              : 'red',
        }}
      ></div>
      <div>Block: {block}</div>
    </div>
  );
};
