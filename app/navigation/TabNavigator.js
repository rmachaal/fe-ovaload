import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import Progress from "../screens/Progress";
import Exercises from "../screens/Exercises.js";
import Leaderboard from "../screens/Leaderboard.js";

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Progress" component={Progress} />
        <Tab.Screen name="Exercises" component={Exercises} />
        <Tab.Screen name="Leaderboard" component={Leaderboard} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


export default TabNavigator;
