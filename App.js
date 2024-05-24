import React from "react";
import TabNavigator from "./app/navigation/TabNavigator";
import UserProvider from "./app/contexts/UserContext";
import IndividualExercisePage from "./app/screens/IndividualExercise";

const App = () => {
  return(<UserProvider>
    <TabNavigator />
    <Route path="/:user/:exercise/" element={ <IndividualExercisePage/>} />
  </UserProvider>)
};

export default App;
