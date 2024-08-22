import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { PokemonService } from '../../../src/services';
import { PokemonDetails } from '../../../src/models';


export default function Page() {
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const route = useRoute();
  const { id } = route.params as { id: string };

  useEffect(() => {
    if (id) {
      PokemonService.getPokemonById(id)
        .then((data) => {
          setPokemon(data);
          setLoading(false);
        })
        .catch(() => {
          setError('Failed to load Pokémon details');
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.pokemonName}>{pokemon?.name}</Text>
      {pokemon?.sprites?.front_default && (
        <Image
          source={{ uri: pokemon.sprites.front_default }}
          style={styles.pokemonImage}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  pokemonName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  pokemonImage: {
    width: 150,
    height: 150,
    marginTop: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});
