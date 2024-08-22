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
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Link href="/pages/pokemons" asChild style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </Link>
        <Text style={styles.pokemonName}>{capitalizeText(pokemon.name)}</Text>
        <View style={[styles.imageContainer, isSmallImage && styles.imageContainerSmall]}>
          {pokemon.sprites.front_default && (
            <Image
              source={{ uri: pokemon.sprites.front_default }}
              style={[styles.pokemonImage, { width: imageSize, height: imageSize }]}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: ThemeColors.WHITE,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 16,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 16,
  },
  pokemonName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  imageContainerSmall: {
    alignItems: 'flex-end',
  },
  pokemonImage: {
    marginBottom: 16,
  },
});
