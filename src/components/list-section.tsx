import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { capitalizeText } from '../utils';
import { ThemeColors } from '../constants';

interface ListSectionProps {
  title: string;
  items: Array<{ id?: string; name: string; url: string }>;
  linkPrefix?: string;
}

export default function ListSection({ title, items, linkPrefix }: ListSectionProps) {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {items.map((item, index) => {
        const href = linkPrefix && item.id ? `${linkPrefix}${item.id}` : undefined;

        return href ? (
          <Link key={index} href={href} style={styles.itemContainer}>
            <View>
              <Text style={styles.itemName}>{capitalizeText(item.name)}</Text>
              <Text style={styles.itemUrl}>{item.url}</Text>
            </View>
          </Link>
        ) : (
          <View key={index} style={styles.itemContainer}>
            <Text style={styles.itemName}>{capitalizeText(item.name)}</Text>
            <Text style={styles.itemUrl}>{item.url}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    width: '100%',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    padding: 10,
    marginBottom: 5,
    backgroundColor: ThemeColors.WHITE,
    borderWidth: 1,
    borderColor: ThemeColors.LIGHT_GRAY,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
  },
  itemUrl: {
    fontSize: 12,
    color: ThemeColors.GRAY,
  },
});
