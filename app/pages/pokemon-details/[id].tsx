import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, ScrollView, Linking, Pressable } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { PokemonService } from '../../../src/services';
import { PokemonDetails } from '../../../src/models';
import { typeColors } from '../../../src/constants';
import { capitalizeText} from '../../../src/utils';

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

  const handleMovePress = (url: string) => {
    Linking.openURL(url).catch((err) => console.error("Failed to open URL", err));
  };

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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.pokemonName}>{pokemon?.name}</Text>
      {pokemon?.sprites?.front_default && (
        <Image
          source={{ uri: pokemon.sprites.front_default }}
          style={styles.pokemonImage}
        />
      )}


    <View style={styles.typesContainer}>
        {pokemon?.types.map((typeInfo, index) => (
          <View
            key={index}
            style={[styles.typeBadge, { backgroundColor: typeColors[typeInfo.type.name] || '#A8A878' }]}
          >
            <Text style={styles.typeText}>{typeInfo.type.name}</Text>
          </View>
        ))}
      </View>

      <View style={styles.movesContainer}>
        <Text style={styles.sectionTitle}>First 5 moves</Text>
        {pokemon?.moves.slice(0, 5).map((moveInfo, index) => (
          <Pressable
            key={index}
            onPress={() => handleMovePress(moveInfo.move.url)}
            style={styles.moveItem}
          >
            <Text style={styles.moveName}>{capitalizeText(moveInfo.move.name)}</Text>
            <Text style={styles.moveUrl}>{moveInfo.move.url}</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f8f8',
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
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  typesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  typeBadge: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
  },
  typeText: {
    color: '#fff',
    fontSize: 16,
    textTransform: 'capitalize',
  },
  movesContainer: {
    width: '100%',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  moveItem: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    marginBottom: 5,
    borderRadius: 8,
  },
  moveName: {
    fontSize: 18,
    fontWeight: '600',
  },
  moveUrl: {
    fontSize: 12,
    color: '#757575',
  },
});
