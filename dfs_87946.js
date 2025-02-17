function solution(k, dungeons) {
  let maxVisitCount = 0;
  let stack = [[k, 0, Array(dungeons.length).fill(false)]]; // [남은 피로도, 방문한 개수, 방문 배열]

  while (stack.length) {
    let [피로도, count, visited] = stack.pop();
    maxVisitCount = Math.max(maxVisitCount, count);

    for (let i = 0; i < dungeons.length; i++) {
      const [최필피, 소피] = dungeons[i];

      if (!visited[i] && 피로도 >= 최필피) {
        let newVisited = [...visited]; // 기존 방문 기록 복사
        newVisited[i] = true;
        stack.push([피로도 - 소피, count + 1, newVisited]); // 스택에 새로운 상태 추가
      }
    }
  }

  return maxVisitCount;
}

// 테스트
console.log(
  solution(80, [
    [80, 20],
    [50, 40],
    [30, 10],
  ])
); // 3
