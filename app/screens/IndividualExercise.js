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

const HomeScreen = (props) => {
  const [progress, setProgress] = useState(0);
  const handlePress = () => {
    setProgress((prevProgress) => prevProgress + 0.1);
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/placeholder_logo.jpeg")} style={styles.logo} />
      <Text>Home Screen</Text>
      <View>
  <Text>Rahaf likes gradients</Text>
  <LineChart
    data={{
      labels: ["January", "February", "March", "April", "May", "June"], // this changes the x axis input, can change to dates etc
      datasets: [
        {
          data: [
            40,
         50,
         60,
         70,
         70, /// this changes actual acheived data e.g squat history will be imported
          ]
        }
      ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={220}
    yAxisLabel=""
    yAxisSuffix="kg" 
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#C3B1E1",
      backgroundGradientFrom: "black",
      backgroundGradientTo: "#C3B1E1",
      decimalPlaces: 0, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(855, 855, 855, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(845, 855, 855, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffc300"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
        {/* <ProgressBar progress={progress} width={200} height={20} /> */}
        <ProgressBar progress={progress} width={387} height={20} color="#C3B1E1" borderWidth={2} borderRadius={16}/>
      <Button onPress={handlePress} title="Increase progress" />
      <Text>Progress: {(progress * 100).toFixed(0)}%</Text>

</View>
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
