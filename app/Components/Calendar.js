import { useState, useEffect } from "react";
import { View, StyleSheet} from "react-native";
import CalendarStrip from "react-native-calendar-strip";

const Calendar = ({
  selectedDate,
  onDateSelect,
}) => {

  const today = new Date();
  
  const handleDateSelect = (date) => {
    onDateSelect(new Date(date));
  };

  const markedDates = [
    {
      date: today,
      customStyles: {
        container: {
          borderColor: "#7F00FF",
          borderWidth: 2,
          borderRadius: 20,
        },
        text: {
          color: "black",
          fontWeight: "bold",
        },
      },
    },
  ];

  return (
    <View style={styles.container}>
      <CalendarStrip
        calendarHeaderStyle={{ color: "#7F00FF" }}
        daySelectionAnimation={{
          type: "background",
          duration: 200,
          highlightColor: "#7F00FF",
        }}
        style={{ height: 100, width: 380 }}
        calendarHeaderPosition="above"
        onDateSelected={handleDateSelect}
        selectedDate={selectedDate}
        markedDates={markedDates}
        dateNumberStyle={{ color: "black" }}
        dateNameStyle={{ color: "black" }}
        highlightDateNumberStyle={{ color: "white" }}
        highlightDateNameStyle={{ color: "white" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    alignItems: "center",
  },
  navText: {
    fontSize: 16,
    color: "#8F87A1",
  },
  currentDate: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#7F00FF",
  },
});

export default Calendar;