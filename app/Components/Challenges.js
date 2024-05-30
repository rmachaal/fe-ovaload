import React, { useEffect, useState, useContext, useRef} from "react";
import {
  FlatList,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { UserContext } from "../contexts/UserContext";
import { getExerciseByDate, getPlannedExerciseByDate } from "../../api";
import SwipeableItem from "./SwipeableItem";
import moment from "moment-timezone";
import Icon from "react-native-vector-icons/Ionicons";
import LottieView from "lottie-react-native";

const Challenges = ({ navigation, selectedDate }) => {
  const { username } = useContext(UserContext);
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  const timeZone = "Europe/London";
  const confettiRef = useRef(null);

  const today = moment();
  const formattedSelectedDate = moment(selectedDate).format("YYYY-MM-DD");
  const selectedDateMoment = moment(selectedDate);
  const isToday = selectedDateMoment.isSame(today, "day");

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
            const mostRecentStat = exercise.exerciseStats.sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            )[0];
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
            const mostRecentStat = exercise.exerciseStats.sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            )[0];
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
            const mostRecentStat = exercise.exerciseStats.sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            )[0];
            return {
              ...exercise,
              exerciseStats: [mostRecentStat],
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
  }, [selectedDate]);

  const handleAddExercises = async () => {
    const plannedExerciseNames = exercises.map(
      (exercise) => exercise.exerciseName
    );

    navigation.navigate("AddPlannedExercise", {
      selectedDate: selectedDate.toISOString(),
      plannedExercises: plannedExerciseNames,
    });

    // Use a listener to detect when the navigation completes and user returns to this screen
    const unsubscribe = navigation.addListener("focus", () => {
      fetchChallenges();
      unsubscribe();
    });
  };

  const showAddButton = moment
    .tz(selectedDate, timeZone)
    .startOf("day")
    .isSameOrAfter(moment.tz(timeZone).startOf("day"));

    useEffect(() => {
      if (showConfetti && confettiRef.current) {
        confettiRef.current.play(0, 100);
      }
    }, [showConfetti]);  

  return (
    <SafeAreaView style={styles.safeContainer}>
      {loading ? (
        <ActivityIndicator size="large" color="#7F00FF" />
      ) : (
        <>
          <FlatList
            data={exercises}
            renderItem={({ item }) => (
              <SwipeableItem
                item={item}
                date={formattedSelectedDate}
                fetchChallenges={fetchChallenges}
                selectedDate={selectedDate}
                exercises={exercises}
                setShowConfetti={setShowConfetti}
              />
            )}
            keyExtractor={(item) => item.exerciseName}
          />

          {showAddButton && (
            <TouchableOpacity
              style={styles.addExerciseButton}
              onPress={handleAddExercises}
            >
              <Icon name="add" size={30} color="#fff" />
            </TouchableOpacity>
          )}

          {showConfetti && (
            <LottieView
              ref={confettiRef}
              source={require("../../assets/confetti.json")}
              autoPlay={false}
              loop={false}
              style={styles.lottie}
              resizeMode="cover"
            />
          )}
        </>
     )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "white",
    padding:20,
    borderRadius:30,
  },
  headerImage: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 26,
    color: "#fff",
    fontWeight: "700",
  },
  bodyContainer: {
    padding: 15,
    backgroundColor: "#F8F8F8",
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
  lottie: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    pointerEvents: "none",
  },
});

export default Challenges;