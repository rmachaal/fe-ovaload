import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { getFriendsScores, patchNewFriendByUsername } from "../../api";
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
  const [friend, setFriend] = useState("");
  const [loading, setLoading] = useState(true);
  const [inputLoading, setInputLoading] = useState(false);
  const [showInput, setShowInput] = useState(false);

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
  }, [username, friend]);

  async function handleAddFriend() {
    setShowInput(true);
    if (friend.trim()) {
      setInputLoading(true);
      console.log("Adding friend:", friend);
      try {
        const response = await patchNewFriendByUsername(username, friend);
        console.log("Friend added:", response.data);
      } catch (error) {
        console.error("Error adding friend:", error);
      } finally {
        setFriend("");
        setInputLoading(false);
        setShowInput(false);
      }
    }
  }

  if (loading) {
    return <ActivityIndicator size="large" color="#7F00FF" />;
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={140}
    >
      <View style={styles.container}>
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
                <Text style={styles.text}>#{index + 1}</Text>
                <View style={styles.userImageName}>
                  <View>
                    <Image source={image} style={styles.userImage} />
                  </View>
                  <View>
                    <Text style={styles.userName}>{item.username}</Text>
                  </View>
                </View>
                <Text style={styles.score}>{item.score}</Text>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={styles.addFriendForm}>
          {showInput ? (
            <>
              <TextInput
                style={styles.addFriendInput}
                placeholder="Enter your friend's username"
                value={friend}
                onChangeText={setFriend}
              />
              <TouchableOpacity
                style={styles.addFriendButton}
                onPress={handleAddFriend}
                disabled={inputLoading}
              >
                <Ionicons name="person-add-outline" size={30} color="#fff" />
              </TouchableOpacity>
              {/* {inputLoading && <ActivityIndicator size="small" color="#7F00FF" />} */}
            </>
          ) : (
            <TouchableOpacity
              style={styles.addFriendButton}
              onPress={() => setShowInput(true)}
            >
              <Ionicons name="person-add-outline" size={30} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: 30,
  },
  tabHeader: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#7F00FF",
    marginBottom: 15,
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
  userImage: {
    width: 55,
    height: 55,
    borderRadius: 50,
  },
  userName: {
    fontSize: 18,
    fontWeight: "450",
    fontStyle: "italic",
    color: "#7F00FF",
  },
  userImageName: {
    flexDirection: "column",
    alignItems: "center",
    paddingRight: 35,
  },
  text: {
    fontSize: 23,
    fontWeight: "600",
    color: "#7F00FF",
    paddingRight: 55,
  },
  score: {
    fontSize: 23,
    fontWeight: "600",
    color: "#7F00FF",
    width: 30,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: 375,
    height: 95,
    paddingTop: 5,
    marginBottom: 10,
    backgroundColor: "rgba(189, 181, 213, 0.25)",
    borderRadius: 10,
  },
  addFriendForm: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
    width: "100%",
    paddingHorizontal: 20,
  },
  addFriendInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  addFriendButton: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#7F00FF",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Leaderboard;
