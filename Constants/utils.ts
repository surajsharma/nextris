import { Cur } from "./interfaces";

export const ROWS = 21;
export const COLS = 14;
export const INIT_LOC = { x: 6, y: -1 };
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

export function transpose(matrix: any) {
  return matrix[0]?.map((col: any, i: any) => matrix.map((row: any) => row[i]));
}

export function collisionR(m: any) {
  return transpose(m)[COLS - 1]?.every((val: any, i: any, arr: any) => val === 0);
}

export function collisionL(m: any) {
  return transpose(m)[0]?.every((val: any, i: any, arr: any) => val === 0);
}

export function collisionB(m: any) {
  return m[ROWS - 1]?.every((val: any, i: any, arr: any) => val === 0);
}

export function collisionT(m: any) {
  return m[0]?.every((val: any, i: any, arr: any) => val === 0);
}


export const getNextCur = (): Cur => {
  const pieces = ["T", "O", "L", "J", "I", "S", "Z"];
  const rotated = [0, 90, 180, 270];

  return {
    name: pieces[Math.floor(Math.random() * pieces.length)],
    posY: INIT_LOC.y,
    posX: INIT_LOC.x,
    rot: rotated[Math.floor(Math.random() * rotated.length)]
  };
};
