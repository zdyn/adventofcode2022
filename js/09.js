export const fns = {
  "Part 1": (input) => {
    const knots = [...Array(2)].map(() => [0, 0]);
    const moves = parse(input);
    return visited(knots, moves);
  },
  "Part 2": (input) => {
    const knots = [...Array(10)].map(() => [0, 0]);
    const moves = parse(input);
    return visited(knots, moves);
  },
};

const parse = (input) => {
  return input
    .trim()
    .split("\n")
    .map((move) => {
      const parts = move.split(" ");
      return { direction: parts[0], count: Number(parts[1]) };
    });
};

const visited = (knots, moves) => {
  const visited = new Set(["0,0"]);
  for (let { direction, count } of moves) {
    while (count-- > 0) {
      let prev = knots[0];
      const i = { R: 0, L: 0, U: 1, D: 1 }[direction];
      const d = { R: 1, L: -1, U: 1, D: -1 }[direction];
      prev[i] += d;
      for (let next of knots.slice(1)) {
        if (
          Math.abs(next[0] - prev[0]) > 1 &&
          Math.abs(next[1] - prev[1]) > 1
        ) {
          next[0] += prev[0] > next[0] ? 1 : -1;
          next[1] += prev[1] > next[1] ? 1 : -1;
        } else if (Math.abs(next[0] - prev[0]) > 1) {
          next[0] += prev[0] > next[0] ? 1 : -1;
          next[1] = prev[1];
        } else if (Math.abs(next[1] - prev[1]) > 1) {
          next[0] = prev[0];
          next[1] += prev[1] > next[1] ? 1 : -1;
        }
        prev = next;
      }
      visited.add(knots[knots.length - 1].join(","));
    }
  }
  return visited.size;
};

export const samples = [
  `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`,
  `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`,
];
