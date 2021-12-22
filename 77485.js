function rotate(arr, top, bottom, left, right) {
  let arr_new = arr.map((v) => v.slice());
  let step;
  for (step = bottom - 1; step >= top; step--) {
    arr_new[step][left] = arr[step + 1][left];
  }

  for (step = left + 1; step <= right; step++) {
    arr_new[top][step] = arr[top][step - 1];
  }

  for (step = top + 1; step <= bottom; step++) {
    arr_new[step][right] = arr[step - 1][right];
  }

  for (step = right - 1; step >= left; step--) {
    arr_new[bottom][step] = arr[bottom][step + 1];
  }
  return arr_new;
}

function mk_arr(rows, columns) {
  let arr = [];
  let in_arr = [];
  let i = 1;
  while (i <= rows) {
    let j = 1;
    in_arr = [];
    while (j <= columns) {
      in_arr.push(rows * (i - 1) + j);
      j += 1;
    }
    arr.push(in_arr);
    i += 1;
    in_arr = [];
  }

  return arr;
}
function get_smalls(arr, i) {
  let colored = [];
  let top = i[0] - 1;
  let bottom = i[2] - 1;
  let left = i[1] - 1;
  let right = i[3] - 1;
  let left_arr = [];
  let right_arr = [];
  for (let step = top; step < bottom + 1; step++) {
    left_arr.push(arr[step][left]);
    right_arr.push(arr[step][right]);
  }
  const ret = colored.concat(
    arr[top].slice(left, right + 1),
    arr[bottom].slice(left, right + 1),
    left_arr,
    right_arr
  );
  const small = Math.min(...ret);
  let new_arr = rotate(arr, top, bottom, left, right);
  return [small, new_arr];
}

function solution(rows, columns, queries) {
  let arr = mk_arr(rows, columns);
  let smalls = [];
  for (let i of queries) {
    let ret = get_smalls(arr, i);
    smalls.push(ret[0]);
    arr = get_smalls(arr, i)[1];
  }

  return smalls;
}
console.log(
  solution(3, 3, [
    [1, 1, 2, 2],
    [1, 2, 2, 3],
    [2, 1, 3, 2],
    [2, 2, 3, 3],
  ])
);
