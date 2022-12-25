import "./utils.js";

export const fns = {
  "Part 1": (input) => {
    return parse(input).reduce((agg, [[f1, t1], [f2, t2]]) => {
      return (f1 <= f2 && t1 >= t2) || (f1 >= f2 && t1 <= t2) ? agg + 1 : agg;
    }, 0);
  },
  "Part 2": (input) => {
    return parse(input).reduce((agg, [[f1, t1], [f2, t2]]) => {
      return f1 <= t2 && t1 >= f2 ? agg + 1 : agg;
    }, 0);
  },
};

const parse = (input) => {
  return input
    .trim()
    .split("\n")
    .map((pairs) => {
      return pairs.split(",").map((range) => range.split("-").map(Number));
    });
};

export const samples = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;
