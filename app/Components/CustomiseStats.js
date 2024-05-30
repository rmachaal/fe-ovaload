import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {
  patchPlannedExercise,
  postExerciseStats,
  patchLeaderboardScore,
} from "../../api";

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
      await postExerciseStats(username, item.exerciseName, newStats);
      await patchPlannedExercise(username, item.date, item.exerciseName, {
        completed: true,
      });
      await patchLeaderboardScore(username, 1);
      closeModal();
    } catch (error) {
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
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        accessible={false}
        style={{ flex: 1 }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={styles.closeButton}
            >
              <Icon name="close" size={30} color="#7F00FF" />
            </TouchableOpacity>
            <Text style={styles.title}>How much did you achieve?</Text>

<View style={styles.inputContainer}>
            {item.exerciseType === "cardio" ? (
              <>
              <View style={styles.statContainer}>
                  <Text style={styles.text}> Distance</Text>
                  <TextInput
                  style={styles.input}
                  onChangeText={(value) =>
                    handleInputChange("distanceKm", value)
                  }
                  value={distanceKm}
                  keyboardType="numeric"
                  placeholder="km"
                  autoFocus={true}
                />
                </View>

                <View style={styles.statContainer}>
                  <Text style={styles.text}> Time</Text>
                  <TextInput
                  style={styles.input}
                  onChangeText={(value) => handleInputChange("timeMin", value)}
                  value={timeMin}
                  keyboardType="numeric"
                  placeholder="Time (in minutes)"
                />
                </View>
              </>
            ) : (
              <>
                <View style={styles.statContainer}>
                  <Text style={styles.text}> Weight</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={(value) =>
                      handleInputChange("weightKg", value)
                    }
                    value={weightKg}
                    keyboardType="numeric"
                    placeholder="Kg"
                    autoFocus={true}
                  />
                </View>

                <View style={styles.statContainer}>
                  <Text style={styles.text}> Sets</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={(value) => handleInputChange("sets", value)}
                    value={sets}
                    keyboardType="numeric"
                    placeholder="Sets"
                  />
                </View>

                <View style={styles.statContainer}>
                  <Text style={styles.text}> Reps</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={(value) => handleInputChange("reps", value)}
                    value={reps}
                    keyboardType="numeric"
                    placeholder="Reps"
                  />
                </View>
              </>
            )}

</View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                handleSubmit();
                setShowModal(false);
              }}
            >
              <Text style={styles.submit}>Submit</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
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
    width: "90%",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  statContainer:{
width:100
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "100%",
    color: "#7F00FF",
    textAlign: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    backgroundColor: "#7F00FF",
  },
  submit: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
    color: "#7F00FF",
  },
  text: {
    fontSize: 15,
    paddingBottom: 5,
  },
});

export default CustomiseStats;
