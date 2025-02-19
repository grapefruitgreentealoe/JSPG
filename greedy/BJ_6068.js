//시간관리하기
const fs = require("fs");
const path = require("path");

// 파일 입력 처리
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.resolve(__dirname, "input.txt");
const input = fs.readFileSync(filePath, "utf8").trim().split("\n");
const n = input.shift()[0];
const arr = input.map((line) => line.split(" ")).map((x) => x.map(Number));

function solution(n, arr) {
  //가장 늦게까지 해도 되는 것 부터 정하기
  let biggestTime = 0;
  const sortedArr = [...arr]
    .map((x) => [...x])
    .sort((a, b) => b[1] - a[1])
    .map((x) => {
      if (x[1] > biggestTime) biggestTime = x[1];
      return x;
    });

  console.log(sortedArr);
  //-------------------//
  let filledTime = Array.from({ length: biggestTime }, () => null);

  //이 구간안에서 가능한 시간 구하기.
  for (let x = 0; x < n; x++) {
    // console.log(x + 1, sortedArr[x]);
    if (sortedArr[x][0] > sortedArr[x][1]) return -1;
    const lastTime = sortedArr[x][1];

    for (let i = lastTime; i > 0; i--) {
      if (filledTime.slice(i - sortedArr[x][0], i).every((x) => x === null)) {
        filledTime = filledTime.fill(sortedArr[x][0], i - sortedArr[x][0], i);
        break;
      }
      if (i == 1) {
        // 못들어간다고 할때
        return -1;
      }
    }
  }
  console.log(filledTime);
  for (let a = 0; a < biggestTime; a++) {
    if (filledTime[a]) {
      return a;
    }
  }
}

console.log(solution(n, arr));
