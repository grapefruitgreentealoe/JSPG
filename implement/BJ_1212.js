const fs = require("fs");
const path = require("path");

// 파일 입력 처리
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.resolve(__dirname, "input.txt");
const input = fs.readFileSync(filePath, "utf8").trim();

//첫째줄에 주어진 수를 2진수로 변환하여 출력
//수가 0인 경우는 제외하고 반드시 1로 시작.
//8진수를 2진수로 바꾸기.
//각 숫자를 개별적으로 2진수로 변환 가능
// 8로 나눠서 생긴것이다.
//

function solution(number) {
  let ret = "";
  let numberArr = number.split("");
  //number의 각 자리에 대해서 3자리의 2진수로 치환하면 된다.

  for (i = 0; i < numberArr.length; i++) {
    let binaryNumber = getBinaryNumber(numberArr[i]);

    const length = binaryNumber.length;
    for (j = 0; j < 3 - length; j++) {
      if (i !== 0) {
        binaryNumber = "0" + binaryNumber;
      }
    }
    ret += binaryNumber;
  }

  return ret;
}

function getBinaryNumber(number) {
  const ret = Number(number).toString(2);

  return ret;
}
console.log(solution(input));
