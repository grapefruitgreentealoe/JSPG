function solution2(k, dungeons) {
  let maxVisitCount = 0;
  let visited = Array(dungeons.length).fill(false);
  function dfs(k, visitCount, visited) {
    maxVisitCount = Math.max(maxVisitCount, visitCount);
    for (let i = 0; i < dungeons.length; i++) {
      if (!visited[i] && k >= dungeons[i][0]) {
        visited[i] = true;
        maxVisitCount = Math.max(maxVisitCount, visitCount + 1);
        dfs(k - dungeons[i][1], visitCount + 1, visited);
        visited[i] = false;
      }
    }
  }
  dfs(k, 0, visited);
  return maxVisitCount;
}
// 테스트
console.log(
  solution2(80, [
    [80, 20],
    [50, 40],
    [30, 10],
  ])
); // 3
