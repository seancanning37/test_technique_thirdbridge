import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PokemonDetails } from '../../models';
import { ThemeColors } from '../../constants';
import { capitalizeText } from '../../utils';

interface PokemonMovesProps {
  pokemon: PokemonDetails;
}

export default function PokemonMoves({ pokemon }: PokemonMovesProps) {
  return (
    <View style={styles.movesContainer}>
      <Text style={styles.sectionTitle}>First 5 moves</Text>
      {pokemon.moves.slice(0, 5).map((moveInfo, index) => (
        <View key={index} style={styles.moveItem}>
          <Text style={styles.moveName}>{capitalizeText(moveInfo.move.name)}</Text>
          <Text style={styles.moveUrl}>{moveInfo.move.url}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
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
    padding: 10,
    marginBottom: 5,
    backgroundColor: ThemeColors.WHITE,
  },
  moveName: {
    fontSize: 18,
    fontWeight: '600',
  },
  moveUrl: {
    fontSize: 12,
    color: ThemeColors.GRAY,
  },
});
