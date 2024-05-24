// Challenges.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { UserContext } from '../contexts/UserContext';

const Challenges = () => {

    const { username } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Challenges</Text>
      {/* Add your challenges content here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Challenges;
