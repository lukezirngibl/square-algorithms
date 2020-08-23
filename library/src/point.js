const equal = require("./util").equal;

const CORNERS = {
  "bottom-left": [0, 1],
  "bottom-right": [1, 1],
  "top-right": [1, 0],
  "top-left": [0, 0]
};

const nextInCorn = (corner, alternate) => (index, length) => {
  const startColumn = corner[0] * (length - 1);
  const startRow = corner[1] * (length - 1);

  const row = index % length;
  const column = (index - row) / length;

  const diffRow = Math.abs(startRow - row);
  const diffColumn = Math.abs(startColumn - column);

  if (equal(corner, [1, 1]) && !alternate) {
    if (diffRow < diffColumn) {
      return index - 1;
    }

    if (diffColumn === 0) {
      return (length - diffRow - 1) * length - 1;
    }

    if (diffColumn <= diffRow) {
      return index + length;
    }
  }

  if (equal(corner, [0, 0]) && !alternate) {
    if (diffRow < diffColumn) {
      return index + 1;
    }

    if (diffColumn === 0) {
      return (diffRow + 1) * length;
    }

    if (diffColumn <= diffRow) {
      return index - length;
    }
  }

  if (equal(corner, [1, 0]) && !alternate) {
    if (diffColumn < diffRow) {
      return index - length;
    }

    if (diffRow === 0) {
      return (length - 1) * length + diffColumn + 1;
    }

    if (diffRow <= diffColumn) {
      return index - 1;
    }
  }

  if (equal(corner, [0, 1]) && !alternate) {
    if (diffColumn < diffRow) {
      return index + length;
    }

    if (diffRow === 0) {
      return length - diffColumn - 2;
    }

    if (diffRow <= diffColumn) {
      return index + 1;
    }
  }

  if (equal(corner, [1, 1]) && alternate) {
    if (diffRow > diffColumn) {
      return (
        index - (diffRow - diffColumn) * length + (diffRow - diffColumn) - 1
      );
    }

    if (diffColumn === diffRow) {
      return index - length + diffRow;
    }

    if (diffRow < diffColumn) {
      return index + (diffColumn - diffRow) * length - (diffColumn - diffRow);
    }
  }

  if (equal(corner, [0, 0]) && alternate) {
    if (diffRow > diffColumn) {
      return (
        index + (diffRow - diffColumn) * length - (diffRow - diffColumn - 1)
      );
    }

    if (diffColumn === diffRow) {
      return index + length - diffRow;
    }

    if (diffRow < diffColumn) {
      return index - (diffColumn - diffRow) * length + (diffColumn - diffRow);
    }
  }

  if (equal(corner, [1, 0]) && alternate) {
    if (diffRow > diffColumn) {
      return (
        index - (diffRow - diffColumn) * length - (diffRow - diffColumn - 1)
      );
    }

    if (diffColumn === diffRow) {
      return index - length - diffRow;
    }

    if (diffRow < diffColumn) {
      return index + (diffColumn - diffRow) * length + (diffColumn - diffRow);
    }
  }

  if (equal(corner, [0, 1]) && alternate) {
    if (diffRow > diffColumn) {
      return index + (diffRow - diffColumn) * length + (diffRow - diffColumn);
    }

    if (diffColumn === diffRow) {
      return index - length * diffRow - 1;
    }

    if (diffRow < diffColumn) {
      return (
        index - (diffColumn - diffRow - 1) * length - (diffColumn - diffRow)
      );
    }
  }
};

const point = (c = "bottom-left", alternate = false) => async (length, fn) => {
  const sizeOfMap = Math.pow(length, 2);
  let count = 0;
  let index;

  const corner = CORNERS[c];

  index = length * (length - 1) * corner[0] + (length - 1) * corner[1];

  const next = nextInCorn(corner, alternate);

  while (count <= sizeOfMap - 1) {
    await fn(index);
    index = next(index, length);
    count += 1;
  }

  return Promise.resolve();
};

module.exports = {
  point
};
