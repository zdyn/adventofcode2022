import { key } from "./utils.js";

export const fns = {
  "Part 1": (input) => heightAfter(2022, parse(input)),
  "Part 2": (input) => heightAfter(1000000000000, parse(input)),
};

const parse = (input) => {
  return input
    .trim()
    .split("")
    .map((arrow) => ({ "<": -1, ">": 1 }[arrow]));
};

const heightAfter = (target, jets) => {
  const grid = [];
  const seen = {};
  const iterations = [];
  let level = 0;
  let rockIdx = 0;
  let jetIdx = 0;
  while (true) {
    const k = key(rockIdx % ROCKS.length, jetIdx);
    seen[k] ??= [];
    const s = seen[k];
    s.push({ rocks: rockIdx, height: grid.length - level });
    // TODO: Not sure why this works.
    if (
      s.length > 1 &&
      s[s.length - 2].height > s[s.length - 1].height - s[s.length - 2].height
    ) {
      const rdiff = s[s.length - 1].rocks - s[s.length - 2].rocks;
      const hdiff = s[s.length - 1].height - s[s.length - 2].height;
      const rem = target - Math.floor(target / rdiff) * rdiff;
      return Math.floor(target / rdiff) * hdiff + iterations[rem - 1];
    }
    const rock = ROCKS[rockIdx % ROCKS.length];
    while (level - rock.length < 3) {
      grid.unshift(new Array(7).fill(false));
      level++;
    }
    let x = level - (rock.length + 3);
    let y = 2;
    while (true) {
      const jet = jets[jetIdx];
      if (!collides(grid, rock, x, y + jet)) y += jet;
      jetIdx = (jetIdx + 1) % jets.length;
      if (collides(grid, rock, x + 1, y)) break;

      x++;
    }
    rock.forMatrix((c, i, j) => {
      if (!c) return;

      grid[i + x][y + j] = true;
      level = Math.min(level, i + x);
    });
    iterations.push(grid.length - level);
    rockIdx++;
  }
};

const ROCKS = [
  [[1, 1, 1, 1]],
  [
    [0, 1, 0],
    [1, 1, 1],
    [0, 1, 0],
  ],
  [
    [0, 0, 1],
    [0, 0, 1],
    [1, 1, 1],
  ],
  [[1], [1], [1], [1]],
  [
    [1, 1],
    [1, 1],
  ],
];

const collides = (grid, rock, x, y) => {
  for (let i = 0; i < rock.length; i++) {
    for (let j = 0; j < rock[i].length; j++) {
      if (rock[i][j] === 0) continue;

      if (i + x >= grid.length) return true;
      if (j + y >= grid[i + x].length) return true;
      if (j + y < 0) return true;
      if (grid[i + x][j + y]) return true;
    }
  }
  return false;
};

export const samples = `>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>`;
