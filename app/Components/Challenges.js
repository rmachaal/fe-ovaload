import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";

import { getExerciseByDate } from "../../api.js";

const Challenges = ({ selectedDate }) => {
  const { username } = useContext(UserContext);

  const [completedChallenges, setcompletedChallenges] = useState([]);

  const formattedSelectedDate = new Date(selectedDate.getTime() - (selectedDate.getTimezoneOffset() * 60000)).toISOString().split("T")[0];

  const getCompletedChallenges = () => {
    getExerciseByDate(username, formattedSelectedDate).then(
      (completedChallengesData) => {
        setcompletedChallenges(completedChallengesData);
      }
    );
  };

  useEffect(() => {
    getCompletedChallenges();
  }, [selectedDate]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{selectedDate.toDateString()}</Text>
      {completedChallenges !== undefined &&
        completedChallenges.map((challenge) => (
          <View key={challenge._id}>
            <Text style={styles.challengeName}>{challenge.exerciseName}</Text>
            <Text>Exercise Type: {challenge.exerciseType}</Text>
            <Text>Exercise Stats:</Text>
            {challenge.exerciseStats.length > 0 && (
              <View>
                <Text>Reps: {challenge.exerciseStats[0].reps}</Text>
                <Text>Weight: {challenge.exerciseStats[0].weightKg} kg</Text>
              </View>
            )}
            <Text>--------------------------</Text>
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dateText: {
    fontSize: 16,
    marginBottom: 10,
  },
  challengeName: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Challenges;
