const equal = require("./util").equal;

const CORNERS = {
  "bottom-left": [0, 1],
  "bottom-right": [1, 1],
  "top-right": [1, 0],
  "top-left": [0, 0]
};

const nextInCorn = (corner, alternate) => (index, length) => {
  const cornerColumn = corner[0] * (length - 1);
  const cornerRow = corner[1] * (length - 1);

  const row = index % length;
  const column = (index - row) / length;

  const diffRow = Math.abs(cornerRow - row);
  const diffColumn = Math.abs(cornerColumn - column);

  if (equal(corner, [0, 0])) {
    if (column === row) {
      if ((length - diffRow) % 2 === 0) {
        return index + (length - diffRow - 1);
      } else {
        return index + (length - diffRow - 2);
      }
    }

    if (diffRow > diffColumn) {
      return diffRow * length + diffColumn;
    }

    if (diffColumn >= diffRow) {
      if (column - diffRow - 2 >= 0) {
        return diffRow * length + length - (length - diffColumn) - 2;
      } else {
        if ((length - diffRow) % 2 === 0) {
          return index + (length - diffRow) - 1;
        } else {
          return index + length - 1 - diffRow - 1;
        }
      }
    }
  }

  if (equal(corner, [1, 0])) {
    if (column === length - row - 1) {
      if ((length - diffRow) % 2 === 0) {
        return row;
      } else {
        return length + row;
      }
    }

    if (diffColumn > diffRow) {
      return (length - diffRow - 1) * length + diffColumn;
    }

    if (diffRow >= diffColumn) {
      if (row - diffColumn - 2 >= 0) {
        return (length - diffRow + 1) * length + diffColumn;
      } else {
        if ((length - diffRow) % 2 === 0) {
          return length + row;
        } else {
          return row;
        }
      }
    }
  }

  if (equal(corner, [1, 1])) {
    if (row === column) {
      if ((length - diffRow) % 2 === 0) {
        return index - (length - diffRow - 1);
      } else {
        return index - (length - diffRow - 2);
      }
    }

    if (diffRow > diffColumn) {
      return (row + 1) * length - 1 - diffColumn;
    }

    if (diffColumn >= diffRow) {
      if (column + 2 + diffRow < length) {
        return (length - diffRow - 1) * length + (length - diffColumn + 1);
      } else {
        if ((length - diffRow) % 2 === 0) {
          return index - (length - diffRow - 1);
        } else {
          return index - (length - diffRow - 2);
        }
      }
    }
  }

  if (equal(corner, [0, 1])) {
    if (row === length - column - 1) {
      if ((length - diffRow) % 2 === 0) {
        return index + length * (length - diffRow - 1);
      } else {
        return index + length * (length - diffRow - 2);
      }
    }

    if (diffColumn > diffRow) {
      return length - column - 1 + diffRow * length;
    }

    if (diffRow >= diffRow) {
      if (row + 2 + diffColumn < length) {
        return (diffRow - 1) * length - diffColumn - 1;
      } else {
        if ((length - diffRow) % 2 === 0) {
          return index + length * (length - diffRow - 1);
        } else {
          return index + length * (length - diffRow);
        }
      }
    }
  }
};

const angle = (c = "bottom-left", alternate = false) => async (length, fn) => {
  const sizeOfMap = Math.pow(length, 2);
  let count = 0;
  let index;

  const corner = CORNERS[c];

  index = length * (length - 1) * corner[0] + (length - 1) * corner[1];

  if (equal(corner, [0, 0])) {
    if (length % 2 === 0) {
      index = length - 2;
    } else {
      index = length - 1;
    }
  }

  if (equal(corner, [1, 0])) {
    if (length % 2 === 0) {
      index = length;
    } else {
      index = 0;
    }
  }

  if (equal(corner, [1, 1])) {
    if (length % 2 === 0) {
      index = index - length + 2;
    } else {
      index = index - length + 1;
    }
  }

  if (equal(corner, [0, 1])) {
    if (length % 2 === 0) {
      index = length * (length - 1) - 1;
    } else {
      index = length * length - 1;
    }
  }

  const next = nextInCorn(corner, alternate);

  while (count <= sizeOfMap - 1) {
    await fn(index);
    index = next(index, length);
    count += 1;
  }

  return Promise.resolve();
};

module.exports = {
  angle
};
