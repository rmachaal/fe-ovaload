import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import Progress from "../screens/Progress";
import Exercises from "../screens/Exercises.js";
import Leaderboard from "../screens/Leaderboard.js";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Progress") {
              iconName = focused ? "analytics" : "analytics-outline";
            } else if (route.name === "Exercises") {
              iconName = focused ? "fitness" : "fitness-outline";
            } else if (route.name === "Leaderboard") {
              iconName = focused ? "trophy" : "trophy-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "#7F00FF",
          inactiveTintColor: "gray",
          style: styles.tabBar,
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Progress" component={Progress} />
        <Tab.Screen name="Exercises" component={Exercises} />
        <Tab.Screen name="Leaderboard" component={Leaderboard} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#DDDDDD",
  },
});

export default TabNavigator;
