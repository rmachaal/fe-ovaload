// import { View, Text, Image, StyleSheet, Dimensions, Button } from "react-native";
// import {
//   LineChart,
//   BarChart,
//   PieChart,
//   ProgressChart,
//   ContributionGraph,
//   StackedBarChart
// } from "react-native-chart-kit";
// import ProgressBar from 'react-native-progress/Bar';
// import { React, useState, useEffect } from "react";
// import { useParams } from "react-router-dom"
// import { Touchable } from "react-native-web";
// import { getExerciseById } from "../../api";
// import { ErrorHandling } from "../Components/ErrorHandling"


// const IndividualExercisePage = (props) => {

//     const {exerciseId} = useParams()    
//     const [progress, setProgress] = useState(0);
//     const [isLoading, setIsLoading] = useState(false)
//     const [exercise, setExercise] = useState([])
//     const [error, setError] = useState(null)

//     // const exerciseHistory = {
//     //     exercise.
//     // }

//   const handlePress = () => {
//     setProgress((prevProgress) => prevProgress + 0.1);
//   };

//   useEffect(() => {
//     setIsLoading(true)
//     getExerciseById(exerciseId)
//     .then((response) => {
//     setExercise(response.data.exerciseData)
//     console.log(response.data.exerciseData)
//     setIsLoading(false)
//     })
//     .catch((err) => {
//         setError(err)
//         setIsLoading(false)
//     })  
//   }, [exerciseId])


//   if (error) {
//     return <ErrorHandling error={error}/>
//   }

// // if is loading goes here 

//   return (
//     <View style={styles.container}>
//       <Image source={require("../../assets/placeholder_logo.jpeg")} style={styles.logo} />
//       <Text>Individual Exercise Page</Text>
//       <View>
//   <Text>Rahaf likes gradients</Text>
//   <LineChart
//     data={{
//       labels: [exercise.exercisestats[exercise.exerciseStats.length -1] ], // this changes the x axis input, can change to dates etc
//       datasets: [
//         {
//           data: exercise.exerciseStats[0]
//         }
//       ]
//     }}
//     width={Dimensions.get("window").width} // from react-native
//     height={220}
//     yAxisLabel=""
//     yAxisSuffix="kg" 
//     yAxisInterval={1} // optional, defaults to 1
//     chartConfig={{
//       backgroundColor: "#C3B1E1",
//       backgroundGradientFrom: "black",
//       backgroundGradientTo: "#C3B1E1",
//       decimalPlaces: 0, // optional, defaults to 2dp
//       color: (opacity = 1) => `rgba(855, 855, 855, ${opacity})`,
//       labelColor: (opacity = 1) => `rgba(845, 855, 855, ${opacity})`,
//       style: {
//         borderRadius: 16
//       },
//       propsForDots: {
//         r: "6",
//         strokeWidth: "2",
//         stroke: "#ffc300"
//       }
//     }}
//     bezier
//     style={{
//       marginVertical: 8,
//       borderRadius: 16
//     }}
//   />
//      <View style={styles.container}>
//       <FlatList
//         data={exercise}
//         keyExtractor={(item) => item._id}
//         renderItem={({ item }) => (
//           <View style={styles.item}>
//             <Text style={styles.title}>{item.exerciseName}</Text>
//             <FlatList
//               data={item.exerciseStats}
//               keyExtractor={(stat) => stat.createdAt}
//               renderItem={({ item }) => (
//                 <View style={styles.stats}>
//                   <Text>Weight: {item.weightKg} kg</Text>
//                   <Text>Sets: {item.sets}</Text>
//                   <Text>Reps: {item.reps}</Text>
//                   <Text>Date: {new Date(item.createdAt).toLocaleDateString()}</Text>
//                 </View>
//               )}
//             />
//           </View>
//         )}
//       />
//     </View>
//         {/* <ProgressBar progress={progress} width={200} height={20} /> */}
//         <ProgressBar progress={progress} width={387} height={20} color="#C3B1E1" borderWidth={2} borderRadius={16}/>
//       <Button onPress={handlePress} title="Increase progress" />
//       <Text>Progress: {(progress * 100).toFixed(0)}%</Text>

// </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   logo: {
//     width: 100,
//     height: 100,
//     marginBottom: 20,
//   },
// });

// const chartConfig = {
//   backgroundGradientFrom: "#C3B1E1",
//   backgroundGradientFromOpacity: 0,
//   backgroundGradientTo: "#C3B1E1",
//   backgroundGradientToOpacity: 0.5,
//   color: (opacity = 1) => `rgba(195, 177, 225, ${opacity})`,
//   strokeWidth: 2, // optional, default 3
//   barPercentage: 0.5,
//   useShadowColorFromDataset: false // optional
// };

// export default IndividualExercisePage;


// import React, { useState, useEffect } from "react";
// import { View, Text, Image, StyleSheet, Dimensions, Button, FlatList } from "react-native";
// import { LineChart } from "react-native-chart-kit";
// import ProgressBar from 'react-native-progress/Bar';
// import { useRoute } from "@react-navigation/native";
// import { getExerciseById } from "../../api";
// import { ErrorHandling } from "../Components/ErrorHandling";

// const IndividualExercise = () => {
//   const route = useRoute();
//   const { exerciseId } = route.params;
//   const [progress, setProgress] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);
//   const [exercise, setExercise] = useState(null);
//   const [error, setError] = useState(null);

//   const handlePress = () => {
//     setProgress((prevProgress) => Math.min(prevProgress + 0.1, 1));
//   };

//   useEffect(() => {
//     setIsLoading(true);
//     getExerciseById(exerciseId)
//       .then((response) => {
//         console.log(response)
//         setExercise(response.data.exerciseData);
//         setIsLoading(false);
//       })
//       .catch((err) => {
//         setError(err);
//         setIsLoading(false);
//       });
//   }, [exerciseId]);

//   if (error) {
//     return <ErrorHandling error={error} />;
//   }

//   if (isLoading) {
//     return <Text>Loading...</Text>;
//   }

//   if (!exercise) {
//     return <Text>No exercise data found.</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <Image source={require("../../assets/placeholder_logo.jpeg")} style={styles.logo} />
//       <Text>Individual Exercise Page</Text>
//       <View>
//         <LineChart
//           data={{
//             labels: exercise.exerciseStats.map((stat) => new Date(stat.createdAt).toLocaleDateString()),
//             datasets: [
//               {
//                 data: exercise.exerciseStats.map((stat) => stat.weightKg),
//               },
//             ],
//           }}
//           width={Dimensions.get("window").width}
//           height={220}
//           yAxisLabel=""
//           yAxisSuffix="kg"
//           yAxisInterval={1}
//           chartConfig={{
//             backgroundColor: "#C3B1E1",
//             backgroundGradientFrom: "black",
//             backgroundGradientTo: "#C3B1E1",
//             decimalPlaces: 0,
//             color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//             labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//             style: {
//               borderRadius: 16,
//             },
//             propsForDots: {
//               r: "6",
//               strokeWidth: "2",
//               stroke: "#ffc300",
//             },
//           }}
//           bezier
//           style={{
//             marginVertical: 8,
//             borderRadius: 16,
//           }}
//         />
//         <FlatList
//           data={exercise.exerciseStats}
//           keyExtractor={(stat) => stat._id}
//           renderItem={({ item }) => (
//             <View style={styles.stats}>
//               <Text>Weight: {item.weightKg} kg</Text>
//               <Text>Sets: {item.sets}</Text>
//               <Text>Reps: {item.reps}</Text>
//               <Text>Date: {new Date(item.createdAt).toLocaleDateString()}</Text>
//             </View>
//           )}
//         />
//         <ProgressBar progress={progress} width={387} height={20} color="#C3B1E1" borderWidth={2} borderRadius={16} />
//         <Button onPress={handlePress} title="Increase progress" />
//         <Text>Progress: {(progress * 100).toFixed(0)}%</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   logo: {
//     width: 100,
//     height: 100,
//     marginBottom: 20,
//   },
// });

// export default IndividualExercise;

import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

const formatExerciseName = (name) => {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};


const IndividualExercise = ({ route }) => {
  const { exercise } = route.params;


  return (
    <View style={styles.container}>
      <LineChart
        data={{
          labels: exercise.exerciseStats.map((stat) =>
            new Date(stat.createdAt).toLocaleDateString()
          ),
          datasets: [
            {
              data: exercise.exerciseStats.map((stat) => stat.weightKg),
            },
          ],
        }}
          width={360}
          height={220}
          yAxisLabel=""
          yAxisSuffix="kg"
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: "#C3B1E1",
            backgroundGradientFrom: "#C3B1E1",
            backgroundGradientTo: "#C3B1E1",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffc300",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      <Text style={styles.title}>{formatExerciseName(exercise.exerciseName)}</Text>
      {exercise.exerciseStats.map((stat, index) => (
        <View key={index} style={styles.statItem}>
          <View>
          <Text style={styles.text}>Weight</Text>
          <Text style={styles.text2}>{stat.weightKg} kg</Text>
          </View>
          <View>
          <Text style={styles.text}>Sets</Text>
          <Text style={styles.text2}>{stat.sets}</Text>
          </View>
          <View>
          <Text style={styles.text}>Reps</Text>
          <Text style={styles.text2}>{stat.reps}</Text>
          </View>
          <View>
          <Text style={styles.text}>Date</Text>
          <Text style={styles.text2}>{new Date(stat.createdAt).toLocaleDateString()}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
    color: "#7F00FF",
  },
  statItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 375,
    marginBottom: 10,
    backgroundColor: "rgba(189, 181, 213, 0.25)",
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  text: {
    fontSize: 16,
    justifyContent: "space-around"
  },
  text2: {
    fontSize: 20,
    fontWeight: "600",
    color:"#7F00FF"
  },
});

export default IndividualExercise;