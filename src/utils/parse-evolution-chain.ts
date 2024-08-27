import { EvolutionChain } from '../models';

export function parseEvolutionChain(
  chain: EvolutionChain['chain'],
  currentId: string
): Array<{ id: string; name: string }> {
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
}