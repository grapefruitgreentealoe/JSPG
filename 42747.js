function right(h, citations) {
  let sol = 0;
  let count = 0;
  for (let x of citations) {
    if (x >= h) {
      count += 1;
    }
  }
  if (count < h) {
    return false;
  }
  for (let x of citations) {
    if (x < h && count < x) {
      return false;
    }
  }

  return true;
}

function solution(citations) {
  let h = 0;
  let max_c = Math.max(...citations);
  let el = 0;

  while (max_c) {
    if (right(el, citations)) {
      h = el;
    }
    el += 1;
    max_c -= 1;
    // console.log("el:", el, "h:", h);
  }

  return h;
}
