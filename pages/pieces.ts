export const T = (row: number, col: number, rot: number): [any] => {
  const rotationMatrix: any = {
    0: [[row, col], [row + 1, col - 1], [row + 1, col], [row + 1, col + 1]],
    90: [[row, col], [row + 1, col], [row + 2, col], [row + 1, col + 1]],
    180: [[row + 2, col], [row + 1, col - 1], [row + 1, col], [row + 1, col + 1]],
    270: [[row, col], [row + 1, col], [row + 2, col], [row + 1, col - 1]]
  }
  return rotationMatrix[rot];
};

export const O = (row: number, col: number, rot: number): [any] => {
  const rotationMatrix: any = {
    0: [[row, col], [row + 1, col - 1], [row + 1, col], [row + 1, col + 1]],
    90: [[row, col], [row + 1, col], [row + 2, col], [row + 1, col + 1]],
    180: [[row + 2, col], [row + 1, col - 1], [row + 1, col], [row + 1, col + 1]],
    270: [[row, col], [row + 1, col], [row + 2, col], [row + 1, col - 1]]
  }
  return rotationMatrix[rot];
}

export const L = (row: number, col: number, rot: number): [any] => {
  const rotationMatrix: any = {
    0: [[row, col], [row + 1, col - 1], [row + 1, col], [row + 1, col + 1]],
    90: [[row, col], [row + 1, col], [row + 2, col], [row + 1, col + 1]],
    180: [[row + 2, col], [row + 1, col - 1], [row + 1, col], [row + 1, col + 1]],
    270: [[row, col], [row + 1, col], [row + 2, col], [row + 1, col - 1]]
  }
  return rotationMatrix[rot];
}

export const J = (row: number, col: number, rot: number): [any] => {
  const rotationMatrix: any = {
    0: [[row, col], [row + 1, col - 1], [row + 1, col], [row + 1, col + 1]],
    90: [[row, col], [row + 1, col], [row + 2, col], [row + 1, col + 1]],
    180: [[row + 2, col], [row + 1, col - 1], [row + 1, col], [row + 1, col + 1]],
    270: [[row, col], [row + 1, col], [row + 2, col], [row + 1, col - 1]]
  }
  return rotationMatrix[rot];
}

export const S = (row: number, col: number, rot: number): [any] => {
  const rotationMatrix: any = {
    0: [[row, col], [row + 1, col - 1], [row + 1, col], [row + 1, col + 1]],
    90: [[row, col], [row + 1, col], [row + 2, col], [row + 1, col + 1]],
    180: [[row + 2, col], [row + 1, col - 1], [row + 1, col], [row + 1, col + 1]],
    270: [[row, col], [row + 1, col], [row + 2, col], [row + 1, col - 1]]
  }
  return rotationMatrix[rot];
}

export const Z = (row: number, col: number, rot: number): [any] => {
  const rotationMatrix: any = {
    0: [[row, col], [row + 1, col - 1], [row + 1, col], [row + 1, col + 1]],
    90: [[row, col], [row + 1, col], [row + 2, col], [row + 1, col + 1]],
    180: [[row + 2, col], [row + 1, col - 1], [row + 1, col], [row + 1, col + 1]],
    270: [[row, col], [row + 1, col], [row + 2, col], [row + 1, col - 1]]
  }
  return rotationMatrix[rot];
}

export const I = (row: number, col: number, rot: number): [any] => {
  const rotationMatrix: any = {
    0: [[row, col], [row + 1, col - 1], [row + 1, col], [row + 1, col + 1]],
    90: [[row, col], [row + 1, col], [row + 2, col], [row + 1, col + 1]],
    180: [[row + 2, col], [row + 1, col - 1], [row + 1, col], [row + 1, col + 1]],
    270: [[row, col], [row + 1, col], [row + 2, col], [row + 1, col - 1]]
  }
  return rotationMatrix[rot];
}