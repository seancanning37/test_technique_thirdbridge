import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
  Linking,
  Pressable,
} from 'react-native';
import { Link } from 'expo-router';
import { useRoute } from '@react-navigation/native';
import { PokemonService } from '../../../src/services';
import { EvolutionChain, PokemonDetails } from '../../../src/models';
import { ThemeColors, typeColors } from '../../../src/constants';
import { capitalizeText } from '../../../src/utils';

export default function Page() {
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [evolutions, setEvolutions] = useState<Array<{
    id: string;
    name: string;
  }> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const route = useRoute();

  const { id } = route.params as { id: string };

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        const pokemonData = await PokemonService.getPokemonById(id);
        if (isMounted) setPokemon(pokemonData);

        const speciesData = await PokemonService.getPokemonSpeciesById(id);
        const evolutionChainUrl = speciesData.evolution_chain.url;

        const evolutionChain =
          await PokemonService.getEvolutionChain(evolutionChainUrl);

        const evolutionsList = parseEvolutionChain(evolutionChain.chain, id);
        if (isMounted) setEvolutions(evolutionsList);
      } catch {
        if (isMounted) setError('Failed to load Pokémon details');
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const parseEvolutionChain = (
    chain: EvolutionChain['chain'],
    currentId: string
  ): Array<{ id: string; name: string }> => {
    const evolutions: Array<{ id: string; name: string }> = [];

    function extractEvolutions(evolutionData: EvolutionChain['chain']) {
      const speciesUrlParts = evolutionData.species.url.split('/');
      const speciesId = speciesUrlParts[speciesUrlParts.length - 2];

      if (speciesId !== currentId) {
        evolutions.push({
          id: speciesId,
          name: capitalizeText(evolutionData.species.name),
        });
      }

      if (evolutionData.evolves_to.length > 0) {
        evolutionData.evolves_to.forEach(
          (nextEvolution: EvolutionChain['chain']) =>
            extractEvolutions(nextEvolution)
        );
      }
    }

    extractEvolutions(chain);

    return evolutions;
  };

  const handleMovePress = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error('Failed to open URL', err)
    );
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
      {!loading && pokemon && (
        <>
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
                style={[
                  styles.typeBadge,
                  {
                    backgroundColor:
                      typeColors[typeInfo.type.name] || ThemeColors.GRAY,
                  },
                ]}
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
                <Text style={styles.moveName}>
                  {capitalizeText(moveInfo.move.name)}
                </Text>
                <Text style={styles.moveUrl}>{moveInfo.move.url}</Text>
              </Pressable>
            ))}
          </View>

          {evolutions && evolutions.length > 0 && (
            <View style={styles.evolutionsContainer}>
              <Text style={styles.sectionTitle}>Evolutions</Text>
              {evolutions.map((evolution, index) => (
                <Link
                  key={index}
                  href={`/pages/pokemon-details/${evolution.id}`}
                  style={styles.evolutionItem}
                >
                  <View>
                    <Text style={styles.evolutionName}>{evolution.name}</Text>
                    <Text
                      style={styles.evolutionUrl}
                    >{`https://pokeapi.co/api/v2/pokemon/${evolution.id}/`}</Text>
                  </View>
                </Link>
              ))}
            </View>
          )}
        </>
      )}

      {loading && <ActivityIndicator size="large" />}

      {error && <Text style={styles.errorText}>{error}</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: ThemeColors.WHITE,
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
    backgroundColor: ThemeColors.WHITE,
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
    backgroundColor: ThemeColors.WHITE,
    padding: 10,
    marginBottom: 5,
    borderColor: ThemeColors.GRAY,
  },
  moveName: {
    fontSize: 18,
    fontWeight: '600',
  },
  moveUrl: {
    fontSize: 12,
    color: ThemeColors.GRAY,
  },
  evolutionsContainer: {
    width: '100%',
    marginBottom: 16,
  },
  evolutionItem: {
    backgroundColor: ThemeColors.WHITE,
    padding: 10,
    marginBottom: 5,
    borderRadius: 8,
  },
  evolutionName: {
    fontSize: 18,
    fontWeight: '600',
  },
  evolutionUrl: {
    fontSize: 12,
    color: ThemeColors.GRAY,
  },
});
