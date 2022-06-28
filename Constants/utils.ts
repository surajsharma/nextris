import { Cur } from "../Constants/interfaces";

export const ROWS = 21;
export const COLS = 14;
export const INIT_LOC = { x: 6, y: 0 };
export const FPS = 10;

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
  let empty_cells: any = [];
  let current_cells: any = [];
  let settled_cells: any = [];

  let hit_cell = false;
  let hit_bottom = false;

  m.forEach((row: [], r: number) => {
    row.forEach((cell, c) => {
      if (cell === 0) {
        empty_cells.push([r, c]);
      } else {
        if (cell === 1) {
          settled_cells.push([r, c])
        } else {
          current_cells.push([r, c]);
        }
      }
    })
  });

  let next_cells = [...current_cells];

  next_cells.forEach((cell, index) => {
    next_cells[index] = [cell[0] + 1, cell[1]];
  });

  next_cells.forEach((cell, index) => {
    hit_cell = (JSON.stringify(settled_cells).includes(JSON.stringify(cell)));
  })


  current_cells.forEach((cell: any) => {
    hit_bottom = cell[0] === ROWS - 1
  })

  return hit_cell || hit_bottom;
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
