import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { UserContext } from "../contexts/UserContext";
import { getChatbotMessage } from "../../api";
import { Ionicons } from "@expo/vector-icons";

const ChatBot = () => {
  const { username } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [responses, setResponses] = useState([]);

  //need to add loading!

  useEffect(() => {
    getChatbotMessage(username)
      .then((data) => {
        setMessage(data.message);
        setResponses(data.responses);
      })
      .catch((error) => {
        console.error("Error fetching message:", error);
      });
  }, [username]);

  const handleResponse = async (userResponse) => {
    const botResponse = responses.find(
      (response) => response.user === userResponse
    )?.bot;
    setMessage(botResponse || "Thank you for your response!");
    setResponses([]);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/leaderboard/level5.png")}
        style={styles.mascot}
      />
      <View style={styles.mascotContainer}>
        <Text style={styles.mascotTitle}>Jim Rat </Text>
        <Ionicons name="chatbubble" size={24} color="#7F00FF" />
      </View>
      <Text style={styles.messageText}>{message}</Text>
      <FlatList
        data={responses}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.responseButton}
            onPress={() => handleResponse(item.user)}
          >
            <Text style={styles.responseText}>{item.user}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.responseList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  messageText: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    backgroundColor: "rgba(189, 181, 213, 0.25)",
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
  },
  responseList: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  responseButton: {
    padding: 10,
    backgroundColor: "#7F00FF",
    borderRadius: 5,
    margin: 5,
    alignItems: "center",
  },
  responseText: {
    color: "#FFF",
    fontSize: 16,
  },
  mascotContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  mascot: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
  },
  mascotTitle: {
    color: "#7F00FF",
    fontSize: 24,
    fontWeight: "400",
  },
});

export default ChatBot;
