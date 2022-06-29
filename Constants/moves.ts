import { Cur } from "../Constants/interfaces";
import { collisionB, collisionL, collisionR, collisionT, COLS, ROWS } from "../Constants/utils";

export const moveDown = (m: any, cur: Cur, updateMatrix: Function) => {
  if (collisionB(m)) return;
  if (!cur) return;
  let n = cur;
  n.posY = (n.posY + 1) % ROWS;
  cur = n;
  updateMatrix();
  // console.log("moved down", cur, n, collisionB(m));

};

export const moveUp = (m: any, cur: Cur, updateMatrix: Function) => {
  if (collisionT(m)) {
    let n = cur;
    n.posY = (n.posY - 1) % ROWS;
    cur = n;
    updateMatrix();
    console.log("moved up", cur, n);
  }
};

export const moveLeft = (m: any, cur: Cur, updateMatrix: Function) => {
  if (collisionL(m)) {
    let n = cur;
    n.posX = n.posX - 1;
    cur = n;
    updateMatrix();
    console.log("moved left", cur, n);
  }
};

export const moveRight = (m: any, cur: Cur, updateMatrix: Function) => {
  if (collisionR(m)) {
    let n = cur;
    n.posX = (n.posX + 1) % COLS;
    cur = n;
    updateMatrix();
    console.log("moved right", cur, n);
  }
};

export const rotate = (m: [any], cur: Cur, updateMatrix: Function) => {
  let n = cur;
  let r = (cur.rot + 90) % 360;
  n.rot = r;
  cur = n;
  updateMatrix();
  console.log("rotated", cur);
};