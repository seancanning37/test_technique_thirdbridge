import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PokemonDetails } from '../../models';
import { ThemeColors, typeColors } from '../../constants';
import { capitalizeText } from '../../utils';

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
          <Text style={styles.typeText}>{capitalizeText(typeInfo.type.name)}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  typesContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 16,
  },
  typeBadge: {
    borderRadius: 2,
    paddingHorizontal: 2,
    paddingVertical: 2,
    marginHorizontal: 3,
  },
  typeText: {
    color: ThemeColors.WHITE,
    fontSize: 11,
  },
});
