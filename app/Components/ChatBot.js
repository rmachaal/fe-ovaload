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

const ChatBot = () => {
  const { username } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [responses, setResponses] = useState([]);

  //need to add loading!

  useEffect(() => {
    getChatbotMessage(username)
      .then((message) => {
        setMessage(message);
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
      <Text style={styles.mascotTitle}>Ova Load says:</Text>
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
  },
  messageText: {
    fontSize: 18,
    textAlign: "center",
    backgroundColor: "rgba(189, 181, 213, 0.25)",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  responseList: {
    width: "100%",
  },
  responseButton: {
    padding: 15,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  responseText: {
    color: "#FFF",
    fontSize: 16,
  },
  mascot: {
    width: 100,
    height: 100,
    borderRadius: 50,
    objectFit: "cover",
    marginTop: 10,
  },
  mascotTitle: {
    fontSize: 25,
    fontWeight: "bold",
  },
});

export default ChatBot;
