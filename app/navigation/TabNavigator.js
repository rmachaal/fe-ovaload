import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import Leaderboard from "../screens/Leaderboard";
import ProgressStackNavigator from "./ProgressStackNavigator";
import ExercisesStackNavigator from "./ExercisesStackNavigator.js";

import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Image } from "react-native";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Tracker") {
              iconName = focused ? "analytics" : "analytics-outline";
            } else if (route.name === "Progress") {
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
        <Tab.Screen name="Home" component={HomeScreen}  options={{ headerTitle: () => (
              <Image
                style={styles.headerTitle}
                source={require('../../assets/logo.png')}
              />
            ), headerTintColor: "#7F00FF", headerTitleStyle: {fontWeight: "900", fontSize: 28 }}} />
        <Tab.Screen name="Tracker" component={ProgressStackNavigator}  options={{ headerTitle: "Progress", headerTintColor: "#7F00FF", headerTitleStyle: {fontWeight: "800", fontSize: 24 }}} />
        <Tab.Screen name="Progress" component={ExercisesStackNavigator} options={{ headerTitle: "My Exercises", headerTintColor: "#7F00FF", headerTitleStyle: {fontWeight: "800", fontSize: 24 }}} />
        <Tab.Screen name="Leaderboard" component={Leaderboard}  options={{ headerTitle: "Leaderboard", headerTintColor: "#7F00FF", headerTitleStyle: {fontWeight: "800", fontSize: 24 }}} />

      </Tab.Navigator>
  );
};


const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#DDDDDD",
  },
  headerTitle: {
    width: 150, 
    height: 40, 
    resizeMode: 'contain',
  },
});

export default TabNavigator;
