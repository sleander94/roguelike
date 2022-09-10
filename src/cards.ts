import { v4 as uuidv4 } from 'uuid';

export interface Card {
  id: string;
  name: string;
  cost: number;
  damage?: number;
  block?: number;
  effect?: {
    description: string;
    draw?: number;
  };
  type: 'Attack' | 'Skill';
  /* rarity: 'common' | 'rare' | 'epic' | 'legendary'; */
}

export const generateCard = (card: Card, id = uuidv4()) => {
  return {
    id,
    name: card.name,
    type: card.type,
    cost: card.cost,
    damage: card.damage,
    block: card.block,
    effect: card.effect,
  } as Card;
};

export const Shoot: Card = {
  id: 'placeholder',
  name: 'Shoot',
  type: 'Attack',
  cost: 1,
  damage: 3,
};

export const Block: Card = {
  id: 'placeholder',
  name: 'Block',
  type: 'Skill',
  cost: 1,
  block: 5,
};

export const Caltrops: Card = {
  id: 'placeholder',
  name: 'Caltrops',
  type: 'Skill',
  cost: 1,
  damage: 1,
  effect: {
    description: 'Deal 1 damage & draw 1 card.',
    draw: 1,
  },
};

export const ArcherDeck = [
  generateCard(Shoot),
  generateCard(Shoot),
  generateCard(Shoot),
  generateCard(Shoot),
  generateCard(Shoot),
  generateCard(Block),
  generateCard(Block),
  generateCard(Block),
  generateCard(Block),
  generateCard(Block),
  generateCard(Caltrops),
];
