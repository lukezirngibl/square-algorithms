const equal = require("./util").equal;

const SIDES = {
  left: [0, 0],
  right: [1, 1],
  top: [1, 0],
  bottom: [0, 1]
};

const nextInLine = side => (index, length) => {
  const row = index % length;
  const column = (index - row) / length;

  const remainder = index % length;
  const isRemainderEven = remainder % 2 === 0;

  if (equal(side, [0, 0])) {
    if (isRemainderEven) {
      const next = length - remainder - 2;
      if (next <= 0) {
        if (length % 2 === 0) {
          return index - length + 3;
        } else {
          return index - length + 2;
        }
      } else {
        return index + 2;
      }
    } else {
      const next = length - remainder - 2;
      if (next < 0) {
        if (length % 2 === 0) {
          return index + 1;
        } else {
          return index + 1;
        }
      } else {
        return index + 2;
      }
    }
  }

  if (equal(side, [1, 1])) {
    if (isRemainderEven) {
      if (row - 2 < 0) {
        if (length % 2 === 0) {
          return index - 1;
        } else {
          return index + length - 2;
        }
      } else {
        return index - 2;
      }
    } else {
      if (row - 2 < 0) {
        if (length % 2 === 0) {
          return index + length - 3;
        } else {
          return index - 2;
        }
      } else {
        return index - 2;
      }
    }
  }

  if (equal(side, [0, 1])) {
    if (column % 2 === 0) {
      if (column + 2 > length - 1) {
        if (length % 2 === 0) {
          return index - (length - 3) * length;
        } else {
          return index - (length - 2) * length;
        }
      } else {
        return index + length * 2;
      }
    } else {
      if (column + 2 > length - 1) {
        if (length % 2 === 0) {
          return index - (length - 1) * length - 1;
        } else {
          return index - (length - 2) * length - 1;
        }
      } else {
        return index + length * 2;
      }
    }
  }

  if (equal(side, [1, 0])) {
    if (column % 2 === 0) {
      if (column - 2 < 0) {
        if (length % 2 === 0) {
          return index + (length - 1) * length + 1;
        } else {
          return index + (length - 2) * length;
        }
      } else {
        return index - length * 2;
      }
    } else {
      if (column - 2 < 0) {
        if (length % 2 === 0) {
          return index + (length - 3) * length;
        } else {
          return index + (length - 2) * length + 1;
        }
      } else {
        return index - length * 2;
      }
    }
  }
};

const line = (s = "bottom", alternate = false) => async (length, fn) => {
  const sizeOfMap = Math.pow(length, 2);
  let count = 0;
  let index;

  const side = SIDES[s];

  index = length * (length - 1) * side[0] + (length - 1) * side[1];

  const next = nextInLine(side);

  while (count <= sizeOfMap - 1) {
    await fn(index);
    index = next(index, length);
    count += 1;
  }

  return Promise.resolve();
};

module.exports = {
  line
};
