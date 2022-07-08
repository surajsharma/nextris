import { Cur } from "../Constants/interfaces";
import { collisionB, collisionL, collisionR, collisionT, COLS, ROWS } from "../Constants/utils";

export const moveDown = (m: any, cur: Cur, updateMatrix: Function) => {
  if (collisionB(m)) return;
  if (!cur) return;
  let n = cur;
  n.posY = (n.posY + 1) % ROWS;
  cur = n;
  updateMatrix();
};

export const moveUp = (m: any, cur: Cur, updateMatrix: Function) => {
  if (collisionT(m)) {
    let n = cur;
    n.posY = (n.posY - 1) % ROWS;
    cur = n;
    updateMatrix();
  }
};

export const moveLeft = (m: any, cur: Cur, updateMatrix: Function) => {
  if (!collisionL(m)) {
    let n = cur;
    n.posX = n.posX - 1;
    cur = n;
    updateMatrix();
  }
};

export const moveRight = (m: any, cur: Cur, updateMatrix: Function) => {
  if (!collisionR(m)) {
    let n = cur;
    n.posX = (n.posX + 1) % COLS;
    cur = n;
    updateMatrix();
  }
};

export const rotate = (m: [any], cur: Cur, updateMatrix: Function) => {
  if (collisionL(m) && collisionR(m) && collisionB(m)) return;
  let n = cur;
  let r = (cur.rot + 90) % 360;
  n.rot = r;
  cur = n;
  updateMatrix();
};