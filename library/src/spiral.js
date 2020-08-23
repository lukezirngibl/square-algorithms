const equal = require("./util").equal;

const CORNERS = {
  "bottom-left": [0, 1],
  "bottom-right": [1, 1],
  "top-right": [1, 0],
  "top-left": [0, 0]
};

const nextInSpiral = (corner, type, direction) => (n, length) => {
  const row = n % length;
  const column = (n - row) / length;

  let r;
  let h;

  // get hemisphere
  const half = length / 2 + (1 / 2) * (length % 2);
  if (type === "in" && direction === 1) {
    r = (length % 2) * corner[0];
  }

  if (type === "out" && direction === 1) {
    r = (length % 2) * (1 - corner[0]);
  }

  if (type === "out" && direction === -1) {
    r = (length % 2) * (1 - corner[1]);
  }

  if (type === "in" && direction === -1) {
    r = (length % 2) * corner[1];
  }

  h = [Math.floor((column + r) / half), Math.floor((row + r) / half)];

  if (type === "out" && direction === 1) {
    if (row === column && equal(h, [0, 0]) && equal(corner, [1, 0])) {
      return n - 1;
    }

    if (row === column && equal(h, [1, 1]) && equal(corner, [0, 1])) {
      return n + 1;
    }

    if (
      row === length - column - 1 &&
      equal(h, [0, 1]) &&
      equal(corner, [0, 0])
    ) {
      return n - length;
    }

    if (
      row === length - column - 1 &&
      equal(h, [1, 0]) &&
      equal(corner, [1, 1])
    ) {
      return n + length;
    }
  }

  if (type === "out" && direction === -1) {
    if (row === column && equal(h, [1, 1]) && equal(corner, [1, 0])) {
      return n + length;
    }

    if (row === column && equal(h, [0, 0]) && equal(corner, [0, 1])) {
      return n - length;
    }

    if (
      row === length - column - 1 &&
      equal(h, [1, 0]) &&
      equal(corner, [0, 0])
    ) {
      return n - 1;
    }

    if (
      row === length - column - 1 &&
      equal(h, [0, 1]) &&
      equal(corner, [1, 1])
    ) {
      return n + 1;
    }
  }

  if (type === "in" && direction === 1) {
    if (
      row + 1 === length - column - 1 &&
      equal(h, [1, 0]) &&
      equal(corner, [1, 0])
    ) {
      return n + 1;
    }

    if (row - 1 === column && equal(h, [0, 0]) && equal(corner, [0, 0])) {
      return n + length;
    }

    if (
      row - 1 === length - column - 1 &&
      equal(h, [0, 1]) &&
      equal(corner, [0, 1])
    ) {
      return n - 1;
    }

    if (row + 1 === column && equal(h, [1, 1]) && equal(corner, [1, 1])) {
      return n - length;
    }
  }

  if (type === "in" && direction === -1) {
    if (
      row - 1 === length - column - 1 &&
      equal(h, [1, 0]) &&
      equal(corner, [1, 0])
    ) {
      return n - length;
    }

    if (row + 1 === column && equal(h, [0, 0]) && equal(corner, [0, 0])) {
      return n + 1;
    }

    if (
      row + 1 === length - column - 1 &&
      equal(h, [0, 1]) &&
      equal(corner, [0, 1])
    ) {
      return n + length;
    }

    if (row - 1 === column && equal(h, [1, 1]) && equal(corner, [1, 1])) {
      return n - 1;
    }
  }

  if (direction === 1) {
    if (row === length - column - 1 && equal(h, [1, 0])) {
      return n + 1;
    }

    if (row === column && equal(h, [0, 0])) {
      return n + length;
    }

    if (row === length - column - 1 && equal(h, [0, 1])) {
      return n - 1;
    }

    if (row === column && equal(h, [1, 1])) {
      return n - length;
    }
  }

  if (direction === -1) {
    if (row === length - column - 1 && equal(h, [1, 0])) {
      return n - length;
    }

    if (row === column && equal(h, [0, 0])) {
      return n + 1;
    }

    if (row === length - column - 1 && equal(h, [0, 1])) {
      return n + length;
    }

    if (row === column && equal(h, [1, 1])) {
      return n - 1;
    }
  }

  if (row + column >= length && column < row) return n - length * direction;
  if (row + column >= length && column > row) return n + 1 * direction;
  if (row + column < length && column < row) return n - 1 * direction;
  if (row + column < length && column > row) return n + length * direction;
};

const spiral = (type, c = "bottom-left", d) => async (length, fn) => {
  const sizeOfMap = Math.pow(length, 2);
  let average = Math.floor(sizeOfMap / 2);
  let count = 0;
  let index;

  const direction = d === "cw" ? 1 : -1;

  const corner = CORNERS[c];
  if (type === "in") {
    index = corner[0] * (sizeOfMap - length) + corner[1] * (length - 1);
  }

  if (type === "out") {
    const r = (length - 1) % 2;
    const s = (length - 1) / 2;
    const avg = Math.pow(length, 2) / 2;

    if (r === 0) {
      index = Math.floor(avg);
    } else if (equal(corner, [0, 0])) {
      index = Math.floor(avg - s - 1);
    } else if (equal(corner, [0, 1])) {
      index = Math.floor(avg - s);
    } else if (equal(corner, [1, 0])) {
      index = Math.floor(avg + s);
    } else if (equal(corner, [1, 1])) {
      index = Math.floor(avg + s + 1);
    }
  }

  const next = nextInSpiral(corner, type, direction);

  while (count <= sizeOfMap - 1) {
    await fn(index);
    index = next(index, length, average);
    count += 1;
  }

  return Promise.resolve();
};

module.exports = {
  spiral
};
