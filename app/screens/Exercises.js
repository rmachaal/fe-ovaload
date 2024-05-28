// import React from "react";
// import { View, Text, Button, Image, StyleSheet, FlatList, TouchableOpacity} from "react-native";
// import { UserContext } from "../contexts/UserContext"
// // import { Card } from "react-native-elements"
// import { getExercises } from "../../api";
// import { useState, useContext, useEffect } from "react"

// const Exercises = () => {

//   const [exercises, setExercises] = useState([])
//   const {username} = useContext(UserContext)

//   useEffect(() => {

//     getExercises(username).then((res) => {
//       setExercises(res.data.exercises)
//     })
//     .catch((err) => {
//       console.error(err)
//     })
//   }, [username])


//   return (
//      <View style={styles.headerText}>
//       <Image
//         source={require("../../assets/placeholder_logo.jpeg")}
//         style={styles.logo}
//       />
//       <Text>My Exercises</Text>
//       <FlatList
//         data={exercises}
//         keyExtractor={(item) => item._id}
//         renderItem={({ item }) => (
//           <View style={styles.item}>
//             <Text style={styles.title}>{item.exerciseName}</Text>
//             <FlatList
//               data={item.exerciseStats}
//               keyExtractor={(stat) => stat.createdAt}
//               renderItem={({ item }) => (
//                 <View style={styles.stats}>
//                   <Text style={styles.text}>Weight: {item.weightKg} kg</Text>
//                   <Text style={styles.text}>Sets: {item.sets}</Text>
//                   <Text style={styles.text}>Reps: {item.reps}</Text>
//                 </View>
//               )}
//             />
//           </View>
//         )}
//       />
//     </View>
//   );
// };



// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     paddingTop: 20,
//     backgroundColor: "#fff",
//   },
//   tabHeader: {
//     fontSize: 30,
//     fontWeight: "bold",
//     color: "#7F00FF",
//     marginBottom: 10,
//   },
//   headerRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: 300,
//     marginBottom: 10,
//   },
//   headerText: {
//     fontWeight: "bold",
//     color: "#8F87A1",
//     fontSize: 18,
//   },
//   tableRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     width: 300,
//     height: 80,
//     marginBottom: 10,
//     backgroundColor: "rgba(189, 181, 213, 0.25)",
//     borderRadius: 10,
//     padding: 10,
//   },
//   levelImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     objectFit: "cover",
//   },
//   text: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#7F00FF",
//   },
// });

// export default Exercises;

import React, { useState, useContext, useEffect } from "react";
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { UserContext } from "../contexts/UserContext";
import { getExercises } from "../../api"; // Make sure this is the correct path
import { useNavigation } from "@react-navigation/native";


const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const { username } = useContext(UserContext);
  const navigation = useNavigation();


  useEffect(() => {
    getExercises(username)
      .then((res) => {
        setExercises(res.data.exercises);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [username]);


  return (
    <View style={styles.container}>
     <View>
      <Image
        source={require("../../assets/placeholder_logo.jpeg")}
        style={styles.logo}
      />
      <Text style={styles.headerText}>My Exercises</Text>
      <Text style={styles.headerText}>My Exercises</Text>
      <FlatList
        data={exercises}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('IndividualExercise', { exercise: item })}
            style={styles.item}
          >
            <Text style={styles.title}>{item.exerciseName}</Text>
            <FlatList
              data={item.exerciseStats}
              keyExtractor={(stat) => stat._id}
              renderItem={({ item: stat }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.exerciseName}</Text>       
                <View style={styles.stats}>
                  <Text style={styles.text}>Weight: {stat.weightKg} kg</Text>
                  <Text style={styles.text}>Sets: {stat.sets}</Text>
                  <Text style={styles.text}>Reps: {stat.reps}</Text>
                </View>
              )}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  item: {
    padding: 10,
    marginVertical: 8,
    backgroundColor: "#F9C2FF",
  },
  title: {
    fontSize: 20,
  },
  stats: {
    paddingLeft: 10,
    paddingTop: 5,
  },
  text: {
    fontSize: 16,
  },
});
export default Exercises;