/**
 *
 * ROR게임
 *
 * 상대 팀 진영을 먼저 파괴하면 이기는 게임
 * n*m 크기의 맵
 * 캐릭터는 1,1 에 위치해있고, 상대는 n*m에 위치해있음
 *
 * 검은 색 부분은 벽으로 막혀있음. 흰색으로만 갈 수 있음.
 * 캐릭터 움직일 때 동서남북 방향으로 한칸씩 이동
 * 게임맵을 벗어난 길은 갈 수 없다.
 *
 * 상대팀이 자신의팀 진영주변에 벽을 세워 둔 경우 도착 불가할 수 있다.
 *
 * 도착하기 위해 지나가야하는 칸의 개수의 최솟값을 리턴해라.
 * 도착할 수 없으면 -1 리턴
 */

/**
 * 최단거리이므로 BFS.
 * 가까운거부터 차례로 가본다.
 *
 */
function solution(maps) {
  var answer = 0;
  const n = maps.length;
  const m = maps[0].length;
  const shiftWays = [
    [0, 1],
    [1, 0],
    [-1, 0],
    [0, -1],
  ];
  let visited = Array.from({ length: n }, () => Array(m).fill(false));
  let needVisit = [];
  needVisit.push([0, 0, 1]);
  visited[0][0] = true;

  while (needVisit.length !== 0) {
    const [nodeX, nodeY, distance] = needVisit.shift(); //현재 위치.
    //현재 가야하는 곳의 길이만큼, 가장 오래 남아있던 정점을 뽑고, 넣고.

    if (nodeX === n - 1 && nodeY === m - 1) return distance;

    for (let i = 0; i < shiftWays.length; i++) {
      //동서남북에 대해서,
      const nextX = nodeX + shiftWays[i][0];
      const nextY = nodeY + shiftWays[i][1];

      if (
        nextX > -1 &&
        nextX < n &&
        nextY > -1 &&
        nextY < m &&
        maps[nextX][nextY] &&
        !visited[nextX][nextY]
      ) {
        visited[nextX][nextY] = true;
        needVisit.push([nextX, nextY, distance + 1]);
      }
    }
  }
  return -1;
}

console.log(
  solution([
    [1, 0, 1, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1],
    [1, 1, 1, 0, 1],
    [0, 0, 0, 0, 1],
  ]),
  11
);

// console.log(
//   solution([
//     [1, 0, 1, 1, 1],
//     [1, 0, 1, 0, 1],
//     [1, 0, 1, 1, 1],
//     [1, 1, 1, 0, 0],
//     [0, 0, 0, 0, 1],
//   ]) == -1
// );
