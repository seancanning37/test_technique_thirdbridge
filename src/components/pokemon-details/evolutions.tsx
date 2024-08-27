import React from 'react';
import ListSection from '../list-section';

interface PokemonEvolutionsProps {
  evolutions: Array<{ id: string; name: string }>;
}

export default function PokemonEvolutions({ evolutions }: PokemonEvolutionsProps) {
  const items = evolutions.map((evolution) => ({
    id: evolution.id,
    name: evolution.name,
    url: `https://pokeapi.co/api/v2/pokemon/${evolution.id}/`,
  }));

  return <ListSection title="Evolutions" items={items} linkPrefix="/pages/pokemon-details/" />;
}
