import { useEffect, useContext, useState, useSyncExternalStore } from "react";
import { postExercises } from "../../api";
import { TextInput } from "react-native-gesture-handler";
import RNPickerSelect from "react-native-picker-select"
import { UserContext } from "../contexts/UserContext";
import { View, Text, Button, StyleSheet } from "react-native"

const AddNewExercise = ({navigation}) => {
    const { username } = useContext(UserContext);
    // const [exercises, setExercises] = useState([])
    const [exerciseName, setExerciseName] = useState("")
    const [weightKg, setWeightKg] = useState(0)
    const [sets, setSets] = useState(0)
    const [reps, setReps] = useState(0)
    const [dropdownValue, setDropdownValue] = useState(null);
    const [distanceKm, setDistanceKm] = useState(0)
    const [timeMins, setTimeMins] = useState(0)
    // const [inputs, setInputs] = useState({})
   
        const postNewCardioExercise = async (username, exerciseName, distanceKm, timeMins) => {
            const newExercise = {
                exerciseName: exerciseName,
                exerciseStats: [{
                    distanceKm: distanceKm,
                    timeMin: timeMins
                }]
            }
        try {
            await postExercises(username, newExercise)
        }
        catch (err) {
            console.error("Error posting exercise", error)
        }
        }
        
        const postNewResistanceExercise = async (username, exerciseName, weightKg, sets, reps) => {
            const newExercise = {
                exerciseName: exerciseName,
                exerciseStats: [{
                    weightKg: weightKg,
                    sets: sets,
                    reps: reps
                }]
            }
        try {
             await postExercises(username, newExercise)
        }
        catch (err) {
            console.error("Error posting exercise", error)
        }
        }

        
            const handleInputChange = (e) => {
                setExerciseName(e.target.value);
              };

    return (
        <View>  
            <View style={styles.inputContainer}>         
            <Text style={styles.labelText}>Select exercise type:</Text>
            <RNPickerSelect
              placeholder={{
                label: 'Select an option...',
                value: null,
              }}
              items={[
                { label: 'Resistance', value: 'resistance' },
                { label: 'Cardio', value: 'cardio' }
              ]}
              onValueChange={(value) => setDropdownValue(value)}
              value={dropdownValue}
            />
            </View>
            {/* {dropdownValue && <Text>Selected: {dropdownValue}</Text>} */}
            {dropdownValue === "cardio" ? (
                <>
            <View style={styles.inputContainer}>
            <Text style={styles.labelText}>Exercise name</Text>
            <TextInput
            placeholder="Enter exercise name here"
            onTextChange={(exercise)=>{setExerciseName(exercise)}}
            value={exerciseName}
            style={styles.input}
            // onChangeText={(value) => handleInputChange(exerciseName, 'distanceKm', value)}
            />
            </View>
            <View style={styles.inputContainer}>
            <Text style={styles.labelText}>Distance</Text>
            <TextInput
            placeholder="Enter distance here"
            onTextChange={(distance)=>{setDistanceKm(distance)}}
            value={distanceKm}
            style={styles.input}
            // onChangeText={(value) => handleInputChange(exerciseName, 'distanceKm', value)}
            />
            </View>
            <View style={styles.inputContainer}>
            <Text style={styles.labelText}>Time</Text>
            <TextInput
            placeholder="Enter time here"
            onTextChange={(time)=>{setTimeMins(time)}}
            value={timeMins}
            style={styles.input}
            />
            </View>
            <View>
            <Button title="Add" onPress={postNewCardioExercise(username, exerciseName, distanceKm, timeMins)}/>
            </View>
            </>
            ) : (
                <>
            <View style={styles.inputContainer}>
            <Text style={styles.labelText}>Exercise name</Text>
            <TextInput
            placeholder="Enter exercise name here"
            onTextChange={(exercise)=>{ return setExerciseName(exercise)}}
            value={exerciseName}
            style={styles.input}
            />
            </View>
            <View style={styles.inputContainer}>
            <Text style={styles.labelText}>Weight</Text>
            <TextInput
            placeholder="Enter weight here"
            onTextChange={(weight)=>{setWeightKg(weight)}}
            value={weightKg}
            style={styles.input}
            />
            </View>
            <View style={styles.inputContainer}>
            <Text style={styles.labelText}>Sets</Text>
            <TextInput
            placeholder="Enter number of sets here"
            onTextChange={(sets)=>{setSets(sets)}}
            value={sets}
            style={styles.input}
            />
            </View>
            <View style={styles.inputContainer}>
            <Text style={styles.labelText}>Reps</Text>
            <TextInput
            placeholder="Enter number of reps here"
            onTextChange={(reps)=>{setReps(reps)}}
            value={reps}
            style={styles.input}
            />
            </View>
            <View>
            <Button title="Add" onPress={postNewResistanceExercise(username, exerciseName, weightKg, sets, reps)}/>
            </View>
            </>)}
        </View>
    )
}

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