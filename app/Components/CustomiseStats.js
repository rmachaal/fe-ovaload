import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  Button,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  postExerciseStats,
  patchChallenges,
  patchLeaderboardScore,
} from "../../api";
import Icon from "react-native-vector-icons/Ionicons";

const CustomiseStats = ({
  item,
  closeModal,
  setShowModal,
  showModal,
  username,
}) => {
  const [newStats, setNewStats] = useState({
    weightKg: "",
    sets: "",
    reps: "",
    distanceKm: "",
    timeMin: "",
  });

  const { weightKg, sets, reps, distanceKm, timeMin } = newStats;

  const handleInputChange = (field, value) => {
    setNewStats((prevStats) => ({
      ...prevStats,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Post new exercise stats
      await postExerciseStats(username, item.exerciseName, newStats);

      // Patch challenges if applicable
      await patchChallenges(username, item.date, item.exerciseName, {
        completed: true,
      });

      // Patch leaderboard score
      await patchLeaderboardScore(username, 1);

      // Close the modal or perform additional actions
      closeModal();
    } catch (error) {
      // Handle errors gracefully
      console.error("Error customizing stats:", error);
    }
  };

  return (
    <Modal
      visible={showModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowModal(false)}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalContainer}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.modalContent}
          >
            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={styles.closeButton}
            >
              <Icon name="close" size={30} color="#7F00FF" />
            </TouchableOpacity>
            <Text>How much did you complete?</Text>

            {item.exerciseType === "cardio" ? (
              <>
                <TextInput
                  style={styles.input}
                  onChangeText={(value) =>
                    handleInputChange("distanceKm", value)
                  }
                  value={distanceKm}
                  keyboardType="numeric"
                  placeholder="Distance (in km)"
                />

                <TextInput
                  style={styles.input}
                  onChangeText={(value) => handleInputChange("timeMin", value)}
                  value={timeMin}
                  keyboardType="numeric"
                  placeholder="Time (in minutes)"
                />
              </>
            ) : (
              <>
                <TextInput
                  style={styles.input}
                  onChangeText={(value) => handleInputChange("weightKg", value)}
                  value={weightKg}
                  keyboardType="numeric"
                  placeholder="Weight (in kg)"
                />

                <TextInput
                  style={styles.input}
                  onChangeText={(value) => handleInputChange("sets", value)}
                  value={sets}
                  keyboardType="numeric"
                  placeholder="Sets"
                />

                <TextInput
                  style={styles.input}
                  onChangeText={(value) => handleInputChange("reps", value)}
                  value={reps}
                  keyboardType="numeric"
                  placeholder="Reps"
                />
              </>
            )}
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                handleSubmit();
                setShowModal(false);
              }}
            >
              <Text style={styles.text}>Submit</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: "90%",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#7F00FF",
  },
  text: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
  },
});

export default CustomiseStats;
