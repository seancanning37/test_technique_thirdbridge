import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { Pokemon } from '../models';
import { ThemeColors } from '../constants';

interface IProps {
  item: Pokemon;
  isFirst?: boolean;
}

export const PokemonCard: React.FunctionComponent<IProps> = ({
  item,
  isFirst = false,
}) => {
  const id = item.url.split('/').filter(Boolean).pop();

  return (
    <Link href={`/pages/pokemon-details/${id}`} asChild>
      <Pressable>
        <View style={[styles.card, isFirst && styles.first]}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.url}>{item.url}</Text>
        </View>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginTop: 8,
    backgroundColor: ThemeColors.WHITE,
    borderWidth: 1,
    borderColor: ThemeColors.GRAY,
    padding: 8,
  },
  first: {
    marginTop: 0,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  url: {
    fontSize: 12,
    color: ThemeColors.GRAY,
    marginTop: 4,
  },
});
