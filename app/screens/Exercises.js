import React from "react";
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity} from "react-native";
import { UserContext } from "../contexts/UserContext"
import { Card } from "react-native-elements"
import { getExercises } from "../../api";

const Exercises = () => {

  const [exercises, setExercises] = useState([])
  const {username} = useContext(UserContext)

  // useEffect(() => {
  //   getExercises(username).then((res) => {
  //     setExercises(res.data)
  //   })
  //   .catch(err){
  //   console.error(err)
  //  }
  // }, [])

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/placeholder_logo.jpeg")}
        style={styles.logo}
      />
      <Text>My Exercisess</Text>
      <FlatList data={[
        {key: "laurie"},
        {key: "harry"},
        {key: "rahaf"},
        {key: "angela"}
      ]}
      renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
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
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});

export default Exercises;
