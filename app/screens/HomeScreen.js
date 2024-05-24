import React from "react";
import { useState } from 'react';

import { View, Text, Image, StyleSheet, Dimensions, Button } from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import ProgressBar from 'react-native-progress/Bar';
import { Touchable } from "react-native-web";

console.log("hello ")


const HomeScreen = (props) => {
  const [progress, setProgress] = useState(0);
  const handlePress = () => {
    setProgress((prevProgress) => prevProgress + 0.1);
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/placeholder_logo.jpeg")} style={styles.logo} />
      <Text>Home Screen</Text>
       <ProgressBar progress={progress} width={387} height={20} color="#C3B1E1" borderWidth={2} borderRadius={16}/>
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
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
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
  useShadowColorFromDataset: false // optional
};

export default HomeScreen;
