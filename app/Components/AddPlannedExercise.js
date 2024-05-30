import { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, ActivityIndicator, Button } from 'react-native';
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
    const plannedExercises = selectedExercises.map((exerciseName) => ({
      exerciseName,
      createdFor: parsedDate.toISOString().split("T")[0],
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
    return <ActivityIndicator size="large" color="#7F00FF" />;
  }

  const formatExerciseName = (name) => {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Exercises</Text>
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.exerciseName}
        renderItem={({ item }) => (
          <View style={styles.statItem}>
            <CheckBox
              value={selectedExercises.includes(item.exerciseName)}
              onValueChange={() => handleCheckboxChange(item.exerciseName)}
              color={selectedExercises.includes(item.exerciseName) ? "#7F00FF" : undefined}
            />
            <View style={styles.dataContainer}>
              <Text style={styles.exerciseName}>{formatExerciseName(item.exerciseName)}</Text>
              {item.exerciseType === 'cardio' && (
                <View style={styles.inputContainer}>
                  <View style={styles.inLine}>
                  <Text style={styles.labelText}>Distance:</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="km"
                    keyboardType="numeric"
                    onChangeText={(value) => handleInputChange(item.exerciseName, 'distanceKm', value)}
                  />
                  </View>
                  <View style={styles.inLine}>
                  <Text style={styles.labelText}>Time:</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="min"
                    keyboardType="numeric"
                    onChangeText={(value) => handleInputChange(item.exerciseName, 'timeMin', value)}
                  />
                  </View>
                </View>
              )}
            </View>
          </View>
        )}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddExercises}>
        <Text style={styles.addButtonText}>Add Selected Exercises</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 50
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#7F00FF',
    marginBottom: 20,
    textAlign: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: "rgba(189, 181, 213, 0.25)",
    borderRadius: 10,
    padding: 10,
  },
  dataContainer: {
    marginLeft: 10,
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  labelText: {
    marginRight: 5,
    width: 60,
    textAlign: 'right',
    fontWeight: '600',
    fontSize: 15
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 2,
    marginRight: 10,
    width: 70,
    fontSize: 16
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#7F00FF',
    marginBottom: 5,
  },
  text: {
    fontSize: 15,
    justifyContent: "space-around",
    paddingBottom: 5,
  },
  text2: {
    fontSize: 20,
    fontWeight: "600",
    color: "#7F00FF",
  },
  addButton: {
    backgroundColor: '#7F00FF',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  inLine: {
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  fontSize: 40
  },
});

export default AddPlannedExercise;