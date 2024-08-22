import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { ThemeColors } from "../src/constants";

export default function Page() {
  return (
    <View style={styles.container}>
      <Link href="/pages/pokemons" asChild>
        <Pressable style={styles.pokemons}>
          <Text style={styles.text}>
            Pokemons
          </Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
  },
  pokemons: {
    backgroundColor: ThemeColors.WHITE,
    padding: 32,
    borderColor: ThemeColors.GRAY,
    borderWidth: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "uppercase",
  }
});
