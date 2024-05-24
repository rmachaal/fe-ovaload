// Progress.js
import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { UserContext } from '../contexts/UserContext';
import {Calendar} from '../Components/Calendar.js';
import {Challenges} from '../Components/Challenges';

const Progress = () => {
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth());

  const { username } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Calendar year={year} month={month} setYear={setYear} setMonth={setMonth} date={date} />
      <Challenges />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default Progress;
