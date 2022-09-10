import { useAppSelector } from '../app/hooks';
import { selectDeck, selectGraveyard } from '../features/deckSlice';

export interface CardPileProps {
  type: 'Deck' | 'Graveyard';
}

export const CardPile = ({ type }: CardPileProps) => {
  const deck = useAppSelector(selectDeck);
  const graveyard = useAppSelector(selectGraveyard);
  return (
    <div className="card-pile">
      <div className="cards">
        {type === 'Deck' ? deck.length : graveyard.length}
      </div>
      <p>{type}</p>
    </div>
  );
};
