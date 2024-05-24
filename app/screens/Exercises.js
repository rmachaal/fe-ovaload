import React from "react";
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity} from "react-native";
import { UserContext } from "../contexts/UserContext"
import { Card } from "react-native-elements"

const Exercises = () => {

  const [exercises, setExercises] = useState([])

  useEffect(() => {
    
  })

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/placeholder_logo.jpeg")}
        style={styles.logo}
      />
      <Text>My Exercises</Text>
      <FlatList>

      </FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});

export default Exercises;
