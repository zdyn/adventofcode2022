export const run = (input) => {
  Array.prototype.sum = function() {
    return this.reduce((agg, num) => agg + num, 0);
  };

  const inventories = input
    .split("\n\n")
    .map((text) => {
      return text
        .split("\n")
        .map(Number)
        .sum();
    })
    .sort((a, b) => b - a);

  return [
    inventories[0],
    inventories.slice(0, 3).sum(),
  ];
};
