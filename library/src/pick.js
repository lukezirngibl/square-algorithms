const doubleForLoop = (length1, length2, start = 0) => fn => {
  for (let i = 0; i < length1; i++) {
    for (let j = start; j < length2; j++) {
      fn(i, j);
    }
  }
};

const pick = (length, conversion) => (type, n = 1, start = 0) => {
  const num = n + start;

  const computeRows = fn => {
    let array = [];
    doubleForLoop(length, num, start)((i, j) => {
      array = [...array, conversion(fn(i, j))];
    });
    return array;
  };

  const computeCorner = fn => {
    let array = [];
    doubleForLoop(num, num, 0)((i, j) => {
      if (i >= start || j >= start) {
        array = [...array, conversion(fn(i, j))];
      }
    });
    return array;
  };

  if (type === "bottom") {
    return computeRows((i, j) => ({ col: i, row: length - 1 - j }));
  }

  if (type === "top") {
    return computeRows((i, j) => ({ col: i, row: j }));
  }

  if (type === "left") {
    return computeRows((i, j) => ({ col: j, row: i }));
  }

  if (type === "right") {
    return computeRows((i, j) => ({ col: length - 1 - j, row: i }));
  }

  if (type == "top-left") {
    return computeCorner((i, j) => ({ col: i, row: j }));
  }

  if (type == "bottom-left") {
    return computeCorner((i, j) => ({ col: i, row: length - 1 - j }));
  }

  if (type == "top-right") {
    return computeCorner((i, j) => ({
      col: length - 1 - i,
      row: j
    }));
  }

  if (type == "bottom-right") {
    return computeCorner((i, j) => ({
      col: length - 1 - i,
      row: length - 1 - j
    }));
  }

  return [];
};

module.exports = {
  pick
};
