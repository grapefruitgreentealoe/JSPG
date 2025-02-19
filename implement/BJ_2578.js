const fs = require("fs");
const path = require("path");

// 파일 입력 처리
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.resolve(__dirname, "input.txt");
const input = fs.readFileSync(filePath, "utf8").trim().split("\n");
const arr = input.map((line) => line.split(" ")).map((x) => x.map(Number));

//slice는 복사해서 가져온다.
//splice는 원본배열을 수정한다.
const bingoMap = arr.slice(0, 5);
const callMap = arr.slice(5).flat();

function solution(bingoMap, callMap) {
  let bingoCount = 0;
  //계속 확인해야한다.
  //어떤게 체크되었는지!
  //체크 맵 하나 생성하기
  let checkMap = new Map();
  bingoMap.forEach((x, i) =>
    x.forEach((y, j) => {
      checkMap.set(y, { i, j, isChecked: false });
    })
  );

  //불러주는대로 넣기.
  for (let i = 0; i < callMap.length + 1; i++) {
    checkMap.set(callMap[i], { ...checkMap.get(callMap[i]), isChecked: true });
    //체크후 빙고인지 확인
    console.log(callMap[i]);

    const count = checkBingoCount(checkMap, callMap[i]);
    bingoCount += count;
    console.log("빙고개수", bingoCount);
    if (bingoCount >= 3) return i + 1; //몇번쨰인지.
  }
}

function checkBingoCount(checkMap, num) {
  let bingoCount = 0;
  const { i: corX, j: corY } = checkMap.get(num);
  //checkmap돌면서 기존에 체크된 것들 확인하는데
  // 현재 col값에 대한 체크 확인
  // 왼쪽 대각선 (i,j가 같음)
  // 현재  row값에 대한 체크 확인

  /**
   * 빈배열을 만든다.
   * const tempArr =  Array.from({ length: 5 }, () => Array(5).fill(null));
   * 

   * Map을 순회하면서,
  i,j에 [key,isCheck를 넣는다.]
   */

  //테스트 끝
  const iterableCheckMap = Array.from(checkMap);
  let xCount = 0;
  let xarr = [];
  let yCount = 0;
  let yarr = [];
  let leftCount = 0;
  let leftarr = [];
  let rightCount = 0;
  let rightarr = [];
  for (element of iterableCheckMap) {
    if (element[1]["i"] == corX && element[1]["isChecked"]) {
      xCount += 1;
      xarr.push(element[0]);
    }
    if (element[1]["j"] == corY && element[1]["isChecked"]) {
      yCount += 1;
      yarr.push(element[0]);
    }
    if (
      corX == corY &&
      element[1]["i"] == element[1]["j"] &&
      element[1]["isChecked"]
    ) {
      leftCount += 1;
      leftarr.push(element[0]);
    }
    if (
      corX + corY == 4 &&
      element[1]["i"] + element[1]["j"] == 4 &&
      element[1]["isChecked"]
    ) {
      rightCount += 1;
      rightarr.push(element[0]);
    }
  }

  if (xCount == 5) {
    bingoCount += 1;
    console.log(xarr);
  }
  if (yCount == 5) {
    bingoCount += 1;
    console.log(yarr);
  }
  if (leftCount == 5) {
    bingoCount += 1;
    console.log(leftarr);
  }
  if (rightCount == 5) {
    bingoCount += 1;
    console.log(rightarr);
  }

  return bingoCount;
}

console.log(solution(bingoMap, callMap));
