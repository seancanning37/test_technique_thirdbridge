import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ThemeColors } from '../../../src/constants';
import usePokemonDetails from '../../../src/hooks/usePokemonDetails';
import PokemonDetailsHeader from '../../../src/components/pokemon-details/header';
import PokemonTypes from '../../../src/components/pokemon-details/types';
import PokemonMoves from '../../../src/components/pokemon-details/moves';
import PokemonEvolutions from '../../../src/components/pokemon-details/evolutions';
import { Link } from 'expo-router';

export default function Page() {
  const route = useRoute();
  const { id } = route.params as { id: string };
  const { pokemon, evolutions, loading, error } = usePokemonDetails(id);

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
      <View style={styles.headerContainer}>
        <Link href="/pages/pokemons" asChild style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </Link>
        {pokemon && <PokemonDetailsHeader pokemon={pokemon} />}
      </View>
      {pokemon && (
        <>
          <PokemonTypes pokemon={pokemon} />
          <PokemonMoves pokemon={pokemon} />
          {evolutions && evolutions.length > 0 && <PokemonEvolutions evolutions={evolutions} />}
        </>
      )}
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
  headerContainer: {
    width: '100%',
    position: 'relative',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    position: 'absolute',
    left: 16,
    top: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  backButtonText: {
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});
