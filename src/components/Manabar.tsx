import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectMana, selectMaxMana } from '../slices/deckSlice';

export const ManaBar = () => {
  const mana = useAppSelector(selectMana);
  const maxMana = useAppSelector(selectMaxMana);
  const [manaOrbs, setManaOrbs] = useState<{ key: number; status: boolean }[]>(
    []
  );

  useEffect(() => {
    let i = mana;
    let j = maxMana;
    let tempOrbs: { key: number; status: boolean }[] = [];
    while (j > 0) {
      if (i > 0) {
        tempOrbs.push({ key: j, status: true });
        i--;
      } else {
        tempOrbs.push({ key: j, status: false });
      }
      j--;
    }
    setManaOrbs(tempOrbs);
  }, [mana, maxMana]);

  return (
    <div id="player-mana">
      <p>Mana: </p>
      <div id="mana-orbs">
        {manaOrbs.map((mana) => {
          return (
            <div
              key={mana.key}
              className="orb"
              style={{ backgroundColor: mana.status ? 'blue' : 'white' }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};
