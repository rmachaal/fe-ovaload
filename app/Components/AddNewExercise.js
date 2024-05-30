import React, { useContext, useState } from "react";
import { postExercises } from "../../api";
import { TextInput } from "react-native-gesture-handler";
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
  
    const postNewCardioExercise = async () => {
      const newExercise = {
        exerciseName: exerciseName,
        exerciseStats: [
          {
            distanceKm: parseFloat(distanceKm),
            timeMin: parseFloat(timeMins),
          },
        ],
      };
      try {
        await postExercises(username, newExercise);
        navigation.goBack();
      } catch (error) {
        console.error("Error posting exercise", error);
      }
    };
  
    const postNewResistanceExercise = async () => {
      const newExercise = {
        exerciseName: exerciseName,
        exerciseStats: [
          {
            weightKg: parseFloat(weightKg),
            sets: parseInt(sets),
            reps: parseInt(reps),
          },
        ],
      };
      try {
        await postExercises(username, newExercise);
        console.log("hello")
        navigation.goBack();
      } catch (error) {
        console.error("Error posting exercise", error);
      }
    };
  
    return (
      <View>
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
        {dropdownValue === "cardio" ? (
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
            <View style={styles.inputContainer}>
              <Text style={styles.labelText}>Distance</Text>
              <TextInput
                placeholder="Enter distance here"
                value={distanceKm}
                onChangeText={setDistanceKm}
                style={styles.input}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.labelText}>Time</Text>
              <TextInput
                placeholder="Enter time here"
                value={timeMins}
                onChangeText={setTimeMins}
                style={styles.input}
                keyboardType="numeric"
              />
            </View>
            <View>
              <Button title="Add" onPress={postNewCardioExercise} />
            </View>
          </>
        ) : (
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
            <View style={styles.inputContainer}>
              <Text style={styles.labelText}>Weight</Text>
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
            <View>
              <Button title="Add" onPress={postNewResistanceExercise} />
            </View>
          </>
        )}
      </View>
    );
  };

const styles = StyleSheet.create({
    labelText: {
        marginRight: 5, // Adjust the spacing between text and input boxes
        width: 60, // Set a fixed width for the labels
        textAlign: 'right', // Align the text to the right
      },
      input:{
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 2,
        marginRight: 10,
        width: 70, 
        height: 30
      },
        inputContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5, // Adjust the margin to create space between exercise name and inputs
    }
})

export default AddNewExercise