import { Pokemon } from "./pokemon";

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