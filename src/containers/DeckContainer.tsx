import { useAppDispatch, useAppSelector } from '../app/hooks';
import { CardPile } from '../components/CardPile';
import { Hand } from '../components/Hand';
import { selectMana, selectMaxMana } from '../slices/deckSlice';
import { endPlayerTurn } from '../slices/gameLogicSlice';

export const DeckContainer = () => {
  const mana = useAppSelector(selectMana);
  const maxMana = useAppSelector(selectMaxMana);

  const dispatch = useAppDispatch();

  return (
    <section id="deck-container">
      <CardPile type="Deck" />

      <Hand />

      <CardPile type="Graveyard" />
    </section>
  );
};
