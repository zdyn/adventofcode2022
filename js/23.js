import { fkey, key } from "./utils.js";

export const fns = {
  "Part 1": (input) => {
    const elves = parse(input);
    let dirs = "NSWE";
    for (let i = 0; i < 10; i++) {
      move(elves, dirs);
      dirs = dirs.slice(1) + dirs[0];
    }
    let min = [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER];
    let max = [0, 0];
    for (const k of elves) {
      const [x, y] = fkey(k);
      min = [Math.min(min[0], x), Math.min(min[1], y)];
      max = [Math.max(max[0], x), Math.max(max[1], y)];
    }
    return (max[0] - min[0] + 1) * (max[1] - min[1] + 1) - elves.size;
  },
  // TODO: Speed up.
  "Part 2": (input) => {
    const elves = parse(input);
    let dirs = "NSWE";
    let rounds = 0;
    while (true) {
      rounds++;
      if (!move(elves, dirs)) {
        break;
      }
      dirs = dirs.slice(1) + dirs[0];
    }
    return rounds;
  },
};

const parse = (input) => {
  const elves = new Set();
  input
    .trim()
    .split("\n")
    .forEach((row, i) => {
      row.split("").forEach((c, j) => {
        if (c === "#") elves.add(key(i, j));
      });
    });
  return elves;
};

const move = (elves, dirs) => {
  const moves = {};
  let changed = false;
  for (const k of elves) {
    const [x, y] = fkey(k);
    if (!occupied(elves, neighbors(x, y))) continue;

    const checks = [
      neighbors(x, y, dirs[0]),
      neighbors(x, y, dirs[1]),
      neighbors(x, y, dirs[2]),
      neighbors(x, y, dirs[3]),
    ];
    for (const check of checks) {
      if (!occupied(elves, check)) {
        const to = key(check[1]);
        moves[to] ??= [];
        moves[to].push(k);
        break;
      }
    }
  }
  for (const [k, v] of Object.entries(moves)) {
    if (v.length > 1) continue;

    changed = true;
    elves.delete(v[0]);
    elves.add(k);
  }
  return changed;
};

const neighbors = (x, y, dir) => {
  switch (dir) {
    case "N":
      return [
        [x - 1, y - 1],
        [x - 1, y],
        [x - 1, y + 1],
      ];
    case "S":
      return [
        [x + 1, y - 1],
        [x + 1, y],
        [x + 1, y + 1],
      ];
    case "W":
      return [
        [x - 1, y - 1],
        [x, y - 1],
        [x + 1, y - 1],
      ];
    case "E":
      return [
        [x - 1, y + 1],
        [x, y + 1],
        [x + 1, y + 1],
      ];
    default:
      return [
        [x - 1, y - 1],
        [x - 1, y],
        [x - 1, y + 1],
        [x, y - 1],
        [x, y + 1],
        [x + 1, y - 1],
        [x + 1, y],
        [x + 1, y + 1],
      ];
  }
};

const occupied = (s, coords) => {
  return coords.some((coord) => s.has(key(coord)));
};

export const samples = `....#..
..###.#
#...#.#
.#...##
#.###..
##.#.##
.#..#..`;
