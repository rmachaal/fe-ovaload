import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';

const Calendar = React.memo(({ selectedDate, onDateSelect }) => {
  const today = moment();
  
  const handleDateSelect = (date) => {
    onDateSelect(date);
  };
  const markedDates = useMemo(() => [
    {
      date: today,
      lines:[{color:"#7F00FF"}]
    },
  ], [today]);

  return (
    <View style={styles.container}>
      <CalendarStrip
        calendarHeaderStyle={{ color: "#7F00FF" }}
        daySelectionAnimation={{
          type: "background",
          duration: 200,
          highlightColor: "#7F00FF",
        }}
        style={{ height: 100, width: 370 }}
        calendarHeaderPosition="above"
        onDateSelected={handleDateSelect}
        selectedDate={selectedDate}
        renderDate={(date) => renderCustomDate(date)} 
        markedDates={markedDates}
        dateNumberStyle={{ color: "black" }}
        dateNameStyle={{ color: "black" }}
        highlightDateNumberStyle={{ color: "white" }}
        highlightDateNameStyle={{ color: "white" }}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    alignItems: "center",
  },
});

export default Calendar;