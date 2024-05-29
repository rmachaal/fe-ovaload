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
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ProgressStackNavigator;
