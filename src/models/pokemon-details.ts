import { Pokemon } from "./pokemon";

export type PokemonDetails = Omit<Pokemon, 'url'> & {
    id: number
    sprites: {
      front_default: string
    }
  }