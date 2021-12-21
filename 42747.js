function count(i, citations) {
  let sol = 0;
  let unsol = 0;
  for (let x of citations) {
    if (x > i) {
      sol += 1;
    } else if (x < i) {
      unsol += 1;
    } else if (x == i) {
      sol += 1;
      unsol += 1;
    }
  }
    console.log(sol, unsol, sol >= i && unsol <= i);
  return sol >= i && unsol <= i;
}

function solution(citations) {
  let h = 0;
  for (let i of citations) {
    if (i >= h && count(i, citations)) {
      //h보다 i가 크고 h번이상 인용된 논문이 h편 이상일때
      h = i;
    }
  }
  return h;
}

console.log(solution([7, 6, 5, 4, 3, 2, 1, 0]));
