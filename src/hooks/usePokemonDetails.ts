import { useState, useEffect } from 'react';
import { PokemonService } from '../services';
import { EvolutionChain, PokemonDetails } from '../models';

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

  const parseEvolutionChain = (
    chain: EvolutionChain['chain'],
    currentId: string
  ): Array<{ id: string; name: string }> => {
    const evolutions: Array<{ id: string; name: string }> = [];

    function extractEvolutions(evolutionData: EvolutionChain['chain']) {
      const speciesUrlParts = evolutionData.species.url.split('/');
      const speciesId = speciesUrlParts[speciesUrlParts.length - 2];

      if (speciesId !== currentId) {
        evolutions.push({
          id: speciesId,
          name: evolutionData.species.name,
        });
      }

      if (evolutionData.evolves_to.length > 0) {
        evolutionData.evolves_to.forEach((nextEvolution) => extractEvolutions(nextEvolution));
      }
    }

    extractEvolutions(chain);

    return evolutions;
  };

  return { pokemon, evolutions, loading, error };
}
