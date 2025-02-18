function solution(n, computers) {
  var answer = 0;
  const visited = new Array(n).fill(false);

  function dfs(cur) {
    visited[cur] = true; // 현재 노드 방문 처리
    for (let i = 0; i < n; i++) {
      if (computers[cur][i] === 1 && !visited[i]) {
        dfs(i); // 연결된 노드만 방문
      }
    }
  }

  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      dfs(i);
      answer++; // 한 네트워크를 탐색한 후 증가 //끊어져잇을수도 있으니까!
    }
  }

  return answer;
}

// 테스트
console.log(
  solution(
    3,
    [
      [1, 1, 0],
      [1, 1, 0],
      [0, 0, 1],
    ],
    2
  )
); // 3

// 테스트
console.log(
  solution(
    3,
    [
      [1, 1, 0],
      [1, 1, 1],
      [0, 1, 1],
    ],
    1
  )
); // 3
