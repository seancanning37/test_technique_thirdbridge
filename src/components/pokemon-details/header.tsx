import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { PokemonDetails } from '../../models';

interface PokemonDetailsHeaderProps {
  pokemon: PokemonDetails;
}

export default function PokemonDetailsHeader({ pokemon }: PokemonDetailsHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.pokemonName}>{pokemon.name}</Text>
      {pokemon.sprites.front_default && (
        <Image source={{ uri: pokemon.sprites.front_default }} style={styles.pokemonImage} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 16,
  },
  pokemonName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'capitalize',
    marginBottom: 16,
  },
  pokemonImage: {
    width: 150,
    height: 150,
    marginBottom: 16,
  },
});
