import "./utils.js";

export const fns = {
  "Part 1": (input) => {
    const { stacks, moves } = parse(input);
    for (let { from, to, count } of moves) {
      while (count-- > 0) {
        stacks[to - 1].push(stacks[from - 1].pop());
      }
    }
    return stacks.map((s) => s[s.length - 1]).join("");
  },
  "Part 2": (input) => {
    const { stacks, moves } = parse(input);
    for (const { from, to, count } of moves) {
      stacks[to - 1] = stacks[to - 1].concat(
        stacks[from - 1].splice(stacks[from - 1].length - count, count)
      );
    }
    return stacks.map((s) => s[s.length - 1]).join("");
  },
};

const parse = (input) => {
  const parts = input.split("\n\n");
  const stacks = [];
  const moves = [];
  for (const line of parts[0].split("\n").slice(0, -1)) {
    line
      .group(4)
      .map((crate) => crate[1])
      .forEach((crate, i) => {
        if (crate === " ") return;

        while (i + 1 > stacks.length) {
          stacks.push([]);
        }
        stacks[i].unshift(crate);
      });
  }
  for (const line of parts[1].trim().split("\n")) {
    const [count, from, to] = line.match(/\d+/g).map(Number);
    moves.push({ from, to, count });
  }
  return { stacks, moves };
};

export const samples = `    [D]
[N] [C]
[Z] [M] [P]
 1   2   3

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;
