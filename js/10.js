export const run = (input) => {
  const commands = input
    .trim()
    .split("\n")
    .map((line) => {
      const parts = line.split(" ");
      return [parts[0], Number(parts[1] || 0)];
    });
  const positions = [];
  const checks = [20, 60, 100, 140, 180, 220];

  let cycle = 0;
  let x = 1;
  let sum = 0;

  for (let [cmd, num] of commands) {
    if (cmd === "noop") {
      cycle += 1;
      positions.push(x);
    } else if (cmd === "addx") {
      cycle += 2;
      positions.push(x, x);
      x += num;
    }
    if (cycle >= checks[0]) {
      sum += checks.shift() * (x - num);
    }
  }

  return [
    sum,
    positions.map((pos, i) => {
      return (
        (i % 40 === 0 ? "\n" : "") +
        (pos - 1 <= i % 40 && pos + 1 >= i % 40 ? "#" : ".")
      );
    }).join(""),
  ];
};
