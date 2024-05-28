import { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TextInput, ActivityIndicator } from 'react-native';
import CheckBox from 'expo-checkbox';
import { getExercises, postPlannedExercise } from '../../api';
import { UserContext } from '../contexts/UserContext';
import { useExerciseAdded } from '../contexts/ExerciseAddedContext';

const AddPlannedExercise = ({ route, navigation }) => {
  const { selectedDate, plannedExercises } = route.params;
  const parsedDate = new Date(selectedDate);
  const { username } = useContext(UserContext);
  const { callback } = useExerciseAdded();
  const [exercises, setExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cardioInputs, setCardioInputs] = useState({}); // State to store cardio input values

  useEffect(() => {
    const fetchExercises = async () => {
      setLoading(true);
      try {
        const allExercises = await getExercises(username);
        const filteredExercises = (allExercises.data.exercises).filter(
          exercise => !plannedExercises.includes(exercise.exerciseName)
        );
        setExercises(filteredExercises);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [username, plannedExercises]);

  const handleCheckboxChange = (exerciseName) => {
    setSelectedExercises((prev) =>
      prev.includes(exerciseName)
        ? prev.filter((name) => name !== exerciseName)
        : [...prev, exerciseName]
    );
  };

  const handleInputChange = (exerciseName, field, value) => {
    setCardioInputs((prev) => ({
      ...prev,
      [exerciseName]: {
        ...prev[exerciseName],
        [field]: value,
      },
    }));
  };

  const handleAddExercises = async () => {
    // Check if selectedDate is a valid Date object
    const plannedExercises = selectedExercises.map((exerciseName) => ({
      exerciseName,
      createdFor: parsedDate.toISOString().split("T")[0], // Format the date correctly
      completed: false,
      ...cardioInputs[exerciseName], // Include cardio inputs if available
    }));

    try {
      const response = await postPlannedExercise(username, plannedExercises);
      if (typeof callback === 'function') {
        callback(); // Ensure the callback is a function before calling it
      }
      navigation.goBack();
    } catch (error) {
      console.error("Error posting planned exercises:", error);
    }
  };
  
  if (loading) {
    return <ActivityIndicator size="xlarge" color="#7F00FF" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Exercises</Text>
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.exerciseName}
        renderItem={({ item }) => (
          <View style={styles.exerciseContainer}>
            <CheckBox
              value={selectedExercises.includes(item.exerciseName)}
              onValueChange={() => handleCheckboxChange(item.exerciseName)}
            />
            <View style={styles.dataContainer}>
            <Text>{item.exerciseName.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}</Text>
            {item.exerciseType === 'cardio' && (
              <View style={styles.inputContainer}>
              <Text style={styles.labelText}>Distance:</Text>
              <TextInput
                style={styles.input}
                placeholder="km"
                keyboardType="numeric"
                onChangeText={(value) => handleInputChange(item.exerciseName, 'distanceKm', value)}
              />
              <Text style={styles.labelText}>Time:</Text>
              <TextInput
                style={styles.input}
                placeholder="min"
                keyboardType="numeric"
                onChangeText={(value) => handleInputChange(item.exerciseName, 'timeMin', value)}
              />
            </View>
            )}
            </View>
          </View>
        )}
      />
      <Button title="Add Selected Exercises" onPress={handleAddExercises} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#7F00FF',
  },
  exerciseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  dataContainer:{
    marginLeft:10
  },
  inputContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5, // Adjust the margin to create space between exercise name and inputs
  },
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
  }
});

export default AddPlannedExercise;
