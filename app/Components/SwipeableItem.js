import React, { useState, useContext, useRef } from "react";
import {
  View,
  StyleSheet,
  Animated,
  PanResponder,
  Modal,
  TouchableOpacity,
} from "react-native";
import CheckBox from "expo-checkbox";
import { UserContext } from "../contexts/UserContext";
import {
  deleteSelectedPlannedExercises,
  patchPlannedExercise,
  postExerciseStats,
  patchLeaderboardScore,
} from "../../api";
import ExerciseStats from "./ExerciseStats";
import NextChallenge from "./NextChallenge";
import CustomiseStats from "./CustomiseStats";
import moment from "moment-timezone";
import Icon from "react-native-vector-icons/Feather";

const SwipeableItem = ({
  item,
  date,
  fetchChallenges,
  selectedDate,
  exercises,
  setShowConfetti,
}) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const { username } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [modalExercise, setModalExercise] = useState(null);

  const today = moment();
  const selectedDateMoment = moment(selectedDate);
  const isToday = selectedDateMoment.isSame(today, "day");

  const isCompleted = item.completed;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove: (evt, gestureState) => {
      translateX.setValue(gestureState.dx);
    },
    onPanResponderRelease: async (evt, gestureState) => {
      if (gestureState.dx < -50) {
        const exerciseName = item.exerciseName;
        try {
          await deleteSelectedPlannedExercises(username, date, exerciseName);
          await fetchChallenges();
        } catch (error) {
          console.error("Error deleting exercise:", error);
        }
      } else {
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  const handleCheckboxChange = async (exerciseName, date) => {
    try {
      setShowConfetti(true);
      await patchPlannedExercise(username, date, exerciseName, {
        completed: true,
      });

      const exercise = exercises.find(
        (e) => e.exerciseName === exerciseName.toLowerCase().replace(/ /g, "-")
      );

      const newExerciseStats = {
        weightKg: exercise.nextChallenge[0].weightKg,
        sets: exercise.nextChallenge[0].sets,
        reps: exercise.nextChallenge[0].reps,
      };
      await postExerciseStats(username, exerciseName, newExerciseStats);
      await patchLeaderboardScore(username, 3);
      fetchChallenges();
    } catch (error) {
      console.error("Error marking exercise as completed:", error);
    }
  };

  const openModal = (exercise) => {
    setModalExercise(exercise);
    setShowModal(true);
  };

  return (
    <View>
      <ExerciseStats item={item} />
      <View style={styles.swipeContainer}>
        {isToday && item.nextChallenge && (
          <TouchableOpacity
            onPress={() => handleCheckboxChange(item.exerciseName, date)}
          >
            <Icon
              name={"circle"}
              size={30}
              color={"#7F00FF"}
              style={styles.icon}
            />
          </TouchableOpacity>
        )}

{!isToday && item.nextChallenge && (
  <Icon
    name={"calendar"}
    size={30}
    color={"#7F00FF"}
    style={styles.icon}
  />
)}

        <NextChallenge
          item={item}
          isToday={isToday}
          openModal={openModal}
          translateX={translateX}
          panResponder={panResponder}
        />
        <Modal visible={showModal} animationType="slide" transparent={true}>
          <CustomiseStats
            item={modalExercise}
            showModal={showModal}
            setShowModal={setShowModal}
            closeModal={() => setShowModal(false)}
            username={username}
          />
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  swipeContainer: {
    position: "relative",
    marginBottom: 10,
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  icon:{
   marginRight:10
  }
});

export default SwipeableItem;
