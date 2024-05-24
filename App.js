import React from "react";
import TabNavigator from "./app/navigation/TabNavigator";
import UserProvider from "./app/contexts/UserContext";

const App = () => {
  return(<UserProvider>
    <TabNavigator />
  </UserProvider>)
};

export default App;
