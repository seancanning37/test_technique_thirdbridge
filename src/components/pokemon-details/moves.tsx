import React from 'react';
import { PokemonDetails } from '../../models';
import ListSection from '../list-section';

interface PokemonMovesProps {
  pokemon: PokemonDetails;
}

export default function PokemonMoves({ pokemon }: PokemonMovesProps) {
  const items = pokemon.moves.slice(0, 5).map((moveInfo) => ({
    name: moveInfo.move.name,
    url: moveInfo.move.url,
  }));

  return <ListSection title="First 5 moves" items={items} />;
}
