import { Cur } from "./interfaces";
import { collisionB, collisionL, collisionR, collisionT, COLS, ROWS } from "./utils";

export const moveDown = (m: [any], setCur: Function, cur: Cur, updateMatrix: Function) => {
  if (collisionB(m)) {
    let n = cur;
    n.posX = (n.posX + 1) % ROWS;
    setCur(n);
    updateMatrix();
    console.log("moved down", cur, n);
  }
};

export const moveUp = (m: [any], setCur: Function, cur: Cur, updateMatrix: Function) => {
  if (collisionT(m)) {
    let n = cur;
    n.posX = (n.posX - 1) % ROWS;
    setCur(n);
    updateMatrix();
    console.log("moved up", cur, n);
  }
};

export const moveLeft = (m: [any], setCur: Function, cur: Cur, updateMatrix: Function) => {
  if (collisionL(m)) {
    let n = cur;
    n.posY = n.posY - 1;
    setCur(n);
    updateMatrix();
    console.log("moved left", cur, n);
  }
};

export const moveRight = (m: [any], setCur: Function, cur: Cur, updateMatrix: Function) => {
  if (collisionR(m)) {
    let n = cur;
    n.posY = (n.posY + 1) % COLS;
    setCur(n);
    updateMatrix();
    console.log("moved right", cur, n);
  }
};

export const rotate = (m: [any], setCur: Function, cur: Cur, updateMatrix: Function) => {
  let n = cur;
  let r = (cur.rot + 90) % 360;
  n.rot = r;
  setCur(n);
  updateMatrix();
  console.log("rotated", cur);
};