import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { PokemonDetails } from '../../models';
import { Link } from 'expo-router';
import { ThemeColors } from '../../constants';
import { capitalizeText } from '../../utils';

interface PokemonDetailsHeaderProps {
  pokemon: PokemonDetails;
  imageSize: number;
}

export default function PokemonDetailsHeader({ pokemon, imageSize }: PokemonDetailsHeaderProps) {
  const isSmallImage = imageSize === 32;

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerRow}>
        <Link href="/pages/pokemons" asChild style={styles.backButton}>
          <Text style={styles.backButtonText}>← BACK</Text>
        </Link>
        <Text style={styles.pokemonName}>{capitalizeText(pokemon.name)}</Text>
      </View>
      <View style={[isSmallImage ? styles.imageContainerSmall : styles.imageContainerCenter]}>
        {pokemon.sprites.front_default && (
          <Image source={{ uri: pokemon.sprites.front_default }} style={[{ width: imageSize, height: imageSize }]} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    backgroundColor: ThemeColors.WHITE,
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  pokemonName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imageContainerCenter: {
    alignItems: 'center',
  },
  imageContainerSmall: {
    position: 'absolute',
    top: 0,
    right: 0,
    alignItems: 'flex-end',
    padding: 16,
  },
});
