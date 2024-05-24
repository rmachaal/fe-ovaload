import React from "react";
import { View, Text, Button, Image, StyleSheet, FlatList, TouchableOpacity} from "react-native";
import { UserContext } from "../contexts/UserContext"
// import { Card } from "react-native-elements"
import { getExercises } from "../../api";
import { useState, useContext, useEffect } from "react"

const Exercises = () => {

  const [exercises, setExercises] = useState([])
  const {username} = useContext(UserContext)

  useEffect(() => {
    getExercises(username).then((res) => {
       console.log(res.data)
      setExercises(res.data.exercises)
    })
    .catch((err) => {
      console.error(err)
    })
  }, [username])



  return (
     <View style={styles.container}>
      <Image
        source={require("../../assets/placeholder_logo.jpeg")}
        style={styles.logo}
      />   
      <Text>My Exercises</Text>
      <FlatList
        data={exercises}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.exerciseName}</Text>
            
                <View style={styles.stats}>
                  <Text>Weight: {item.weightKg} kg</Text>
                  <Text>Sets: {item.sets}</Text>
                  <Text>Reps: {item.reps}</Text>
                </View>
              )}
            
          </View>
        )}
      />
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
  item: {
    fontSize: 100,
  }
});

export default Exercises;
