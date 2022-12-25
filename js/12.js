import "./utils.js";

export const fns = {
  "Part 1": (input) => {
    const grid = parse(input);
    let endCoords;
    grid.forMatrix((elevation, i, j) => {
      if (elevation === "E") {
        endCoords = [i, j];
        return true;
      }
    });
    return distance(grid, endCoords, "S");
  },
  "Part 2": (input) => {
    const grid = parse(input);
    let endCoords;
    grid.forMatrix((elevation, i, j) => {
      if (elevation === "S") {
        grid[i][j] = "a";
      } else if (elevation === "E") {
        endCoords = [i, j];
      }
    });
    return distance(grid, endCoords, "a");
  },
};

const parse = (input) => {
  return input
    .trim()
    .split("\n")
    .map((row) => row.split(""));
};

const HEIGHTS = "abcdefghijklmnopqrstuvwxyz".split("").reduce(
  (agg, letter, i) => {
    agg[letter] = i;
    return agg;
  },
  { S: 0, E: 25 }
);

const distance = (grid, fromCoords, to) => {
  const key = (...args) => args.join(",");
  const distances = { [key(...fromCoords)]: 0 };
  let queue = [fromCoords];
  while (queue.length > 0) {
    const next = [];
    for (const [x, y] of queue) {
      const k = key(x, y);
      const distance = distances[k] + 1;
      if (grid[x][y] === to) return distance - 1;

      for (const [xDiff, yDiff] of [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ]) {
        const x2 = x + xDiff;
        const y2 = y + yDiff;
        const k2 = key(x2, y2);
        if (
          x2 < 0 ||
          y2 < 0 ||
          x2 >= grid.length ||
          y2 >= grid[x2].length ||
          HEIGHTS[grid[x2][y2]] - HEIGHTS[grid[x][y]] < -1 ||
          (distances[k2] != null && distances[k2] <= distance)
        ) {
          continue;
        }

        distances[k2] = distance;
        next.push([x2, y2]);
      }
    }
    queue = next;
  }
};

export const samples = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;
