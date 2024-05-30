import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const NextChallenge = ({
  item,
  isToday,
  openModal,
  translateX,
  panResponder,
}) => {
  if (!item.nextChallenge) return null;

  const renderNextChallenge = () => {
    if (item.exerciseType === "resistance") {
      return (
        <View style={styles.statDetails}>
          <View>
            <Text style={styles.text}>Weight</Text>
            <Text style={styles.text2}>{item.nextChallenge[0].weightKg}kg</Text>
          </View>
          <View>
            <Text style={styles.text}>Sets</Text>
            <Text style={styles.text2}>{item.nextChallenge[0].sets}</Text>
          </View>
          <View>
            <Text style={styles.text}>Reps</Text>
            <Text style={styles.text2}>{item.nextChallenge[0].reps}</Text>
          </View>
        </View>
      );
    } else if (item.exerciseType === "cardio") {
      return (
        <View style={styles.statDetails}>
          <View>
            <Text style={styles.text}>Distance</Text>
            <Text style={styles.text2}>
              {item.nextChallenge[0].distanceKm}km
            </Text>
          </View>
          <View>
            <Text style={styles.text}>Time</Text>
            <Text style={styles.text2}>{item.nextChallenge[0].timeMin}min</Text>
          </View>
        </View>
      );
    }
  };

  const challengeContainerStyle = isToday ? styles.challengeContainer : styles.challengeContainerB;

  return (
    <View style={styles.nextChallengeContainer}>
      <View style={styles.deleteBackground}>
        <Icon name="trash" size={30} color="#fff" />
      </View>
      <Animated.View
        style={[
          challengeContainerStyle,
          { transform: [{ translateX }] },
        ]}
        {...panResponder.panHandlers}
      >
        <Text style={styles.title}>
          {item.exerciseName
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </Text>
        {renderNextChallenge()}
        {isToday && (
          <TouchableOpacity onPress={() => openModal(item)}>
            <Text style={styles.text3}>Didn't complete Challenges?</Text>
          </TouchableOpacity>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  nextChallengeContainer: {
    backgroundColor: "rgb(230, 230, 245)",
    borderRadius: 5,
  },
  deleteBackground: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    alignItems: "flex-end",
    justifyContent: "center",
    backgroundColor: "red",
    paddingRight: 20,
    borderRadius: 5,
  },
  challengeContainer: {
    padding: 10,
    backgroundColor: "rgb(230, 230, 245)",
    borderRadius: 5,
    width:330
  },
  challengeContainerB:{
    padding: 10,
    backgroundColor: "rgb(230, 230, 245)",
    borderRadius: 5,
    width:370
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
    color: "#8B0000",
  },
  statDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  text3: {
    color: "#7F00FF",
    fontWeight: "600",
    textAlign: "right",
    marginTop: 10,
  },
});

export default NextChallenge;
