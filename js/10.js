export const fns = {
  "Part 1": (input) => {
    const commands = parse(input);
    const checks = [20, 60, 100, 140, 180, 220];
    let cycle = 0;
    let x = 1;
    let result = 0;
    for (let { instruction, count } of commands) {
      cycle++;
      if (instruction === "addx") {
        cycle++;
        x += count;
      }
      if (cycle >= checks[0]) {
        result += checks.shift() * (x - count);
      }
    }
    return result;
  },
  "Part 2": (input) => {
    const commands = parse(input);
    const positions = [];
    let x = 1;
    for (let { instruction, count } of commands) {
      positions.push(x);
      if (instruction === "addx") {
        positions.push(x);
        x += count;
      }
    }
    return positions
      .map((position, i) => {
        return (
          (i % 40 === 0 ? "\n" : "") +
          (position - 1 <= i % 40 && position + 1 >= i % 40 ? "#" : ".")
        );
      })
      .join("");
  },
};

const parse = (input) => {
  return input
    .trim()
    .split("\n")
    .map((command) => {
      const parts = command.split(" ");
      return {
        instruction: parts[0],
        count: Number(parts[1] || 0),
      };
    });
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
