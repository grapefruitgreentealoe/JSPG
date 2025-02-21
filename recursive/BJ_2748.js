const fs = require("fs");
const path = require("path");

// 파일 입력 처리
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.resolve(__dirname, "input.txt");
const input = +fs.readFileSync(filePath, "utf8").trim();

function fibonacci(n, memo = {}) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  if (memo[n]) return memo[n]; // 이미 계산된 값이면 반환

  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  console.log(memo[n]);
  return memo[n];
}

// 입력값 테스트
console.log(fibonacci(input));
