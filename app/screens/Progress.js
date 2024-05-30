import { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { UserContext } from '../contexts/UserContext';
import Calendar from '../Components/Calendar';
import Challenges from '../Components/Challenges';
import { getExerciseByDate, getPlannedExerciseByDate } from '../../api';

const Progress = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [challenges, setChallenges] = useState([]);
  const { username } = useContext(UserContext);
  
  useEffect(() => {
    let isMounted = true; // flag to check if component is still mounted
    const fetchChallenges = async () => {
      setLoading(true);
      try {
        const data = selectedDate > new Date().setHours(0, 0, 0, 0)
          ? await getPlannedExerciseByDate(username, selectedDate)
          : await getExerciseByDate(username, selectedDate);
        if (isMounted) {
          setChallenges(data);
        }
      } catch (error) {
        console.error("Error fetching challenges:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    fetchChallenges();
    return () => {
      isMounted = false; 
    };
  }, [selectedDate, username]);
  

  return (
    <View style={styles.container}>
      <Calendar
        onDateSelect={setSelectedDate}
        selectedDate={selectedDate}
      />
      <View style={styles.contentContainer}>
        <View style={styles.challengesContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#7F00FF" />
          ) : (
            <Challenges
              navigation={navigation}
              selectedDate={selectedDate}
              challenges={challenges}
              setChallenges={setChallenges}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  challengesContainer: {
    flex: 1,
  },
});

export default Progress;
