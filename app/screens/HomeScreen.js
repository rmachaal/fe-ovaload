import React, { useContext } from "react";
import { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Button,
} from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import ProgressBar from "react-native-progress/Bar";
import { Touchable } from "react-native-web";
import ChatBot from "../Components/ChatBot";
import { UserContext } from "../contexts/UserContext";

console.log("hello ");

const HomeScreen = (props) => {
  const { username } = useContext(UserContext);
  const [progress, setProgress] = useState(0);
  const handlePress = () => {
    setProgress((prevProgress) => prevProgress + 0.1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome back {username}!</Text>
      <ChatBot />
      <Text style={styles.subHeading}>Today's Challenges:</Text>
      <ProgressBar
        progress={progress}
        width={387}
        height={20}
        color="#C3B1E1"
        borderWidth={2}
        borderRadius={16}
      />
      <Button onPress={handlePress} title="Increase progress" />
      <Text>Progress: {(progress * 100).toFixed(0)}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 45,
    fontWeight: "bold",
    color: "#7F00FF",
    marginBottom: 25,
    textAlign: "center",
    width: "100%",
    paddingBottom: 20,
    borderBottomColor: "#DDDDDD",
    borderBottomWidth: 0.5,
  },
  subHeading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#7F00FF",
    marginBottom: 25,
    textAlign: "left",
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
