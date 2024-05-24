import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const Calendar = ({
  year,
  month,
  setYear,
  setMonth,
  date,
  onDateSelect,
  selectedDate,
}) => {
  const [days, setDays] = useState([]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

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
        isCurrentMonth: false,
      });
    }

    for (let i = 1; i <= lastDate; i++) {
      const isToday =
        i === date.getDate() &&
        month === new Date().getMonth() &&
        year === new Date().getFullYear();
      daysArray.push({
        date: i,
        isCurrentMonth: true,
        isToday: isToday,
      });
    }

    for (let i = dayEnd; i < 6; i++) {
      daysArray.push({
        date: i - dayEnd + 1,
        isCurrentMonth: false,
      });
    }

    setDays(daysArray);
  };

  const handlePrevNext = (direction) => {
    let newMonth = month;
    let newYear = year;

    if (direction === "prev") {
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

  const handleDateSelect = (day) => {
    onDateSelect(new Date(year, month, day));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => handlePrevNext("prev")}>
          <Text style={styles.navText}>Prev</Text>
        </TouchableOpacity>
        <Text style={styles.currentDate}>{`${months[month]} ${year}`}</Text>
        <TouchableOpacity onPress={() => handlePrevNext("next")}>
          <Text style={styles.navText}>Next</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.weekdaysContainer}>
        {weekdays.map((day, index) => (
          <Text key={index} style={styles.weekday}>
            {day}
          </Text>
        ))}
      </View>
      <View style={styles.calendarContainer}>
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <View key={index} style={styles.calendarRow}>
            {days
              .slice(index * 7, index * 7 + 7)
              .map((item, idx) => {
                const isSelectedDate =
                  selectedDate &&
                  item.isCurrentMonth &&
                  selectedDate.getFullYear() === year &&
                  selectedDate.getMonth() === month &&
                  selectedDate.getDate() === item.date;
                return (
                  <TouchableOpacity
                    key={idx}
                    onPress={() =>
                      handleDateSelect(item.date, item.isCurrentMonth)
                    }
                    disabled={!item.isCurrentMonth}
                  >
                    <Text
                      style={[
                        styles.day,
                        item.isCurrentMonth
                          ? styles.currentMonth
                          : styles.otherMonth,
                        item.isToday ? styles.today : null,
                        isSelectedDate ? styles.selectedDate : null,
                      ]}
                    >
                      {item.date}
                    </Text>
                  </TouchableOpacity>
                );
              })}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
    paddingHorizontal: 20,
  },
  navText: {
    fontSize: 16,
    color: "blue",
  },
  currentDate: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  weekdaysContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 10,
    color: "white",
  },
  weekday: {
    width: 40,
    textAlign: "center",
    color: "white",
  },
  calendarContainer: {
    flexDirection: "column", // Change to column layout
    width: "100%",
  },
  calendarRow: {
    flexDirection: "row", // Change to row layout
    justifyContent: "space-around",
  },
  day: {
    width: 40,
    height: 40,
    lineHeight: 40,
    textAlign: "center",
    color: "white",
    margin: 2,
  },
  currentMonth: {
    color: "white",
  },
  otherMonth: {
    color: "grey",
  },
  today: {
    borderColor: "#7F00FF",
    borderWidth: 2,
    color: "white",
    borderRadius: 20,
    backgroundColor: "transparent",
  },
  selectedDate: {
    backgroundColor: "#7F00FF",
    color: "white",
    borderRadius: 20,
  },
});

export default Calendar;
