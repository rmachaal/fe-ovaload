import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import Exercises from "../screens/Exercises";
import Leaderboard from "../screens/Leaderboard";
import ProgressStackNavigator from "./ProgressStackNavigator";

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Progress" component={ProgressStackNavigator} />
      <Tab.Screen name="Exercises" component={Exercises} />
      <Tab.Screen name="Leaderboard" component={Leaderboard} />
    </Tab.Navigator>
  );
}

export default TabNavigator;
