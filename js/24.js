import { fkey, key, parseGrid } from "./utils.js";

export const fns = {
  "Part 1": (input) => {
    const grid = parseGrid(input.trim());
    const start = [0, 1];
    const end = [grid.length - 1, grid[0].length - 2];
    return bfs(grid, start, end).moves;
  },
  "Part 2": (input) => {
    const grid = parseGrid(input.trim());
    const start = [0, 1];
    const end = [grid.length - 1, grid[0].length - 2];
    const trip1 = bfs(grid, start, end);
    const trip2 = bfs(trip1.grid, end, start);
    const trip3 = bfs(trip2.grid, start, end);
    return trip1.moves + trip2.moves + trip3.moves;
  },
};

const bfs = (grid, start, target) => {
  const t = key(target);
  let positions = new Set([key(start)]);
  let moves = 0;
  while (!positions.has(t)) {
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
      for (const p of possible(nextGrid, fkey(position))) {
        nextPositions.add(key(p));
      }
    }
    grid = nextGrid;
    positions = nextPositions;
    moves++;
  }
  return { grid, moves };
};

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
