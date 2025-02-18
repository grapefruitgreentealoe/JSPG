function solution(info, n, m) {
  var answer = -1;
  //n * m의 배열을 만든다.
  //최대의 경우에 수에 대한 2차원 배열을 만든다.
  let dp = Array.from({ length: n }, () => Array(m).fill(false));
  dp[0][0] = true;

  // 작은 부분 문제부터 차례대로 해결한다. ?
  // a도둑이 적게 훔쳐야하므로 최대한 b도둑이 훔쳐야한다.
  // 따라서 a도둑이 훔쳤을 때 결과값, b도둑이 훔쳣을때 결과값 등을 저장해야한다.
  // dp는 문제의 결과를 저장하고 재사용하여 중복계산을 피하고 효율적으로 문제해결.
  // a가 훔치거나 b가 훔치거나. 방법이 두개이다.
  // but dfs의 경우에는 어제 끝날 지 모른다.
  // 그리고 그 다음 선택지가 정해져있지 않아서 깊은 탐색을 하는것

  //점화식 = 이전값에다가 현재의 info값을 더해서 누적값을 저장한다.
  for (let i = 0; i < info.length; i++) {
    let nextDp = Array.from({ length: n }, () => Array(m).fill(false));
    for (let j = 0; j < n; j++) {
      //a에 대해서
      for (let k = 0; k < m; k++) {
        //b에 대해서
        if (dp[j][k] == false) {
          //더이상 갈 수 없다.
          continue;
          //i까지 끝까지 돌면서! 덮어쓰기 함.
        }

        // a가 i를 훔치는 경우
        let nextA = j + info[i][0];
        let nextB = k;
        if (nextA < n) {
          nextDp[nextA][nextB] = true;
        }

        nextA = j;
        nextB = k + info[i][1];
        if (nextB < m) {
          nextDp[nextA][nextB] = true;
        }
      }
    }
    dp = nextDp; //결과값을 담아준다.
    //이렇게 하면? 마지막까지 갈 수 있는 경우에만 true로 남게된다.(덮어쓰기)
  }

  // 근데 i까지 다 돌았는지는 어떻게 알지
  for (let sumA = 0; sumA < n; sumA++) {
    for (let sumB = 0; sumB < m; sumB++) {
      //만약에 끝까지. 다 돌았을때
      //true값이 있다면 answer에 넣는다.
      //A값이 오름차순으로 증가하면서 그 안에서 B가 먼저 돌기때문에, A의 결과가 최소인 경우의 A값을 담을 수 있다.
      if (dp[sumA][sumB]) {
        answer = sumA;
      }
    }
    if (answer !== -1) break;
  }

  return answer;
}

/**
 * a도둑이 훔치면 info[i][0]만큼, b도둑이 훔치면 info[i][1]만큼 훔친다.
 * n개만큼
 * m만큼 훔칠 수 있다.
 * A가 남기는 흔적의 최솟값
 * 어떤 경로로도 훔칠 수 없다면 -1을 리턴
 */

//2
console.log(
  solution(
    [
      [1, 2],
      [2, 3],
      [2, 1],
    ],
    4,
    4
  )
);

// //0
// solution(
//   [
//     [1, 2],
//     [2, 3],
//     [2, 1],
//   ],
//   1,
//   7
// );

// 0;
// solution(
//   [
//     [3, 3],
//     [3, 3],
//   ],
//   7,
//   1
// );

// //-1
// solution(
//   [
//     [3, 3],
//     [3, 3],
//   ],
//   6,
//   1
// );

//dp는 순서가 어느정도 있다.
