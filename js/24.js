import "./utils.js";

export const fns = {
  "Part 1": (input) => {
    const grid = parse(input);
    const start = [0, 1];
    const end = [grid.length - 1, grid[0].length - 2];
    return bfs(grid, [start], end, 0).moves;
  },
  "Part 2": (input) => {
    const grid = parse(input);
    const start = [0, 1];
    const end = [grid.length - 1, grid[0].length - 2];
    let result = bfs(grid, [start], end, 0);
    result = bfs(result.grid, [end], start, result.moves);
    return bfs(result.grid, [start], end, result.moves).moves;
  },
};

const parse = (input) => {
  return input
    .trim()
    .split("\n")
    .map((line) => line.split(""));
};

const bfs = (grid, positions, target, moves) => {
  if (new Set(positions.map(key)).has(key(target))) {
    return { grid, moves };
  }
  const nextGrid = grid.mapMatrix((c) => (c === "#" ? c : "."));
  grid.forMatrix((c, i, j) => {
    if ("#.".includes(c)) return;
    for (const arrow of c.split("")) {
      let i2 = i;
      let j2 = j;
      switch (arrow) {
        case "^":
          i2 = i2 === 1 ? grid.length - 2 : i2 - 1;
          break;
        case "v":
          i2 = i2 === grid.length - 2 ? 1 : i2 + 1;
          break;
        case "<":
          j2 = j2 === 1 ? grid[i2].length - 2 : j2 - 1;
          break;
        case ">":
          j2 = j2 === grid[i2].length - 2 ? 1 : j2 + 1;
          break;
      }
      nextGrid[i2][j2] =
        nextGrid[i2][j2] === "." ? arrow : nextGrid[i2][j2] + arrow;
    }
  });
  const nextPositions = new Set();
  for (const position of positions) {
    for (const p of possible(nextGrid, position)) {
      nextPositions.add(key(p));
    }
  }
  return bfs(
    nextGrid,
    Array.from(nextPositions).map(fromKey),
    target,
    moves + 1
  );
};

const key = (coord) => coord.join(",");

const fromKey = (k) => k.split(",").map(Number);

const possible = (grid, [x, y]) => {
  return [
    [x, y],
    [x - 1, y],
    [x, y - 1],
    [x, y + 1],
    [x + 1, y],
  ].filter(([i, j]) => {
    return (
      i >= 0 &&
      i < grid.length &&
      j >= 0 &&
      j < grid[i].length &&
      grid[i][j] === "."
    );
  });
};

export const samples = `#.######
#>>.<^<#
#.<..<<#
#>v.><>#
#<^v^^>#
######.#`;
