function rotate(arr, top, bottom, left, right) {
  let arr_new = arr;
  for (let step = bottom - 1; step >= top; step--) {
    arr_new[step][left] = arr[step + 1][left];
  }
  console.log(arr_new[2][left]);
  for (let step = left + 1; step <= right; step++) {
    arr_new[top][step] = arr[top][step + 1];
  }

  for (let step = top + 1; step <= bottom; step++) {
    arr_new[step][right] = arr[step - 1][right];
  }
  for (let step = right - 1; step >= left; step--) {
    arr_new[bottom][step] = arr[bottom][step - 1];
  }
}

function mk_arr(rows, columns) {
  let arr = [];
  let in_arr = [];
  let i = 1;
  while (i <= rows) {
    let j = 1;
    in_arr = [];
    while (j <= columns) {
      in_arr.push(6 * (i - 1) + j);
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
  return small, new_arr;
}

function solution(rows, columns, queries) {
  let arr = mk_arr(rows, columns);
  smalls = [];
  for (i of queries) {
    smalls.push(get_smalls(arr, i));
  }
  return smalls;
}

console.log(
  solution(6, 6, [
    [2, 2, 5, 4],
    [3, 3, 6, 6],
    [5, 1, 6, 3],
  ])
);
