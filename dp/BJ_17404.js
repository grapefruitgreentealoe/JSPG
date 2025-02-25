const fs = require("fs");
const path = require("path");

// 파일 입력 처리
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.resolve(__dirname, "input.txt");
const input = fs.readFileSync(filePath, "utf8").trim().split("\n");
const n = +input.shift();
const arr = input.map((x) => x.split(" ").map(Number));

/**
 1번집 
 N번집
 i번집

 dp[1] !== dp[2] && dp[1] !== dp[N]
 dp[N] !== dp[N-1] && dp[N] !== dp[1]
 dp[i] !== dp[i-1] && dp[i] !==dp[i+1]  => 근접한 집과 서로 같으면 안된다. 

 */

function solution(N, house) {
  let answer = Infinity;

  for (let first = 0; first < 3; first++) {
    let dp = [];

    let one = first == 0 ? house[0][0] : Infinity;
    let two = first == 1 ? house[0][1] : Infinity;
    let three = first == 2 ? house[0][2] : Infinity;

    // 첫번째 집
    let firstList = [one, two, three];

    dp.push(firstList);

    for (let i = 1; i < N; i++) {
      let line = [];
      // 이전 집과 같은 경우를 제외
      line.push(Math.min(dp[i - 1][1], dp[i - 1][2]) + house[i][0]);
      line.push(Math.min(dp[i - 1][0], dp[i - 1][2]) + house[i][1]);
      line.push(Math.min(dp[i - 1][0], dp[i - 1][1]) + house[i][2]);

      dp.push(line);
    }

    for (let i = 0; i < 3; i++) {
      if (first != i) answer = Math.min(dp[N - 1][i], answer);
    }
  }

  return answer;
}

console.log(solution(n, arr));
