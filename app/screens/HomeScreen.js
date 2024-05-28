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

const HomeScreen = (props) => {
  const { username } = useContext(UserContext);
  const [progress, setProgress] = useState(0);
  const handlePress = () => {
    setProgress((prevProgress) => prevProgress + 0.1);
  };

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
      <Text style={styles.subHeading}>Today's Challenges:</Text>
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
    fontSize: 40,
    fontWeight: "bold",
    color: "#7F00FF",
    marginBottom: 25,
    textAlign: "center",
    borderBottomColor: "#DDDDDD",
    borderBottomWidth: 0.5,
    paddingBottom: 10,
  },
  subHeading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#7F00FF",
    marginBottom: 25,
    textAlign: "left",
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
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
