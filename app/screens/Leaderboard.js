import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { getFriendsScores } from "../../api";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";

const imageMap = {
  0: require("../../assets/userprofpic.png"),
  1: require("../../assets/leaderboard/level3.png"),
  2: require("../../assets/leaderboard/level2.png"),
  3: require("../../assets/leaderboard/level1.png"),
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
        console.error("Error fetching leaderboard data", error);
      } finally {
        setLoading(false);
      }
    }
    fetchLeaderboardData();
  }, [username]);

  // const handleAddFriend(){

  // }

  if (loading) {
    return <ActivityIndicator size="xlarge" color="#7F00FF" />;
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
              <View style={styles.userInfo}>
                <View style={styles.userImageContainer}>
                  <Image source={image} style={styles.userImage} />
                </View>
                <Text style={styles.text}>{item.username}</Text>
              </View>
              <Text style={styles.text}>{item.score}</Text>
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity style={styles.button} >
        <Ionicons
          name="person-add-outline"
          size={30}
          color="rgb(255, 255, 255)"
        />
      </TouchableOpacity>
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
  // userImageContainer: {
  //   flex: 1,
  //  flexDirection: "column",
  // },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    objectFit: "cover",
    marginRight: 10,
    resizeMode: "cover",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#7F00FF",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: 375,
    height: 100,
    marginBottom: 10,
    backgroundColor: "rgba(189, 181, 213, 0.25)",
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    position: "absolute",
    bottom: 20,
    right: 20,
    padding: 20,
    borderRadius: 50,
    backgroundColor: "#7F00FF",
  },
});

export default Leaderboard;
