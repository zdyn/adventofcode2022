export const fns = {
  "Part 1": (input) => parse(input)[0],
  "Part 2": (input) => parse(input).slice(0, 3).sum(),
};

const parse = (input) => {
  return input
    .trim()
    .split("\n\n")
    .map((inv) => inv.split("\n").map(Number).sum())
    .sort((a, b) => b - a);
};

Array.prototype.sum = function() {
  return this.reduce((agg, num) => agg + num, 0);
};

export const samples = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;
