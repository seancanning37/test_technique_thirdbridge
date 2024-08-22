import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { PokemonDetails } from '../../models';
import { ThemeColors } from '../../constants';
import { capitalizeText } from '../../utils';
import { Linking } from 'react-native';

interface PokemonMovesProps {
  pokemon: PokemonDetails;
}

export default function PokemonMoves({ pokemon }: PokemonMovesProps) {
  const handleMovePress = (url: string) => {
    Linking.openURL(url).catch((err) => console.error('Failed to open URL', err));
  };

  return (
    <View style={styles.movesContainer}>
      <Text style={styles.sectionTitle}>First 5 moves</Text>
      {pokemon.moves.slice(0, 5).map((moveInfo, index) => (
        <Pressable key={index} onPress={() => handleMovePress(moveInfo.move.url)} style={styles.moveItem}>
          <Text style={styles.moveName}>{capitalizeText(moveInfo.move.name)}</Text>
          <Text style={styles.moveUrl}>{moveInfo.move.url}</Text>
        </Pressable>
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
