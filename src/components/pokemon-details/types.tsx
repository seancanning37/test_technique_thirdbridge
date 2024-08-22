import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PokemonDetails } from '../../models';
import { ThemeColors, typeColors } from '../../constants';

interface PokemonTypesProps {
  pokemon: PokemonDetails;
}

export default function PokemonTypes({ pokemon }: PokemonTypesProps) {
  return (
    <View style={styles.typesContainer}>
      {pokemon.types.map((typeInfo, index) => (
        <View
          key={index}
          style={[styles.typeBadge, { backgroundColor: typeColors[typeInfo.type.name] || ThemeColors.GRAY }]}
        >
          <Text style={styles.typeText}>{typeInfo.type.name}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  typesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  typeBadge: {
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
});
