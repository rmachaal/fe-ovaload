import React, { useState, useContext, useEffect } from "react";

import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { UserContext } from "../contexts/UserContext";
import { getExercises } from "../../api"; 
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons"

const formatExerciseName = (name) => {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString(undefined, { day: 'numeric', month: 'numeric' });
};

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

  const getMostRecentStats = (exerciseStats) => {
    return exerciseStats.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
  };

  const renderExercise = ({ item }) => {
    const mostRecentStat = getMostRecentStats(item.exerciseStats);

    return (
      <TouchableOpacity
        style={styles.statItem}
        onPress={() => navigation.navigate('IndividualExercise', { exercise: item })}
      >
        <Text style={styles.title}>{formatExerciseName(item.exerciseName)} </Text>
        <View style={styles.statDetails}>
          {item.exerciseType === "cardio" ? (
            <>
              <View>
                <Text style={styles.text}>Time</Text>
                <Text style={styles.text2}>{mostRecentStat.timeMin} min</Text>
              </View>
              <View>
                <Text style={styles.text}>Distance</Text>
                <Text style={styles.text2}>{mostRecentStat.distanceKm} km</Text>
              </View>
            </>
          ) : (
            <>
              <View>
                <Text style={styles.text}>Weight</Text>
                <Text style={styles.text2}>{mostRecentStat.weightKg} kg</Text>
              </View>
              <View>
                <Text style={styles.text}>Sets</Text>
                <Text style={styles.text2}>{mostRecentStat.sets}</Text>
              </View>
              <View>
                <Text style={styles.text}>Reps</Text>
                <Text style={styles.text2}>{mostRecentStat.reps}</Text>
              </View>
            </>
          )}
          <View>
            <Text style={styles.text}>Date</Text>
            <Text style={styles.text2}>{formatDate(mostRecentStat.createdAt)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={exercises}
        keyExtractor={(item) => item._id}
        renderItem={renderExercise}
        contentContainerStyle={styles.contentContainer}
      />
      <View>
        <TouchableOpacity
          style={styles.addExerciseButton}
          onPress={() => navigation.navigate("AddNewExercise")}
        >
          <Icon name="add" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20
  },
  contentContainer: {
    padding: 20,
    alignItems: "center",
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#7F00FF",
    marginBottom: 20,
    textAlign: "center",
  },
  statItem: {
    width: 375,
    marginBottom: 20,
    backgroundColor: "rgba(189, 181, 213, 0.25)",
    borderRadius: 10,
    padding: 10,
  },
  statDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#7F00FF",
    marginBottom: 10,
  },
  text: {
    fontSize: 15,
    paddingBottom: 5,
  },
  text2: {
    fontSize: 20,
    fontWeight: "600",
    color: "#7F00FF",
  },
  addExerciseButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#7F00FF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // for Android shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});
export default Exercises;