import axios from "axios";

export function getExercises(username) {
  return axios
    .get(`https://ovaload-be.onrender.com/api/${username}/exercises`)
    .catch((err) => {
      console.log(err);
    });
}

export function postExercises(username, newExerciseName) {
  return axios
    .get(`https://ovaload-be.onrender.com/api/${username}/exercises`, {
      exerciseName: newExerciseName,
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
    .catch((err) => {
      console.log(err);
    });
}

export function getPlannedExerciseByDate(username, date) {
  return axios
    .get(
      `https://ovaload-be.onrender.com/api/${username}/plannedExercises/${date}`
    )
    .catch((err) => {
      console.log(err);
    });
}

export function postPlannedExercise(username, plannedExercise) {
  return axios
    .post(`https://ovaload-be.onrender.com/api/${username}/plannedExercises`, {
      plannedExercise,
    }) /// unsure on this key value pair
    .catch((err) => {
      console.log(err);
    });
}

export function patchPlannedExercise(
  username,
  date,
  exerciseName,
  newPlannedExercise
) {
  return axios
    .patch(
      `https://ovaload-be.onrender.com/api/${username}/plannedExercises/${date}/${exerciseName}`,
      { plannedExercise: newPlannedExercise }
    )
    .catch((err) => {
      console.log(err);
    });
}

export function postExerciseStats(username, exerciseName, newExerciseStats) {
  return axios
    .post(
      `https://ovaload-be.onrender.com/api/${username}/exercises/${exerciseName}`,
      { exerciseStats: newExerciseStats }
    )
    .catch((err) => {
      console.log(err);
    });
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
