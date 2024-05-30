import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

const ExerciseStats = ({ item }) => {
  if (!item.exerciseStats) return null;

  const renderStats = () => {
    if (item.exerciseType === "resistance") {
      return item.exerciseStats.map((stat) => (
        <View style={styles.statDetails} key={stat._id}>
          <View>
            <Text style={styles.text}>Weight</Text>
            <Text style={styles.text2}>{stat.weightKg}kg</Text>
          </View>
          <View>
            <Text style={styles.text}>Sets</Text>
            <Text style={styles.text2}>{stat.sets}</Text>
          </View>
          <View>
            <Text style={styles.text}>Reps</Text>
            <Text style={styles.text2}>{stat.reps}</Text>
          </View>
        </View>
      ));
    } else if (item.exerciseType === "cardio") {
      return item.exerciseStats.map((stat) => (
        <View style={styles.statDetails} key={stat._id}>
          <View>
            <Text style={styles.text}>Distance</Text>
            <Text style={styles.text2}>{stat.distanceKm}km</Text>
          </View>
          <View>
            <Text style={styles.text}>Time</Text>
            <Text style={styles.text2}>{stat.timeMin}min</Text>
          </View>
        </View>
      ));
    }
  };

  return (
    <View style={styles.container}>
        <Icon
              name={"checkcircle"}
              size={30}
              color={"#7F00FF"}
              style={styles.icon}
            />
    <View style={styles.exerciseStatsContainer}>
      <Text style={styles.title}>
        {item.exerciseName
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}
      </Text>
      {renderStats()}
    </View></View>
  );
};

const styles = StyleSheet.create({
    container: {
        position: "relative",
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
        marginLeft: 5,
        // marginTop: 20,
        // marginBottom: 10,
        // marginRight: 10,
      },
      icon:{
       marginRight:10,
      //  marginLeft:10
      },
  exerciseStatsContainer: {
    padding: 10,
    backgroundColor: "rgb(248, 249, 249)",
    borderRadius: 5,
    width:330,
    // marginTop: 10,
    // paddingTop: 20,
    // marginBottom: 20
  },
  statDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginBottom: 10
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#7F00FF",
    marginBottom: 10,
  },
  text: {
    fontSize: 15,
    paddingBottom: 5,
  },
  text2: {
    fontSize: 20,
    fontWeight: "600",
    color: "#7F00FF",
  },
});

export default ExerciseStats;
