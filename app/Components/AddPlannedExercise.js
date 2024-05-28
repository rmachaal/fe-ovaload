import { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TextInput } from 'react-native';
import CheckBox from 'expo-checkbox';
import { getExercises, postPlannedExercise } from '../../api';
import { UserContext } from '../contexts/UserContext';
import { useExerciseAdded } from '../contexts/ExerciseAddedContext';

const AddPlannedExercise = ({ route, navigation }) => {
  const { selectedDate } = route.params;
  const parsedDate = new Date(selectedDate);
  const { username } = useContext(UserContext);
  const { callback } = useExerciseAdded();
  const [exercises, setExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cardioInputs, setCardioInputs] = useState({}); // State to store cardio input values

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await getExercises(username);
        setExercises(response.data.exercises);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [username]);

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
    }
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Exercises</Text>
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.exerciseName}
        renderItem={({ item }) => (
          <View style={styles.exerciseContainer}>
            <Text>{item.exerciseName}</Text>
            <CheckBox
              value={selectedExercises.includes(item.exerciseName)}
              onValueChange={() => handleCheckboxChange(item.exerciseName)}
            />
            {item.exerciseType === 'cardio' && selectedExercises.includes(item.exerciseName) && (
              <View>
                <TextInput
                  placeholder="Distance (km)"
                  keyboardType="numeric"
                  onChangeText={(value) => handleInputChange(item.exerciseName, 'distanceKm', value)}
                />
                <TextInput
                  placeholder="Time (min)"
                  keyboardType="numeric"
                  onChangeText={(value) => handleInputChange(item.exerciseName, 'timeMin', value)}
                />
              </View>
            )}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default AddPlannedExercise;
