import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Exercises from "../screens/Exercises";
import IndividualExercise from "../screens/IndividualExercise";
import AddNewExercise from "../Components/AddNewExercise";


const Stack = createStackNavigator();

const ExercisesStackNavigator = () => {
  return (

    <Stack.Navigator initialRouteName="Exercises" >
    <Stack.Screen name="Exercises" component={Exercises} options={{ headerShown: false }}/>
    <Stack.Screen name="IndividualExercise" component={IndividualExercise} options={{headerTitle: '', headerTransparent: true, headerBackTitle: "Back", headerTintColor: "#7F00FF"}}/>
    <Stack.Screen name="AddNewExercise" component={AddNewExercise} options={{ headerShown: false }}/>

      </Stack.Navigator>

  );
};

export default ExercisesStackNavigator;