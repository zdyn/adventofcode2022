export const fns = {
  "Part 1": (input) => {
    const grid = parse(input);
    let result = 0;
    grid.forMatrix((tree, i, j) => {
      const views = getViews(grid, i, j);
      if (views.some((view) => view.every((h) => h < tree))) {
        result++;
      }
    });
    return result;
  },
  "Part 2": (input) => {
    const grid = parse(input);
    let result = 0;
    grid.forMatrix((tree, i, j) => {
      const views = getViews(grid, i, j);
      result = Math.max(
        result,
        views.reduce((agg, view) => {
          const i = view.findIndex((h) => h >= tree);
          return agg * (i === -1 ? view.length : i + 1);
        }, 1)
      );
    });
    return result;
  },
};

const parse = (input) => {
  return input
    .trim()
    .split("\n")
    .map((line) => line.split("").map(Number));
};

const getViews = (grid, i, j) => {
  return [
    grid[i].slice(0, j).reverse(),
    grid[i].slice(j + 1),
    grid
      .map((row) => row[j])
      .slice(0, i)
      .reverse(),
    grid.map((row) => row[j]).slice(i + 1),
  ];
};

Array.prototype.forMatrix = function (fn) {
  for (let i = 0; i < this.length; i++) {
    for (let j = 0; j < this[i].length; j++) {
      fn(this[i][j], i, j);
    }
  }
};

export const samples = `30373
25512
65332
33549
35390`;
