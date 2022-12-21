export const fns = {
  "Part 1": (input) => {
    return parse(input, {
      "A X": 4,
      "A Y": 8,
      "A Z": 3,
      "B X": 1,
      "B Y": 5,
      "B Z": 9,
      "C X": 7,
      "C Y": 2,
      "C Z": 6,
    });
  },
  "Part 2": (input) => {
    return parse(input, {
      "A X": 3,
      "A Y": 4,
      "A Z": 8,
      "B X": 1,
      "B Y": 5,
      "B Z": 9,
      "C X": 2,
      "C Y": 6,
      "C Z": 7,
    });
  },
};

const parse = (input, points) => {
  return input
    .trim()
    .split("\n")
    .map((strat) => points[strat])
    .reduce((agg, num) => agg + num, 0);
};

export const samples = `A Y
B X
C Z`;
