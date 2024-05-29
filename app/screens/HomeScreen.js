import React, { useContext } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import ChatBot from "../Components/ChatBot";
import { UserContext } from "../contexts/UserContext";
import TodaysChallenges from "../Components/TodaysChallenges";

const HomeScreen = (props) => {
  const { username } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <Image
          source={require("../../assets/userprofpic.png")}
          style={styles.profilePic}
        />
        <Text style={styles.header}>Welcome back {username}!</Text>
      </View>
      <ChatBot />
      <TodaysChallenges />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 40,
    marginRight: 40,
  },
  header: {
    fontSize: 30,
    fontWeight: "600",
    color: "#7F00FF",
    marginBottom: 20,
    textAlign: "center",
    borderBottomColor: "#DDDDDD",
    borderBottomWidth: 0.5,
    paddingBottom: 10,
  },
  profilePic: {
    width: 75,
    height: 75,
    borderRadius: 50,
    resizeMode: "cover",
    marginRight: 10,
    marginTop: 10,
  },
});

const chartConfig = {
  backgroundGradientFrom: "#C3B1E1",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#C3B1E1",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(195, 177, 225, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

export default HomeScreen;
