import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import CheckBox from "expo-checkbox";
import { UserContext } from "../contexts/UserContext";
import { getExerciseByDate, getPlannedExerciseByDate, patchPlannedExercise, postExerciseStats, patchLeaderboardScore } from "../../api";
import moment from "moment-timezone";
import Icon from "react-native-vector-icons/Ionicons";

const Challenges = ({ navigation, selectedDate }) => {
  const [loading, setLoading] = useState(true);
  const [exercises, setExercises] = useState([]);
  const [completedExercises, setCompletedExercises] = useState({});
  const { username } = useContext(UserContext);
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
          data = response.map((exercise) => {
            const mostRecentStat = exercise.exerciseStats.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
            return {
              ...exercise,
              exerciseStats: [mostRecentStat], // Only include the most recent exercise stat
            };
          });
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
        if (exercisesResponse && plannedResponse) {
          const plannedExercises = plannedResponse.filter(
            (exercise) => !exercise.completed
          );
          const exerciseData = exercisesResponse.map((exercise) => {
            const mostRecentStat = exercise.exerciseStats.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
            return {
              ...exercise,
              exerciseStats: [mostRecentStat], // Only include the most recent exercise stat
            };
          });
          const plannedData = plannedExercises.map((challenge) => ({
            ...challenge,
            nextChallenge: [challenge.nextChallenge[0]],
          }));
  
          data = [...exerciseData, ...plannedData];
        } else if (plannedResponse) {
          const plannedExercises = plannedResponse.filter(
            (exercise) => !exercise.completed
          );
  
          const plannedData = plannedExercises.map((challenge) => ({
            ...challenge,
            nextChallenge: [challenge.nextChallenge[0]],
          }));
          data = [...data, ...plannedData];
        } else if (exercisesResponse) {
          const exerciseData = exercisesResponse.map((exercise) => {
            const mostRecentStat = exercise.exerciseStats.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
            return {
              ...exercise,
              exerciseStats: [mostRecentStat], // Only include the most recent exercise stat
            };
          });
          data = [...data, ...exerciseData];
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
  }, [setExercises, selectedDate]);

  const handleAddExercises = () => {
    const plannedExerciseNames = exercises
      .filter(exercise => exercise.nextChallenge)
      .map(exercise => exercise.exerciseName);
      
    navigation.navigate("AddPlannedExercise", {
      selectedDate: selectedDate.toISOString(),
      plannedExercises: plannedExerciseNames,
    });
  };

  const handleCheckboxChange = async (exerciseName, date) => {
    setCompletedExercises((prevState) => ({
      ...prevState,
      [`${date}-${exerciseName}`]: true,
    }));

    try {
      await patchPlannedExercise(username, date, exerciseName, {
        completed: true,
      });

      const exercise = exercises.find(
        (e) => e.exerciseName === exerciseName.toLowerCase().replace(/ /g, '-')
      );

      if (exercise && exercise.nextChallenge) { 
        console.log("exercise.nextChallenges",exercise.nextChallenge[0])
        const newExerciseStats = {
          weightKg: exercise.nextChallenge[0].weightKg,
          sets: exercise.nextChallenge[0].sets,
          reps: exercise.nextChallenge[0].reps,
        };
        await postExerciseStats(username, exerciseName, newExerciseStats);
        await patchLeaderboardScore(username, 2);
      }
      fetchChallenges();
    } catch (error) {
      console.error("Error marking exercise as completed:", error);
    }
  };

  // Function to render each item in the FlatList
  const renderItem = ({ item }) => {
    const date = moment(selectedDate).format("YYYY-MM-DD");
    const isCompleted =
      completedExercises[`${date}-${item.exerciseName}`] || false;
    return (
      <View
        style={[
          styles.challengeContainer,
          item.exerciseStats
            ? styles.exerciseContainer
            : styles.plannedExerciseContainer,
        ]}
      >
        <Text>
          {item.exerciseName
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </Text>
        {/* Render checkbox for planned exercises */}
        {item.nextChallenge && (
          <CheckBox
            value={isCompleted}
            onValueChange={() => handleCheckboxChange(item.exerciseName, date)}
          />
        )}
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
    );
  };
  const showAddButton = moment
    .tz(selectedDate, timeZone)
    .startOf("day")
    .isSameOrAfter(moment.tz(timeZone).startOf("day"));

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#7F00FF" />
      ) : (
        <FlatList
          data={exercises}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
        />
      )}
      {showAddButton && (
        <TouchableOpacity
          style={styles.addExerciseButton}
          onPress={handleAddExercises}
        >
          <Icon name="add" size={30} color="#fff" />
        </TouchableOpacity>
      )}
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
