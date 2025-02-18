function solution(n, computers) {
  var answer = 0;
  const stack = [];
  const visited = new Array(n).fill(false);

  for (let i = 0; i < n; i++) {
    // n개의 컴퓨너에 대해서 == 끊어져있을 수도 있으니까!
    if (!visited[i]) {
      // 방문하지 않은 컴퓨터에 대해서
      stack.push(i); // 스택에 넣고 방문시키기 처리
      visited[i] = true;

      while (stack.length) {
        //스택에 있는 것에 대해서
        const cur = stack.pop();
        for (let j = 0; j < n; j++) {
          if (computers[cur][j] && !visited[j]) {
            //현재 컴퓨터에 대해서 값이있고 {방문한적 없다면
            stack.push(j); //연결된 컴퓨터 탐색
            visited[j] = true; //방문처리}
          }
        }
      }

      answer++; //연결이 되어있는 것에 대해서 모두 탐색이끝낫으므로
    }
  }
  return answer;
}
