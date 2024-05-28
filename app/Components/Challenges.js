import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { UserContext } from "../contexts/UserContext";
import { useExerciseAdded } from '../contexts/ExerciseAddedContext';
import { getExerciseByDate, getPlannedExerciseByDate } from "../../api";
import moment from "moment-timezone";
import Icon from 'react-native-vector-icons/Ionicons'; // Make sure to install and import the correct icon library

const Challenges = ({ navigation, selectedDate }) => {
  const [loading, setLoading] = useState(true);
  const [exercises, setExercises] = useState([]);
  const { username } = useContext(UserContext);
  const { callback } = useExerciseAdded();
  const timeZone = "Europe/London";


  const fetchChallenges = async () => {
  setLoading(true);
  try {
    const selectedDateObj = moment.tz(selectedDate, timeZone).startOf("day");
    let data = [];

    if (selectedDateObj.isBefore(moment.tz(timeZone).startOf("day"))) {
      const response = await getExerciseByDate(
        username,
        selectedDateObj.format("YYYY-MM-DD")
      );
      if (response) {
        data = response.map((exercise) => ({
          ...exercise,
          exerciseStats: [exercise.exerciseStats[0]], // Only include the first exercise stat
        }));
      }
    } else if (selectedDateObj.isAfter(moment.tz(timeZone).endOf("day"))) {
      const response = await getPlannedExerciseByDate(
        username,
        selectedDateObj.format("YYYY-MM-DD")
      );
      if (response) {
        data = response.map((challenge) => ({
          ...challenge,
          nextChallenge: [challenge.nextChallenge[0]], // Only include the first next challenge
        }));
      }
    } else {
      const [exercisesResponse, plannedResponse] = await Promise.all([
        getExerciseByDate(username, selectedDateObj.format("YYYY-MM-DD")),
        getPlannedExerciseByDate(
          username,
          selectedDateObj.format("YYYY-MM-DD")
        ),
      ]);

      if (exercisesResponse) {
        const exerciseData = exercisesResponse.map((exercise) => ({
          ...exercise,
          exerciseStats: [exercise.exerciseStats[0]],
        }));
        data = [...data, ...exerciseData];
      }else if (plannedResponse) {
        const plannedData = plannedResponse.map((challenge) => ({
          ...challenge,
          nextChallenge: [challenge.nextChallenge[0]],
        }));
        data = [...data, ...plannedData];
      }else if (exercisesResponse && plannedResponse) {
        const plannedExercises = plannedResponse.filter(
          (exercise) => !exercise.completed
        );
        const exerciseData = exercisesResponse.map((exercise) => ({
          ...exercise,
          exerciseStats: [exercise.exerciseStats[0]],
        }));
        const plannedData = plannedExercises.map((challenge) => ({
          ...challenge,
          nextChallenge: [challenge.nextChallenge[0]],
        }));

        data = [...exerciseData, ...plannedData];
      }
    }

    setExercises(data);
  } catch (error) {
    console.error("Error fetching exercises:", error);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchChallenges();
  }, [setExercises, selectedDate,callback]);

  const handleAddExercises = () => {
    navigation.navigate("AddPlannedExercise", {
      selectedDate: selectedDate.toISOString(),
    });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#7F00FF" />
      ) : (
        <FlatList
          data={exercises}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View
              style={[
                styles.challengeContainer,
                item.exerciseStats
                  ? styles.exerciseContainer
                  : styles.plannedExerciseContainer,
              ]}
            >
              <Text>{item.exerciseName}</Text>
              {item.exerciseStats && (
                <View style={styles.exerciseStatsContainer}>
                  <Text>Exercise Stats:</Text>
                  {item.exerciseStats.map((stat) => (
                    <View key={stat._id}>
                      <Text>Weight: {stat.weightKg}</Text>
                      <Text>Sets: {stat.sets}</Text>
                      <Text>Reps: {stat.reps}</Text>
                    </View>
                  ))}
                </View>
              )}
              {item.nextChallenge && (
                <View style={styles.nextChallengeContainer}>
                  <Text style={styles.nextChallenge}>Challenge:</Text>
                  <Text>Weight: {item.nextChallenge[0].weightKg}</Text>
                  <Text>Sets: {item.nextChallenge[0].sets}</Text>
                  <Text>Reps: {item.nextChallenge[0].reps}</Text>
                </View>
              )}
            </View>
          )}
        />
      )}
      <TouchableOpacity style={styles.addExerciseButton} onPress={handleAddExercises}>
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  addExerciseButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#7F00FF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // for Android shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  challengeContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "rgba(189, 181, 213, 0.25)",
    borderRadius: 5,
  },
  nextChallenge: {
    color: "#7F00FF",
  },
  exerciseStatsContainer: {
    marginTop: 10,
  },
});

export default Challenges;