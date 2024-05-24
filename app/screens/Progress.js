import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { UserContext } from '../contexts/UserContext';

const Progress = () => {
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth());
  const [days, setDays] = useState([]);

  const {username} = useContext(UserContext)

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  useEffect(() => {
    manipulate();
  }, [month, year]);

  const manipulate = () => {
    const dayOne = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const dayEnd = new Date(year, month, lastDate).getDay();
    const monthLastDate = new Date(year, month, 0).getDate();

    const daysArray = [];

    for (let i = dayOne; i > 0; i--) {
      daysArray.push({
        date: monthLastDate - i + 1,
        isCurrentMonth: false
      });
    }

    for (let i = 1; i <= lastDate; i++) {
      const isToday = i === date.getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
      daysArray.push({
        date: i,
        isCurrentMonth: true,
        isToday: isToday
      });
    }

    for (let i = dayEnd; i < 6; i++) {
      daysArray.push({
        date: i - dayEnd + 1,
        isCurrentMonth: false
      });
    }

    setDays(daysArray);
  };

  const handlePrevNext = (direction) => {
    let newMonth = month;
    let newYear = year;

    if (direction === 'prev') {
      newMonth -= 1;
      if (newMonth < 0) {
        newMonth = 11;
        newYear -= 1;
      }
    } else {
      newMonth += 1;
      if (newMonth > 11) {
        newMonth = 0;
        newYear += 1;
      }
    }

    setMonth(newMonth);
    setYear(newYear);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => handlePrevNext('prev')}>
          <Text style={styles.navText}>Prev</Text>
        </TouchableOpacity>
        <Text style={styles.currentDate}>{`${months[month]} ${year}`}</Text>
        <TouchableOpacity onPress={() => handlePrevNext('next')}>
          <Text style={styles.navText}>Next</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={days}
        numColumns={7}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={[
            styles.day,
            item.isCurrentMonth ? styles.currentMonth : styles.otherMonth,
            item.isToday ? styles.today : null
          ]}>
            {item.date}
          </Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  navText: {
    fontSize: 16,
    color: 'blue',
  },
  currentDate: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  day: {
    width: 40,
    height: 40,
    textAlign: 'center',
    lineHeight: 40,
    margin: 2,
  },
  currentMonth: {
    color: 'black',
  },
  otherMonth: {
    color: 'grey',
  },
  today: {
    backgroundColor: 'blue',
    color: 'white',
    borderRadius: 20,
  },
});

export default Progress;
