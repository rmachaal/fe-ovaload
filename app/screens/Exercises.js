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
      setExercises(res.data.exercises)
    })
    .catch((err) => {
      console.error(err)
    })
  }, [username])


  return (
     <View style={styles.headerText}>
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
            <FlatList
              data={item.exerciseStats}
              keyExtractor={(stat) => stat.createdAt}
              renderItem={({ item }) => (
                <View style={styles.stats}>
                  <Text style={styles.text}>Weight: {item.weightKg} kg</Text>
                  <Text style={styles.text}>Sets: {item.sets}</Text>
                  <Text style={styles.text}>Reps: {item.reps}</Text>
                </View>
              )}
            />
          </View>
        )}
      />
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
  tabHeader: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#7F00FF",
    marginBottom: 10,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 300,
    marginBottom: 10,
  },
  headerText: {
    fontWeight: "bold",
    color: "#8F87A1",
    fontSize: 18,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 300,
    height: 80,
    marginBottom: 10,
    backgroundColor: "rgba(189, 181, 213, 0.25)",
    borderRadius: 10,
    padding: 10,
  },
  levelImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    objectFit: "cover",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#7F00FF",
  },
});

export default Exercises;
