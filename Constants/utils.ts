
import { useEffect, useRef } from "react";
import { Cur } from "../Constants/interfaces";

export const ROWS = 20;
export const COLS = 15;
export const INIT_LOC = { x: 6, y: 0 };

export function createAndFillTwoDArray({ rows, columns, defaultValue }: any) {
  let A: any = [];
  for (let i = 0; i < ROWS; i++) {
    A[i] = [];
    for (let j = 0; j < COLS; j++) {
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
  let empty_cells: any = [];
  let current_cells: any = [];
  let settled_cells: any = [];

  let hit_cell = false;
  let hit_right = false;

  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      let cell = m[i][j];
      if (cell === 0) {
        empty_cells.push([i, j]);
      } else {
        if (cell === 1) {
          settled_cells.push([i, j])
        } else {
          current_cells.push([i, j]);
        }
      }
    }
  }

  let next_cells = [...current_cells];

  for (let i = 0; i < next_cells.length; i++) {
    next_cells[i] = [next_cells[i][0] + 1, next_cells[i][1] + 1]
    hit_cell = (JSON.stringify(settled_cells).indexOf(JSON.stringify(next_cells[i]))) === -1 ? false : true;

    if (next_cells[i][1] === COLS) hit_right = true;
    if (hit_cell || hit_right)
      break;
  }
  return hit_cell || hit_right;
}

export function collisionL(m: any) {
  let empty_cells: any = [];
  let current_cells: any = [];
  let settled_cells: any = [];

  let hit_cell = false;
  let hit_left = false;

  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      let cell = m[i][j];
      if (cell === 0) {
        empty_cells.push([i, j]);
      } else {
        if (cell === 1) {
          settled_cells.push([i, j])
        } else {
          current_cells.push([i, j]);
        }
      }
    }
  };

  let next_cells = [...current_cells];

  for (let i = 0; i < next_cells.length; i++) {
    next_cells[i] = [next_cells[i][0] + 1, next_cells[i][1] - 1]
    hit_cell = (JSON.stringify(settled_cells).indexOf(JSON.stringify(next_cells[i]))) === -1 ? false : true;

    if (next_cells[i][1] === -1) hit_left = true;
    if (hit_cell || hit_left)
      break;
  }
  return hit_cell || hit_left;
}

export function collisionB(m: any) {
  let empty_cells: any = [];
  let current_cells: any = [];
  let settled_cells: any = [];

  let hit_cell = false;
  let hit_bottom = false;

  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      let cell = m[i][j];
      if (cell === 0) {
        empty_cells.push([i, j]);
      } else {
        if (cell === 1) {
          settled_cells.push([i, j])
        } else {
          current_cells.push([i, j]);
        }
      }
    }
  };

  let next_cells = [...current_cells];

  for (let i = 0; i < next_cells.length; i++) {
    next_cells[i] = [next_cells[i][0] + 1, next_cells[i][1]]
    hit_cell = (JSON.stringify(settled_cells).indexOf(JSON.stringify(next_cells[i]))) === -1 ? false : true;
    if (hit_cell)
      break;
  }

  for (let i = 0; i < current_cells.length; i++) {
    hit_bottom = current_cells[i][0] === ROWS - 1
    if (hit_bottom) break;
  }

  return hit_cell || hit_bottom;
}

export function collisionT(m: any) {
  return m[0]?.some((val: any, i: any, arr: any) => val === 1);
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


export const setAcceleratingTimeout = (callback: Function, factor: number) => {
  let internalCallback = function (score) {
    return function () {
      setTimeout(internalCallback, factor / ++score);
      callback();
    }
  }(0);

  return setTimeout(internalCallback, factor);
};


export const useSwipe = ({ left, right, up, down }: { left?: () => void; right?: () => void; up?: () => void; down?: () => void; }) => {
  const touchCoordsRef = useRef({ touchStart: { x: 0, y: 0, time: Date.now() } });
  const fnsRef = useRef({ up, down, left, right });
  fnsRef.current = {
    up,
    left,
    down,
    right,
  };
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchCoordsRef.current.touchStart.x = e.targetTouches[0].clientX;
      touchCoordsRef.current.touchStart.y = e.targetTouches[0].clientY;
      touchCoordsRef.current.touchStart.time = Date.now();
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const threshold = 10;
      const swipeSpeed = 2; // sec;
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const touchStartX = touchCoordsRef.current.touchStart.x;
      const touchStartY = touchCoordsRef.current.touchStart.y;
      const elapsedTime = (Date.now() - touchCoordsRef.current.touchStart.time) / 1000;
      if (elapsedTime > swipeSpeed) {
        return;
      }
      const xDistance = touchStartX - touchEndX;
      const yDistance = touchStartY - touchEndY;

      if (Math.abs(xDistance) < threshold && Math.abs(yDistance) < threshold) {
        return;
      }

      if (Math.abs(xDistance) >= Math.abs(yDistance)) {
        xDistance > 0 ? fnsRef.current.right?.() : fnsRef.current.left?.();
      } else {
        yDistance > 0 ? fnsRef.current.down?.() : fnsRef.current.up?.();
      }
    };
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  });
};