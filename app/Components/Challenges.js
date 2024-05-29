import { useState, useEffect, useContext, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Animated,
  PanResponder,
  Modal,
} from "react-native";
import CheckBox from "expo-checkbox";
import { UserContext } from "../contexts/UserContext";
import {
  getExerciseByDate,
  getPlannedExerciseByDate,
  patchPlannedExercise,
  postExerciseStats,
  patchLeaderboardScore,
  deleteSelectedPlannedExercises,
} from "../../api";
import moment from "moment-timezone";
import Icon from "react-native-vector-icons/Ionicons";
import LottieView from "lottie-react-native";
import CustomiseStats from "./CustomiseStats";

const Challenges = ({ navigation, selectedDate }) => {
  const [loading, setLoading] = useState(true);
  const [exercises, setExercises] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalExercise, setModalExercise] = useState(null);
  const { username } = useContext(UserContext);
  const [showConfetti, setShowConfetti] = useState(false);

  const timeZone = "Europe/London";
  const confettiRef = useRef(null);

  const today = moment();
  const selectedDateMoment = moment(selectedDate);
  const selectedDateString = selectedDateMoment.format("YYYY-MM-DD");
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
  }, [setExercises, selectedDate]);

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
  const handleCheckboxChange = async (exerciseName, date) => {
    try {
      await patchPlannedExercise(username, date, exerciseName, {
        completed: true,
      });

      const exercise = exercises.find(
        (e) => e.exerciseName === exerciseName.toLowerCase().replace(/ /g, "-")
      );

      if (exercise && exercise.nextChallenge) {
        const newExerciseStats = {
          weightKg: exercise.nextChallenge[0].weightKg,
          sets: exercise.nextChallenge[0].sets,
          reps: exercise.nextChallenge[0].reps,
        };
        await postExerciseStats(username, exerciseName, newExerciseStats);
        await patchLeaderboardScore(username, 3);
      }
      setShowConfetti(true);
      if (confettiRef.current) {
        confettiRef.current.play(0);
      }

      fetchChallenges();
    } catch (error) {
      console.error("Error marking exercise as completed:", error);
    }
  };

  const SwipeableItem = ({ item, date, handleCheckboxChange }) => {
    const translateX = useRef(new Animated.Value(0)).current;

    const panResponder = PanResponder.create({
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: (evt, gestureState) => {
        translateX.setValue(gestureState.dx);
      },
      onPanResponderRelease: async (evt, gestureState) => {
        if (gestureState.dx < -100) {
          const exerciseName = item.exerciseName;
          try {
            await deleteSelectedPlannedExercises(username, date, exerciseName);
            await fetchChallenges();
          } catch (error) {
            console.error("Error deleting exercise:", error);
          }
        } else {
          // Reset position if not enough swipe
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    });

    const isCompleted = item.completed;

    const openModal = (exercise) => {
      setModalExercise(exercise);
      setShowModal(true);
    };

    const closeModal = () => {
      setShowModal(false);
    };

    return (
      <View style={styles.swipeContainer}>
        {item.exerciseStats && item.exerciseType === "resistance" && (
          <View style={styles.exerciseStatsContainer}>
            <Text>
              {item.exerciseName
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </Text>
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

        {item.exerciseStats && item.exerciseType === "cardio" && (
          <View style={styles.exerciseStatsContainer}>
            <Text>
              {item.exerciseName
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </Text>
            <Text>Exercise Stats:</Text>
            {item.exerciseStats.map((stat) => (
              <View key={stat._id}>
                <Text>Distance: {stat.distanceKm} km</Text>
                <Text>Time: {stat.timeMin} min</Text>
              </View>
            ))}
          </View>
        )}

        {item.nextChallenge && (
          <View style={styles.nextChallengeContainer}>
            <View style={styles.deleteBackground}>
              <Icon name="trash" size={30} color="#fff" />
            </View>
            {/* </Animated.View> */}
            <Animated.View
              style={[
                styles.challengeContainer,
                item.exerciseStats
                  ? styles.exerciseStatsContainer
                  : styles.plannedExerciseContainer,
                { transform: [{ translateX }] },
              ]}
              {...panResponder.panHandlers} // Attach panResponder to the item view conditionally
            >
              <Text>
                {item.exerciseName
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </Text>

              {item.nextChallenge && isToday && (
                <CheckBox
                  value={isCompleted}
                  onValueChange={() =>
                    handleCheckboxChange(item.exerciseName, date)
                  }
                />
              )}

              {item.nextChallenge && item.exerciseType === "resistance" && (
                <View>
                  <Text style={styles.nextChallenge}>Challenge:</Text>
                  <Text>Weight: {item.nextChallenge[0].weightKg}</Text>
                  <Text>Sets: {item.nextChallenge[0].sets}</Text>
                  <Text>Reps: {item.nextChallenge[0].reps}</Text>
                </View>
              )}

              {item.nextChallenge && item.exerciseType === "cardio" && (
                <View>
                  <Text style={styles.nextChallenge}>Challenge:</Text>
                  <Text>Distance: {item.nextChallenge[0].distanceKm}</Text>
                  <Text>Time: {item.nextChallenge[0].timeMin}</Text>
                </View>
              )}

              {item.nextChallenge && isToday && (
                <View>
                  <TouchableOpacity onPress={() => openModal(item)}>
                    <Text>Didn't complete Challenges?</Text>
                  </TouchableOpacity>

                  <Modal
                    visible={showModal}
                    animationType="slide"
                    transparent={true}
                  >
                    <CustomiseStats
                      item={modalExercise} // Pass exercise name to modal
                      showModal={showModal}
                      setShowModal={setShowModal}
                      closeModal={() => setShowModal(false)} // Pass closeModal function to modal
                      username={username}
                    />
                  </Modal>
                </View>
              )}
            </Animated.View>
          </View>
        )}
      </View>
    );
  };
  const deleteExercise = async (date, exerciseName) => {
    try {
      await deleteSelectedPlannedExercises(username, date, exerciseName);
      await fetchChallenges();
    } catch (error) {
      console.error("Error deleting exercise:", error);
    }
  };

  const renderItem = ({ item }) => {
    const date = moment(selectedDate).format("YYYY-MM-DD");
    return (
      <SwipeableItem
        item={item}
        date={date}
        handleCheckboxChange={handleCheckboxChange}
        deleteExercise={deleteExercise}
      />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  exerciseContainer: {
    padding: 15,
    borderBottemWidth: 1,
    borderBottomColor: "#ccc",
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
    padding: 10,
    backgroundColor: "rgb(230, 230, 245)",
    borderRadius: 5,
  },
  nextChallenge: {
    color: "#7F00FF",
  },
  exerciseStatsContainer: {
    padding: 10,
    backgroundColor: "rgb(248, 249, 249)",
    borderRadius: 5,
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
  deleteBackground: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    alignItems: "flex-end",
    justifyContent: "center",
    backgroundColor: "red",
    paddingRight: 20,
    borderRadius: 5,
  },
  swipeContainer: {
    position: "relative",
    backgroundColor: "#fff",
    marginBottom: 10,
  },
});

export default Challenges;
