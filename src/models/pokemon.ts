export type Pokemon = {
  name: string
  url: string
}

export type PokemonDetails = Omit<Pokemon, 'url'> & {
  id: number
  sprites: {
    front_default: string
  }
  types: Array<{
    type: {
      name: string
      url: string
    }
  }>
  moves: Array<{
    move: {
      name: string
      url: string
    }
  }>
}

export interface PokemonSpecies {
  evolution_chain: {
    url: string;
  };
}

export interface EvolutionChain {
  chain: EvolutionDetail;
}

export interface EvolutionDetail {
  species: NamedAPIResource;
  evolves_to: EvolutionDetail[];
}

export interface NamedAPIResource {
  name: string;
  url: string;
}