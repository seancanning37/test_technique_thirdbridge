import axios from "axios";
import { Pokemon, PokemonDetails, PokemonSpecies, EvolutionChain } from "../models";

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

  async getPokemonSpeciesById(id: string): Promise<PokemonSpecies> {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    return response.data;
  }

  async getEvolutionChain(url: string): Promise<EvolutionChain> {
    const response = await axios.get(url);
    return response.data;
  }
}

export const PokemonService = new PokemonServiceImpl();
