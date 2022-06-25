export const ROWS = 21;
export const COLS = 14;
export const INIT_LOC = [0, 6];
export const FPS = 1;

export function createAndFillTwoDArray({ rows, columns, defaultValue }: any) {
  let A: any = [];
  for (var i = 0; i < ROWS; i++) {
    A[i] = [];
    for (var j = 0; j < COLS; j++) {
      A[i][j] =
        defaultValue === "random"
          ? Math.random() > 0.5
            ? 1
            : 0
          : defaultValue;
    }
  }
  return A;
}

export function rotate90(matrix: any) {
  // let t = transpose(matrix)
  // return reverse(t)
  return matrix.map((row: any, i: any) =>
    row.map((val: any, j: any) => matrix[matrix.length - 1 - j][i])
  );
}

export function reverse(matrix: any) {
  return matrix.map((row: any) => row.reverse());
}

export function transpose(matrix: [any]) {
  return matrix[0]?.map((col: any, i: any) => matrix.map((row: any) => row[i]));
}

export function collisionR(m: [any]) {
  return transpose(m)[COLS - 1].every((val: any, i: any, arr: any) => val === 0);
}

export function collisionL(m: [any]) {
  return transpose(m)[0].every((val: any, i: any, arr: any) => val === 0);
}

export function collisionB(m: [any]) {
  return m[ROWS - 1].every((val: any, i: any, arr: any) => val === 0);
}

export function collisionT(m: [any]) {
  return m[0].every((val: any, i: any, arr: any) => val === 0);
}
