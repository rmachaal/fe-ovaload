import React from "react";
import TabNavigator from "./app/navigation/TabNavigator";
import { NavigationContainer } from "@react-navigation/native";
import UserProvider from "./app/contexts/UserContext";
import { ExerciseAddedProvider } from "./app/contexts/ExerciseAddedContext";
import IndividualExercisePage from "./app/screens/IndividualExercise";

const App = () => {
  return (
    <ExerciseAddedProvider>
      <UserProvider>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </UserProvider>
    </ExerciseAddedProvider>
  );

export default App;
