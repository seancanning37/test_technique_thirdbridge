import axios from "axios";
import { Pokemon, PokemonDetails } from "../models";

 class PokemonServiceImpl {
  async getPokemons(
    { limit = 20, offset = 0 }: { limit?: number; offset?: number }
  ): Promise<Pokemon[]> {
    const response =
      await axios.get(
        `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
      );
    return response.data.results;
  }
  async getPokemonById(id: string): Promise<PokemonDetails> {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return response.data;
  }
}

export const PokemonService = new PokemonServiceImpl();
