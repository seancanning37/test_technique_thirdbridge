import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { capitalizeText } from '../../utils';
import { ThemeColors } from '../../constants';

interface PokemonEvolutionsProps {
  evolutions: Array<{ id: string; name: string }>;
}

export default function PokemonEvolutions({ evolutions }: PokemonEvolutionsProps) {
  return (
    <View style={styles.evolutionsContainer}>
      <Text style={styles.sectionTitle}>Evolutions</Text>
      {evolutions.map((evolution, index) => (
        <Link key={index} href={`/pages/pokemon-details/${evolution.id}`} style={styles.evolutionItem}>
          <View>
            <Text style={styles.evolutionName}>{capitalizeText(evolution.name)}</Text>
            <Text style={styles.evolutionUrl}>{`https://pokeapi.co/api/v2/pokemon/${evolution.id}/`}</Text>
          </View>
        </Link>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  evolutionsContainer: {
    width: '100%',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  evolutionItem: {
    padding: 10,
    marginBottom: 5,
    borderRadius: 8,
    backgroundColor: ThemeColors.WHITE,
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
