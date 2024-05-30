import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProgressScreen from '../screens/Progress';
import AddPlannedExercise from '../Components/AddPlannedExercise';

const Stack = createNativeStackNavigator();

const ProgressStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProgressMain"
        component={ProgressScreen}
        options={{ headerShown: false }} 
      />
      <Stack.Screen
        name="AddPlannedExercise"
        component={AddPlannedExercise}
        options={{headerTitle: '', headerTransparent: true, headerBackTitle: "Back", headerTintColor: "#7F00FF"}}
      />
    </Stack.Navigator>
  );
};

export default ProgressStackNavigator;
