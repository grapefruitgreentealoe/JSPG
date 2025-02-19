const fs = require("fs");
const path = require("path");

// 파일 입력 처리
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.resolve(__dirname, "input.txt");
const input = fs.readFileSync(filePath, "utf8").trim().split("\n");

const N = parseInt(input.shift(), 10);
const students = input.map((line) => line.split(" ").map(Number));

const directions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

const scores = {
  0: 0,
  1: 1,
  2: 10,
  3: 100,
  4: 1000,
};

function isValid(x, y, n) {
  return x >= 0 && x < n && y >= 0 && y < n;
}

function getSeatsWithFriends(seats, friends, n) {
  let maxLikes = 0;
  let maxEmpty = -1;
  let bestSeats = [];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (seats[i][j] !== null) continue; // 이미 자리가 차 있음

      let likeCount = 0;
      let emptyCount = 0;

      for (const [dx, dy] of directions) {
        //상하좌우에 대해서 (즉 주변 자리를 보는것임.)
        const ni = i + dx;
        const nj = j + dy;
        if (!isValid(ni, nj, n)) continue;

        if (seats[ni][nj] === null) {
          emptyCount++;
        } else if (friends.includes(seats[ni][nj])) {
          //친구면 선호도 높아짐.
          likeCount++;
        }
      }

      //선호도가 최고 선호도보다 높다면 혹은 같고 빈 자리값이 더 크다면.

      if (
        likeCount > maxLikes ||
        (likeCount === maxLikes && emptyCount > maxEmpty) //조건에서 선호도 높은것을 먼저 보는것을 알 수 있다.
      ) {
        maxLikes = likeCount; //근데 선호도가 높은 자리
        maxEmpty = emptyCount; //비어있는 자리.
        bestSeats = [[i, j]]; //베스트
      } else if (likeCount === maxLikes && emptyCount === maxEmpty) {
        bestSeats.push([i, j]); //넣기만 한다.
      }
    }
  }

  return bestSeats;
}

function getSmallestRowColumnSeat(candidateSeats) {
  return candidateSeats.sort((a, b) =>
    a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]
  )[0];
}

function calculateSatisfaction(seats, data, n) {
  let totalSatisfaction = 0;
  const studentMap = new Map(
    data.map((student) => [student[0], student.slice(1)])
  ); //데이터에 대해서 student[0], student 제외한 값. 이것에 대해서 Map 을 하는 이유가 있을까.?
  //빠르게 조회가 가능하다.
  //새로 알게된 문법!

  // 학생에 대해서 , 찾는다.. 그리고 프렌드
  // 학생에 대해서, 맵으로부터 student를 찾는다.

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const student = seats[i][j];
      const friends = studentMap.get(student) || [];
      let count = 0;

      for (const [dx, dy] of directions) {
        const ni = i + dx;
        const nj = j + dy;
        if (isValid(ni, nj, n) && friends.includes(seats[ni][nj])) {
          count++;
        }
      }

      totalSatisfaction += scores[count];
    }
  }

  return totalSatisfaction;
}

function solution(n, data) {
  const seats = Array.from({ length: n }, () => Array(n).fill(null));

  for (let i = 0; i < n * n; i++) {
    const [student, ...friends] = data[i];
    let candidateSeats = getSeatsWithFriends(seats, friends, n); //친구들을 가지고 candidate찾기
    //그 다음에는 가장 주변에 빈자리가 많은 곳 찾기.

    if (candidateSeats.length > 1) {
      candidateSeats = [getSmallestRowColumnSeat(candidateSeats)]; // 열찾기
    }

    let finalSeat = candidateSeats[0];
    seats[finalSeat[0]][finalSeat[1]] = student;
  }

  return calculateSatisfaction(seats, data, n);
}

// 실행 및 결과 출력
console.log(solution(N, students));
