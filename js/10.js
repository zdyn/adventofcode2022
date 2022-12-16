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

export const samples = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`;
