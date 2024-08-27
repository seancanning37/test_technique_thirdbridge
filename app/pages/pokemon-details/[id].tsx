import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ThemeColors } from '../../../src/constants';
import usePokemonDetails from '../../../src/hooks/usePokemonDetails';
import PokemonDetailsHeader from '../../../src/components/pokemon-details/header';
import PokemonTypes from '../../../src/components/pokemon-details/types';
import PokemonMoves from '../../../src/components/pokemon-details/moves';
import PokemonEvolutions from '../../../src/components/pokemon-details/evolutions';

export default function Page() {
  const route = useRoute();
  const { id } = route.params as { id: string };
  const { pokemon, evolutions, loading, error } = usePokemonDetails(id);
  const [imageSize, setImageSize] = useState(150);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const newSize = offsetY > 100 ? 32 : 150;
    setImageSize(newSize);
  };

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.errorText}>{error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {pokemon && (
        <View style={styles.headerContainer}>
          <PokemonDetailsHeader pokemon={pokemon} imageSize={imageSize} />
        </View>
      )}
      <ScrollView
        contentContainerStyle={styles.scrollViewContentContainer}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {pokemon && (
          <>
            <PokemonTypes pokemon={pokemon} />
            <PokemonMoves pokemon={pokemon} />
            {evolutions && evolutions.length > 0 && <PokemonEvolutions evolutions={evolutions} />}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColors.WHITE,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ThemeColors.WHITE,
  },
  scrollViewContentContainer: {
    paddingTop: 240,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: ThemeColors.LIST_BACKGROUND,
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: ThemeColors.WHITE,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});
