export const run = (input) => {
  const moves = input
    .trim()
    .split("\n")
    .map((line) => {
      const parts = line.split(" ");
      return [parts[0], Number(parts[1])];
    });
  const knots = [];
  const visited1 = new Set(["0,0"]);
  const visited2 = new Set(["0,0"]);

  for (let i = 0; i < 10; i++) {
    knots.push([0, 0]);
  }
  for (let [dir, num] of moves) {
    for (let i = 0; i < num; i++) {
      let prev = knots[0];

      switch (dir) {
        case "R":
          prev[0]++;
          break;
        case "L":
          prev[0]--;
          break;
        case "U":
          prev[1]++;
          break;
        case "D":
          prev[1]--;
          break;
      }
      for (let next of knots.slice(1)) {
        if (Math.abs(next[0] - prev[0]) > 1 && Math.abs(next[1] - prev[1]) > 1) {
          next[0] += prev[0] > next[0] ? 1 : -1;
          next[1] += prev[1] > next[1] ? 1 : -1;
        } else if (Math.abs(next[0] - prev[0]) > 1) {
          next[0] += prev[0] > next[0] ? 1 : -1;
          next[1] = prev[1];
        } else if (Math.abs(next[1] - prev[1]) > 1) {
          next[1] += prev[1] > next[1] ? 1 : -1;
          next[0] = prev[0];
        }
        prev = next;
      }

      visited1.add(knots[1].join(","));
      visited2.add(knots[knots.length - 1].join(","));
    }
  }

  return [
    visited1.size,
    visited2.size,
  ];
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
U 20`
];
