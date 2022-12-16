export const run = (input) => {
  const pairs = input
    .trim()
    .split("\n")
    .map((line) => {
      return line
        .split(",")
        .map((range) => range.split("-").map(Number));
    });

  return [
    pairs.reduce((agg, [[from1, to1], [from2, to2]]) => {
      return (
        (from1 <= from2 && to1 >= to2) ||
        (from1 >= from2 && to1 <= to2)
      ) ? agg + 1 : agg;
    }, 0),
    pairs.reduce((agg, [[from1, to1], [from2, to2]]) => {
      return from1 <= to2 && to1 >= from2 ? agg + 1 : agg;
    }, 0),
  ];
};

export const samples = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;
