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
import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { Touchable } from "react-native-web";
import { getExerciseById } from "../../api";
import { ErrorHandling } from "../Components/ErrorHandling"


const IndividualExercisePage = (props) => {

    const {exerciseId} = useParams()    
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false)
    const [exercise, setExercise] = useState([])
    const [error, setError] = useState(null)

    // const exerciseHistory = {
    //     exercise.
    // }

  const handlePress = () => {
    setProgress((prevProgress) => prevProgress + 0.1);
  };

  useEffect(() => {
    setIsLoading(true)
    getExerciseById(exerciseId)
    .then((response) => {
    setExercise(response.data.exerciseData)
    console.log(response.data.exerciseData)
    setIsLoading(false)
    })
    .catch((err) => {
        setError(err)
        setIsLoading(false)
    })  
  }, [exerciseId])


  if (error) {
    return <ErrorHandling error={error}/>
  }

// if is loading goes here 

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/placeholder_logo.jpeg")} style={styles.logo} />
      <Text>Individual Exercise Page</Text>
      <View>
  <Text>Rahaf likes gradients</Text>
  <LineChart
    data={{
      labels: [exercise.exercisestats[exercise.exerciseStats.length -1] ], // this changes the x axis input, can change to dates etc
      datasets: [
        {
          data: exercise.exerciseStats[0]
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
     <View style={styles.container}>
      <FlatList
        data={exercise}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.exerciseName}</Text>
            <FlatList
              data={item.exerciseStats}
              keyExtractor={(stat) => stat.createdAt}
              renderItem={({ item }) => (
                <View style={styles.stats}>
                  <Text>Weight: {item.weightKg} kg</Text>
                  <Text>Sets: {item.sets}</Text>
                  <Text>Reps: {item.reps}</Text>
                  <Text>Date: {new Date(item.createdAt).toLocaleDateString()}</Text>
                </View>
              )}
            />
          </View>
        )}
      />
    </View>
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

export default IndividualExercisePage;
