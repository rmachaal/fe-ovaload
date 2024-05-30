import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
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
    const fetchTodaysChallenges = async () => {
      try {
        const data = await getPlannedExerciseByDate(username, formattedDate);
        setTodaysChallenges(data);
      } catch (error) {
        console.error("Error fetching today's challenges", error);
      }
    };

    fetchTodaysChallenges();
    // Set up timer to refresh data every 10 seconds
    const intervalId = setInterval(fetchTodaysChallenges, 10000);
    // Cleanup function to clear the interval when component unmounts
    return () => clearInterval(intervalId);
  }, [username, formattedDate]);

  const formatExerciseName = (name) => {
    return name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getMostRecentStats = (nextChallenge) => {
    return nextChallenge.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )[0];
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Today's Challenges:</Text>
      <FlatList
        data={todaysChallenges}
        renderItem={({ item, index }) => {
          const mostRecentStat = getMostRecentStats(item.nextChallenge);
          return (
            <View style={styles.statItem}>
              <Text style={styles.title}>
                {formatExerciseName(item.exerciseName)}
              </Text>
              <View style={styles.statDetails}>
                {item.exerciseType === "cardio" ? (
                  <>
                    <View>
                      <Text style={styles.text}>Time</Text>
                      <Text style={styles.text2}>
                        {mostRecentStat.timeMin} min
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.text}>Distance</Text>
                      <Text style={styles.text2}>
                        {mostRecentStat.distanceKm} km
                      </Text>
                    </View>
                  </>
                ) : (
                  <>
                    <View>
                      <Text style={styles.text}>Weight</Text>
                      <Text style={styles.text2}>
                        {mostRecentStat.weightKg} kg
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.text}>Sets</Text>
                      <Text style={styles.text2}>{mostRecentStat.sets}</Text>
                    </View>
                    <View>
                      <Text style={styles.text}>Reps</Text>
                      <Text style={styles.text2}>{mostRecentStat.reps}</Text>
                    </View>
                  </>
                )}
                <View>
                  <Text style={styles.text}>Completed</Text>
                  <Text style={styles.text2}>{item.completed && "✅"}</Text>
                </View>
              </View>
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
  statItem: {
    width: 375,
    marginBottom: 20,
    backgroundColor: "rgba(189, 181, 213, 0.25)",
    borderRadius: 10,
    padding: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#7F00FF",
    marginBottom: 10,
  },
  statDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 15,
    paddingBottom: 5,
  },
  text2: {
    fontSize: 20,
    fontWeight: "600",
    color: "#7F00FF",
    textAlign: "center",
  },
});
export default TodaysChallenges;
