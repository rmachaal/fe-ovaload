import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { getFriendsScores } from "../../api";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

const imageMap = {
  0: require("../../assets/leaderboard/level0.png"),
  1: require("../../assets/leaderboard/level1.png"),
  2: require("../../assets/leaderboard/level2.png"),
  3: require("../../assets/leaderboard/level3.png"),
  4: require("../../assets/leaderboard/level4.png"),
};

const Leaderboard = () => {
  const { username } = useContext(UserContext);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboardData() {
      try {
        const data = await getFriendsScores(username);
        setLeaderboardData(data);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchLeaderboardData();
  }, [username]);

  if (loading) {
    return <ActivityIndicator size="large" color="#7F00FF" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.tabHeader}>Leaderboard</Text>
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Ranking</Text>
        <Text style={styles.headerText}>Name</Text>
        <Text style={styles.headerText}>Score</Text>
      </View>
      <FlatList
        data={leaderboardData}
        renderItem={({ item, index }) => {
          const image = imageMap[index];
          return (
            <View style={styles.tableRow}>
              <Text style={styles.text}>{index + 1}</Text>
              <Image source={image} style={styles.levelImage} />
              <Text style={styles.text}>{item.username}</Text>
              <Text style={styles.text}>{item.score}</Text>
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
    backgroundColor: "#fff",
  },
  tabHeader: {
    fontSize: 45,
    fontWeight: "bold",
    color: "#7F00FF",
    marginBottom: 25,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 300,
    marginBottom: 10,
  },
  headerText: {
    fontWeight: "bold",
    color: "#8F87A1",
    fontSize: 18,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 375,
    height: 80,
    marginBottom: 10,
    backgroundColor: "rgba(189, 181, 213, 0.25)",
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  levelImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    objectFit: "cover",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#7F00FF",
  },
});

export default Leaderboard;
