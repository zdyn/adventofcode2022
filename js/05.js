export const run = (input) => {
  Array.prototype.group = function(size) {
    const groups = [];
    for (let i = 0; i < this.length; i += size) {
      groups.push(this.slice(i, i + size));
    }
    return groups;
  };

  const parts = input.split("\n\n");
  const stacks1 = [];
  const stacks2 = [];

  for (let line of parts[0].split("\n").slice(0, -1)) {
    line
      .split("")
      .group(4)
      .map((group) => group[1])
      .forEach((crate, i) => {
        if (crate === " ") return;

        while (i + 1 > stacks1.length) {
          stacks1.push([]);
          stacks2.push([]);
        }
        stacks1[i].unshift(crate);
        stacks2[i].unshift(crate);
      });
  }

  for (let line of parts[1].trim().split("\n")) {
    const words = line.split(" ");
    const count = Number(words[1]);
    const from = Number(words[3]) - 1;
    const to = Number(words[5]) - 1;

    for (let i = 0; i < count; i++) {
      stacks1[to].push(stacks1[from].pop());
    }
    stacks2[to] = stacks2[to].concat(
      stacks2[from].splice(stacks2[from].length - count, count),
    );
  }

  return [
    stacks1.map((s) => s[s.length - 1]).join(""),
    stacks2.map((s) => s[s.length - 1]).join(""),
  ];
};

export const samples = `    [D]
[N] [C]
[Z] [M] [P]
 1   2   3

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;
