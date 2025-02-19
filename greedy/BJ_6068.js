const input = require("fs")
  .readFileSync("input.txt")
  .toString()
  .trim()
  .split("\n");
const N = +input[0];

function sol(works) {
  let answer = Infinity;

  //
  let t = 0;
  for (let i = 0; i < works.length; i++) {
    let [time, deadline] = works[i]; //소요시간, 데드라인
    t += time; // 시간을 더한다 토탈시간.
    if (t > deadline) return console.log((answer = -1)); //데드라인보다 t가 크가면 리턴
    if (answer > deadline - t) answer = deadline - t; //데드라인에서 총 소요시간 빼기. 근데 중간에 채워져있는건 어떻게 알지.
    //그냥 총 소요시간을 빼도 괜찮은 이유?
    // 데드라인이 빠른 순부터 진행하기 때문에. 현재 t가 가장 빨리시작할수있는 시작점이 되게 때문이다.
  }
  return console.log(answer);
}
function main() {
  let works = input.slice(1).map((_) => _.split(" ").map(Number)); // 필요시간, 마감시간.
  works.sort((a, b) => {
    let A = a[1];
    let B = b[1];
    if (A < B) return -1;
    else if (A > B) return 1; //오름차순 정리
    return 0;
  });
  sol(works); //오름차순정리된것에 대해서.
}
main();
