/**
 * 상어초등학교
 *
 *
 */

function solution(n, data) {
  let firstNum = Math.ceil(n / 2) - 1;
  const seats = Array.from({ length: n }, () => Array(n).fill(null));
  let candidateSeats = []; //좌표값 배열.

  seats[firstNum][firstNum] = data[0][0]; //초기값으로, 가장가운데에 앉혀준다.
  for (let i = 1; i < Math.pow(n, 2); i++) {
    //한자리씩 돌아가면서.
    //한명씩 돌아가면서 앉힐건데..
    //1. 비어있는 칸 중 좋아하는 학생이 인접한 칸이 가장 많은 칸
    candidateSeats = Array.from(
      getSeatsWithFriends(seats, [...data[i]].slice(1), n)
    ).map((x) => x.split(",").map(Number));
    //2. 1을 만족하는 칸이 여러칸일 때,
    if (candidateSeats.length > 1) {
      //현재 후보에 있는 걸 넘겨줘야할듯.
      candidateSeats = getMostVacantSeats(seats, candidateSeats, n);
    }

    //주변에 비어있는 칸이 많은 칸
    //3. 2가 여러개일 경우, 행의 번호가 가장 작은 칸. 열의 번호가 가장 작은 칸. 즉 왼쪽 위.

    if (candidateSeats.length > 1) {
      candidateSeats = getSmallestRowColumnSeat(candidateSeats, n);
    }

    if (candidateSeats.length == 0) {
      for (a = 0; a < n; a++) {
        for (b = 0; b < n; b++) {
          if (seats[a][b] === null) candidateSeats.push([a, b]);
        }
      }
    }

    let finalSeat = candidateSeats[0];
    //seats에 넣어줘서 자리를 앉힌다.
    if (finalSeat) {
      seats[finalSeat[0]][finalSeat[1]] = data[i][0];
    }
  }
  console.log("fin", seats);
  // 4. 만족도를 계산
  //
}

function returnAvailableSeat(seats, n, i, j) {
  let ret = [];
  if (i + 1 < n) ret.push([i + 1, j]);
  if (i - 1 >= 0) ret.push([i - 1, j]);
  if (j + 1 < n) ret.push([i, j + 1]);
  if (j - 1 >= 0) ret.push([i, j - 1]);
  ret = ret.filter(([x, y]) => seats[x][y] === null); // 사람이 없는 경우에만 넣어준다.
  return ret;
}
function getSeatsWithFriends(seats, friends, n) {
  //자리 맵과 친구들이 있을 때,
  //친구가 많이 모여있는 자리를 찾는다.
  //단, 값이 겹치는 경우가 있기 때문에, set을 쓴다.
  const candidateSeats = new Set();

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (friends.includes(seats[i][j])) {
        const availableSeat = returnAvailableSeat(seats, n, i, j);
        availableSeat.forEach(([x, y]) => {
          candidateSeats.add(`${x},${y}`);
        });
      }
    }
  }
  return candidateSeats;
}
function getMostVacantSeats(seats, candidateSeats, n) {
  let mostVacantseatsNumber = 0;
  let ret = [];
  for (let i = 0; i < candidateSeats.length; i++) {
    const aroundSeats = returnAvailableSeat(seats, n, ...candidateSeats[i]);
    if (aroundSeats.length > mostVacantseatsNumber) {
      ret = [candidateSeats[i]];
      mostVacantseatsNumber = aroundSeats.length;
    } else if (aroundSeats.length == mostVacantseatsNumber) {
      ret.push(candidateSeats[i]);
    }
  }

  return ret;
}

function getSmallestRowColumnSeat(candidateSeats) {
  candidateSeats.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  return [candidateSeats[0]];
}

function calculateSatisfaction(seats, friends) {
  //인접한 친구수가 0 ->0
  // 1->1
  // 2->10
  //3->100
  //4->1000
  return totalSatisfaction;
}

solution(3, [
  [4, 2, 5, 1, 7],
  [3, 1, 9, 4, 5],
  [9, 8, 1, 2, 3],
  [8, 1, 9, 3, 4],
  [7, 2, 3, 4, 8],
  [1, 9, 2, 5, 7],
  [6, 5, 2, 3, 4],
  [5, 1, 9, 2, 8],
  [2, 9, 3, 1, 4],
]);

solution(3, [
  [4, 2, 5, 1, 7],
  [2, 1, 9, 4, 5],
  [5, 8, 1, 4, 3],
  [1, 2, 9, 3, 4],
  [7, 2, 3, 4, 8],
  [9, 8, 4, 5, 7],
  [6, 5, 2, 3, 4],
  [8, 4, 9, 2, 1],
  [3, 9, 2, 1, 4],
]);
