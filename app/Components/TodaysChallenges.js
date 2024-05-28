import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { getPlannedExerciseByDate } from "../../api";

const TodaysChallenges = () => {
  const { username } = useContext(UserContext);
  const [todaysChallenges, setTodaysChallenges] = useState([]);

  const today = new Date();
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const formattedDate = today.toLocaleDateString("en-CA", options);

  useEffect(() => {
    async function getTodaysChallenges() {
      try {
        const data = await getPlannedExerciseByDate(username, formattedDate);
        setTodaysChallenges(data);
      } catch (error) {
        console.error("Error fetching today's challenges", error);
      }
    }
    getTodaysChallenges();
  }, [username, formattedDate]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Today's Challenges:</Text>
      <FlatList
        data={todaysChallenges}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.challenge}>
              <Text style={styles.challengeText}>{item.exerciseName}</Text>
              <Text style={styles.text}>{item.completed && "✅"}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(128, 128, 128, 0.1)",
    borderRadius: 25,
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "600",
    color: "#7F00FF",
    marginBottom: 20,
    textAlign: "left",
  },
  challenge: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 50,
    backgroundColor: "rgba(189, 181, 213, 0.25)",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  challengeText: {
    fontSize: 20,
    fontWeight: "400",
  },
  text: {
    fontSize: 20,
  },
});
export default TodaysChallenges;
