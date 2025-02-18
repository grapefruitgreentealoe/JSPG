/**
 * 상어초등학교
 *
 *
 */

function solution(n, data) {
  let firstNum = Math.ceil(n / 2) - 1;
  const seats = Array.from({ length: n }, () => Array(n).fill(null));

  seats[firstNum][firstNum] = data[0][1];
  for (let i = 1; i < Math.pow(n); i++) {}
}

function getSeatsWithFriends(seats, friends) {
  return candidateSeats;
}

function getMostVacantSeats(seats) {
  return candidateSeats;
}

function getSmallestRowColumnSeat(seats) {
  return finalSeat;
}
