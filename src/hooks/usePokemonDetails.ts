import { useQuery } from '@tanstack/react-query';
import { PokemonService } from '../services';
import { parseEvolutionChain } from '../utils/';

export default function usePokemonDetails(id: string) {
  const pokemonQuery = useQuery({
    queryKey: ['pokemon', id],
    queryFn: () => PokemonService.getPokemonById(id),
  });

  const speciesQuery = useQuery({
    queryKey: ['pokemonSpecies', id],
    queryFn: () => PokemonService.getPokemonSpeciesById(id),
    enabled: !!pokemonQuery.data,
  });

  const evolutionChainUrl = speciesQuery.data?.evolution_chain.url;

  const evolutionQuery = useQuery({
    queryKey: ['evolutionChain', evolutionChainUrl],
    queryFn: () => PokemonService.getEvolutionChain(evolutionChainUrl!),
    enabled: !!evolutionChainUrl,
    select: (data) => parseEvolutionChain(data.chain, id),
  });

  const loading = pokemonQuery.isLoading || speciesQuery.isLoading || evolutionQuery.isLoading;
  const error = pokemonQuery.error || speciesQuery.error || evolutionQuery.error;

  return { pokemon: pokemonQuery.data, evolutions: evolutionQuery.data, loading, error };
}
