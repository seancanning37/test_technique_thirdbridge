import { useState, useEffect } from 'react';
import { PokemonService } from '../services';
import { PokemonDetails } from '../models';
import { parseEvolutionChain } from '../utils';

export default function usePokemonDetails(id: string) {
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [evolutions, setEvolutions] = useState<Array<{
    id: string;
    name: string;
  }> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const pokemonData = await PokemonService.getPokemonById(id);
        if (isMounted) setPokemon(pokemonData);

        const speciesData = await PokemonService.getPokemonSpeciesById(id);
        const evolutionChainUrl = speciesData.evolution_chain.url;

        const evolutionChain = await PokemonService.getEvolutionChain(evolutionChainUrl);
        const evolutionsList = parseEvolutionChain(evolutionChain.chain, id);

        if (isMounted) setEvolutions(evolutionsList);
      } catch {
        if (isMounted) setError('Failed to load Pokémon details');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [id]);

  return { pokemon, evolutions, loading, error };
}
