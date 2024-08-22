import React from "react"
import { Pressable, StyleSheet, Text, View, TouchableOpacity } from "react-native"
import { Link } from "expo-router"
import { Pokemon } from "../models"
import { Colors } from "../utils"

interface IProps {
  item: Pokemon
  isFirst?: boolean
}

export const PokemonCard: React.FunctionComponent<IProps> = ({ item, isFirst = false }) => {
  const id = item.url.split("/").filter(Boolean).pop();

  return (
    <Link href={{ pathname: `/pages/pokemon-details/${id}`, params: { url: item.url }}} asChild>
      <Pressable>
        <TouchableOpacity>
          <View style={[styles.card, isFirst && styles.first]}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.url}>{item.url}</Text>
          </View>
        </TouchableOpacity>
      </Pressable>
    </Link>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginTop: 8,
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    padding: 8
  },
  first: {
    marginTop: 0
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "capitalize"
  },
  url: {
    fontSize: 12,
    color: Colors.GRAY,
    marginTop: 4
  }
})
