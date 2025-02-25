const fs = require("fs");
const path = require("path");

// 파일 입력 처리
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.resolve(__dirname, "input.txt");
const input = +fs.readFileSync(filePath, "utf8").trim();

function countWaysToPay(N) {
  const MOD = 123456789;

  // 1. 에라토스테네스의 체로 2~N까지의 소수 구하기
  function getPrimes(limit) {
    const isPrime = Array(limit + 1).fill(true);
    isPrime[0] = isPrime[1] = false; // 0과 1은 소수가 아님
    for (let i = 2; i * i <= limit; i++) {
      if (isPrime[i]) {
        for (let j = i * i; j <= limit; j += i) {
          isPrime[j] = false;
        }
      }
    }
    return Array.from({ length: limit + 1 }, (_, i) => i).filter(
      (i) => isPrime[i]
    );
  }

  const primes = getPrimes(N);
  const dp = Array(N + 1).fill(0);
  dp[0] = 1; // 0원을 만드는 방법은 아무것도 사용하지 않는 경우

  // 2. DP로 경우의 수 계산
  for (const prime of primes) {
    for (let j = prime; j <= N; j++) {
      dp[j] = (dp[j] + dp[j - prime]) % MOD; //이게 되는 경우의 수는 현재에 현재 
    }
  }

  return dp[N];
}

// 예제 실행
console.log(countWaysToPay(input)); // 3
