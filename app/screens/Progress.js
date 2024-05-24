import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { UserContext } from '../contexts/UserContext';
import Calendar from '../Components/Calendar';
import Challenges from '../Components/Challenges';
import { LinearGradient } from "expo-linear-gradient";

const Progress = () => {
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { username } = useContext(UserContext);

  return (
    <LinearGradient
    colors={["#c44532", "#862a57", "#32081f"]}
  >
    <View style={styles.container}>
      <Calendar
        year={year}
        month={month}
        setYear={setYear}
        setMonth={setMonth}
        date={date}
        onDateSelect={setSelectedDate}
        selectedDate={selectedDate}
      />
      <Challenges selectedDate={selectedDate} />
    </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default Progress;
