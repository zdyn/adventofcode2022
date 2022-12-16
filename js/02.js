export const run = (input) => {
  Array.prototype.sum = function() {
    return this.reduce((agg, num) => agg + num, 0);
  };

  const POINT_MAP_1 = {
    "A X": 4,
    "A Y": 8,
    "A Z": 3,
    "B X": 1,
    "B Y": 5,
    "B Z": 9,
    "C X": 7,
    "C Y": 2,
    "C Z": 6,
  };
  const POINT_MAP_2 = {
    "A X": 3,
    "A Y": 4,
    "A Z": 8,
    "B X": 1,
    "B Y": 5,
    "B Z": 9,
    "C X": 2,
    "C Y": 6,
    "C Z": 7,
  };

  const strategies = input.trim().split("\n");

  return [
    strategies.map((text) => POINT_MAP_1[text]).sum(),
    strategies.map((text) => POINT_MAP_2[text]).sum(),
  ];
};

export const samples = `A Y
B X
C Z`;
