import axios from "axios";

export function getExercises(username) {
  return axios
    .get(`https://ovaload-be.onrender.com/api/${username}/exercises`)
    .catch((err) => {
      console.log(err);
    });
}

export function postExercises(username, newExercise) {
  return axios
    .get(`https://ovaload-be.onrender.com/api/${username}/exercises`, {
      newExercise
    })
    .catch((err) => {
      console.log(err);
    });
}

export function getExerciseById(username, exerciseId) {
  return axios
    .get(`https://ovaload-be.onrender.com/api/${username}/${exerciseId}`)
    .catch((err) => {
      console.log(err);
    });
}

export function getExerciseByDate(username, date) {
  return axios
    .get(`https://ovaload-be.onrender.com/api/${username}/exercises/${date}`)
    .then((res) => {
      return res.data.exercisesByDate;
    })
    .catch((err) => {
      console.log(err);
    });
}

export function getPlannedExerciseByDate(username, date) {
  return axios
    .get(
      `https://ovaload-be.onrender.com/api/${username}/plannedExercises/${date}`
    )
    .then((res) => {
      return res.data.plannedExercisesByDate;
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function postPlannedExercise(username, plannedExercises) {
  try {
    const response = await axios.post(`https://ovaload-be.onrender.com/api/${username}/plannedExercises`, 
      plannedExercises, 
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error('Error:', err.response ? err.response.data : err.message);
    throw err;
  }
}

export function patchPlannedExercise(
  username,
  date,
  exerciseName,
  completedChallenge
) {
  return axios
    .patch(
      `https://ovaload-be.onrender.com/api/${username}/plannedExercises/${date}/${exerciseName}`,
      completedChallenge
    )
    .catch((err) => {
      console.log(err);
    });
}

export async function postExerciseStats(username, exerciseName, newExerciseStats) {
  console.log(username, exerciseName, newExerciseStats)
  try {
    const response = await axios.post(`https://ovaload-be.onrender.com/api/${username}/exercises/${exerciseName}`, 
    newExerciseStats, 
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log("from postStat func",response)
    return response.data;
  } catch (err) {
    console.error('Error:', err.response ? err.response.data : err.message);
    throw err;
  }
}

export function patchNewFriendByUsername(username) {
  return axios
    .patch(`https://ovaload-be.onrender.com/api/${username}/`)
    .catch((err) => {
      console.log(err);
    });
}

export function patchLeaderboardScore(username, leaderBoardScore) {
  return axios
    .patch(`https://ovaload-be.onrender.com/api/${username}/leaderboard`, {
      score: leaderBoardScore,
    })
    .catch((err) => {
      console.log(err);
    });
}

export function getAllScores() {
  return axios
    .get("https://ovaload-be.onrender.com/api/leaderboard")
    .catch((err) => {
      console.log(err);
    });
}

export function getFriendsScores(user) {
  return axios
    .get(`https://ovaload-be.onrender.com/api/leaderboard/friends/${user}`)
    .then((response) => {
      return response.data.leaderboardData;
    })
    .catch((err) => {
      console.log(err);
    });
}

export function getChatbotMessage(user) {
  return axios
    .get(`https://ovaload-be.onrender.com/api/chatbot/${user}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
}
