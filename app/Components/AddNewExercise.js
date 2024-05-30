import React, { useContext, useState, useEffect } from "react";
import { postExercises } from "../../api";
import { TextInput, TouchableOpacity } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { UserContext } from "../contexts/UserContext";
import { View, Text, Button, StyleSheet } from "react-native";

const AddNewExercise = ({ navigation }) => {
  const { username } = useContext(UserContext);
  const [exerciseName, setExerciseName] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [dropdownValue, setDropdownValue] = useState(null);
  const [distanceKm, setDistanceKm] = useState("");
  const [timeMins, setTimeMins] = useState("");
  const [shouldPost, setShouldPost] = useState(false);

  const postNewExercise = async () => {
    if (!exerciseName || !dropdownValue) {
      alert("Please select exercise type and enter exercise name.");
      return;
    }

    let exerciseStats = {};

    if (dropdownValue === "resistance") {
      exerciseStats = {
        weightKg: parseFloat(weightKg) || 0,
        sets: parseInt(sets) || 0,
        reps: parseInt(reps) || 0,
      };
    } else if (dropdownValue === "cardio") {
      exerciseStats = {
        distanceKm: parseFloat(distanceKm) || 0,
        timeMin: parseFloat(timeMins) || 0,
      };
    }

    const newExercise = {
      exerciseName: exerciseName.toLowerCase(),
      exerciseType: dropdownValue,
      exerciseStats: [exerciseStats],
    };

    console.log("Posting new exercise:", newExercise);

    try {
      await postExercises(username, newExercise);
      navigation.goBack();
    } catch (error) {
      console.error("Error posting exercise", error);
      alert("Failed to post exercise. Please try again.");
    }
  };

  useEffect(() => {
    if (shouldPost) {
      postNewExercise();
      setShouldPost(false);
    }
  }, [
    shouldPost,
    exerciseName,
    weightKg,
    sets,
    reps,
    dropdownValue,
    distanceKm,
    timeMins,
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>Select exercise type:</Text>
        <RNPickerSelect
          placeholder={{
            label: "Select an option...",
            value: null,
          }}
          items={[
            { label: "Resistance", value: "resistance" },
            { label: "Cardio", value: "cardio" },
          ]}
          value={dropdownValue}
          onValueChange={setDropdownValue}
        />
      </View>
      {dropdownValue && (
        <>
          <View style={styles.inputContainer}>
            <Text style={styles.labelText}>Exercise name</Text>
            <TextInput
              placeholder="Enter exercise name here"
              value={exerciseName}
              onChangeText={setExerciseName}
              style={styles.input}
            />
          </View>
          {dropdownValue === "cardio" ? (
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.labelText}>Distance (km)</Text>
                <TextInput
                  placeholder="Enter distance here"
                  value={distanceKm}
                  onChangeText={setDistanceKm}
                  style={styles.input}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.labelText}>Time (mins)</Text>
                <TextInput
                  placeholder="Enter time here"
                  value={timeMins}
                  onChangeText={setTimeMins}
                  style={styles.input}
                  keyboardType="numeric"
                />
              </View>
            </>
          ) : (
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.labelText}>Weight (kg)</Text>
                <TextInput
                  placeholder="Enter weight here"
                  value={weightKg}
                  onChangeText={setWeightKg}
                  style={styles.input}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.labelText}>Sets</Text>
                <TextInput
                  placeholder="Enter number of sets here"
                  value={sets}
                  onChangeText={setSets}
                  style={styles.input}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.labelText}>Reps</Text>
                <TextInput
                  placeholder="Enter number of reps here"
                  value={reps}
                  onChangeText={setReps}
                  style={styles.input}
                  keyboardType="numeric"
                />
              </View>
            </>
          )}
          <View>
            <TouchableOpacity
              title="Add"
              onPress={() => setShouldPost(true)}
              style={styles.addButton}
            >
              <Text style={styles.addButtonText}>Add exercise</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    paddingTop: 50,
  },
  labelText: {
    flexDirection: "row",
    marginRight: 5,
    width: 60,
    textAlign: "right",
    fontWeight: "600",
    fontSize: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 2,
    marginLeft: 10,
    marginRight: 10,
    width: 240,
    height: 35,
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "rgba(189, 181, 213, 0.25)",
    borderRadius: 10,
    padding: 10,
  },
  addButton: {
    backgroundColor: "#7F00FF",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AddNewExercise;
