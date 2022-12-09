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
      switch (dir) {
        case "R":
          knots[0][0]++;
          break;
        case "L":
          knots[0][0]--;
          break;
        case "U":
          knots[0][1]++;
          break;
        case "D":
          knots[0][1]--;
          break;
      }

      let prev = knots[0];
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

export const samples = ["09s", "09s2"];
