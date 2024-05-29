import React from "react";
import { View, Text, StyleSheet, Dimensions, FlatList } from "react-native";
import { LineChart } from "react-native-chart-kit";

const formatExerciseName = (name) => {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString(undefined, { day: 'numeric', month: 'numeric' });
};

const IndividualExercise = ({ route }) => {
  const { exercise } = route.params;

  // Sort the exerciseStats array for the chart in ascending order
  const sortedStatsForChart = [...exercise.exerciseStats].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  // Sort the exerciseStats array for the list in descending order
  const sortedStatsForList = [...exercise.exerciseStats].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const renderStatItem = ({ item }) => (
    <View style={styles.statItem}>
      <View>
        <Text style={styles.text}>Weight</Text>
        <Text style={styles.text2}>{item.weightKg}kg</Text>
      </View>
      <View>
        <Text style={styles.text}>Sets</Text>
        <Text style={styles.text2}>{item.sets}</Text>
      </View>
      <View>
        <Text style={styles.text}>Reps</Text>
        <Text style={styles.text2}>{item.reps}</Text>
      </View>
      <View>
        <Text style={styles.text}>Date</Text>
        <Text style={styles.text2}>{new Date(item.createdAt).toLocaleDateString()}</Text>
      </View>
    </View>
  );

  const renderCardioStatItem = ({ item }) => (
    <View style={styles.statItem}>
      <View>
        <Text style={styles.text}>Time</Text>
        <Text style={styles.text2}>{item.timeMin} min</Text>
      </View>
      <View>
        <Text style={styles.text}>Distance</Text>
        <Text style={styles.text2}>{item.distanceKm} km</Text>
      </View>
      <View>
        <Text style={styles.text}>Date</Text>
        <Text style={styles.text2}>{new Date(item.createdAt).toLocaleDateString()}</Text>
      </View>
    </View>
  );

  const chartData = {
    labels: sortedStatsForChart.map((stat) => formatDate(stat.createdAt)),
    datasets: [
      {
        data: sortedStatsForChart.map((stat) => exercise.exerciseType === "cardio" ? stat.distanceKm : stat.weightKg),
      },
    ],
  };

  const yAxisSuffix = exercise.exerciseType === "cardio" ? "km" : "kg";

  return (
    <FlatList
      ListHeaderComponent={
        <>
          <LineChart
            data={chartData}
            width={Dimensions.get("window").width - 40}
            height={220}
            yAxisLabel=""
            yAxisSuffix={yAxisSuffix}
            yAxisInterval={1}
            chartConfig={{
              backgroundColor: "rgba(255, 255, 255, 1)",
              backgroundGradientFrom: "rgba(255, 255, 255, 1)",
              backgroundGradientTo: "rgba(255, 255, 255, 1)",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(127, 0, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "5",
                strokeWidth: "1",
                stroke: "rgba(255, 255, 255, 1)",
              },
              propsForLabels: {
                fontWeight: 600,
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
          <Text style={styles.title}>{formatExerciseName(exercise.exerciseName)}</Text>
        </>
      }
      data={sortedStatsForList}
      keyExtractor={(item, index) => index.toString()}
      renderItem={exercise.exerciseType === "cardio" ? renderCardioStatItem : renderStatItem}
      contentContainerStyle={styles.contentContainer}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 20,
    alignItems: "center",
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 20,
    marginTop: 20,
    color: "#7F00FF",
  },
  statItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 375,
    marginBottom: 10,
    backgroundColor: "rgba(189, 181, 213, 0.25)",
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  text: {
    fontSize: 15,
    justifyContent: "space-around",
    paddingBottom: 5,
  },
  text2: {
    fontSize: 20,
    fontWeight: "600",
    color: "#7F00FF",
  },
});

export default IndividualExercise;