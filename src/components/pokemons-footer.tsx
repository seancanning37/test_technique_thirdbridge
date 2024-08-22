import React from "react"
import { Pressable, StyleSheet, Text } from "react-native"

import { ThemeColors } from "../constants"

interface IProps {
  isHidden?: boolean
  isLoading?: boolean
  onPress: () => void
}

export const PokemonsFooter: React.FunctionComponent<IProps> =
  ({ isHidden, isLoading, onPress }) => {
    if (isHidden) return null

    const handlePress = () => {
      if (!isLoading) onPress()
    }

    return (
      <Pressable onPress={handlePress} style={styles.footer}>
        {isLoading && <Text>Loading...</Text>}
        {!isLoading && <Text>Fetch more</Text>}
      </Pressable>
    )
  }

const styles = StyleSheet.create({
  footer: {
    alignSelf: 'center',
    margin: 16,
    padding: 16,
    backgroundColor: ThemeColors.PINK,
    borderColor: ThemeColors.GRAY,
    borderWidth: 1,
  }
})
