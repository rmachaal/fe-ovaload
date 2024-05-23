import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const Leaderboard = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/placeholder_logo.jpeg")}
        style={styles.logo}
      />
      <Text>Profile Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});

export default Leaderboard;
