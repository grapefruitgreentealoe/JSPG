const path = require("path");

// 파일 입력 처리
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.resolve(__dirname, "input.txt");

const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");
const N = +input.shift();
const arr = input.map((x) => x.split(" ").map(Number));
for (let i = 0; i < N; i++) {
  if (arr[i * 2][0] == 1) {
    console.log(1);
    continue;
  }
  const [documentLength, currentPos] = arr[i * 2];
  const importanceArr = arr[i * 2 + 1];
  console.log(solution(documentLength, currentPos, importanceArr));
}

/**
 큐 문제임
 shift, push이용
 나머지 문서들 중 현재문서보다 중요도가 높은 것이 있다면, 뒤로 보내버린다!;

 현재 찾고자 하는 문서가 몇번째로 인쇄되는지 알아내기.

 */

/**
 *
 * @param {Number} N : 문서 길이
 * @param {Number} M : 문서의 현 위치(0부터 증가)
 * @param {number[][]} importance : 각 문서의 중요도
 * @returns
 */
function solution(N, M, importance) {
  if (typeof importance == "number") return 1;
  let printMap = importance.map((x, i) => [i, x]);
  let seq = 0;
  //1. 순회한다.
  //2. 순회하면서 나보다 큰 애들이 없다면 프린트.
  //3. 프린트 하는 시점 plus
  //4. 나보다 큰 애들있다면 뒤로 가기.
  //5. 만약 키값이 M인 문서가 프린트되엇을때, 그 문서가 프린트 된 순서 리턴하기.

  while (printMap.length > 0) {
    const nowDocImp = printMap[0][1];

    let isBiggest = true;
    for (let i = 1; i < printMap.length; i++) {
      if (nowDocImp < printMap[i][1]) {
        printMap.push(printMap.shift());
        isBiggest = false;
        break;
        //다시 넣는다.
      }
    }
    if (isBiggest) {
      seq += 1;
      const cur = printMap.shift(); //프린트한다.
      if (cur[0] == M) {
        break;
      }
    }
  }
 
  return seq;
}
