export const run = (input) => {
  Array.prototype.product = function() {
    return this.reduce((agg, num) => agg * num, 1);
  };

  const monkeyFns = {};
  const monkeys1 = [];
  const monkeys2 = [];
  let lcm = 1;

  input
    .split("\n\n")
    .forEach((group, i) => {
      const lines = group
        .split("\n")
        .map((s) => s.trim());
      const items = lines[1]
        .split(": ")[1]
        .split(", ")
        .map(Number);
      const [operation, operand] = lines[2]
        .split(" ")
        .slice(4);
      const operationFn = (old) => {
        if (operation === "+") {
          return old + (operand === "old" ? old : Number(operand));
        } else {
          return old * (operand === "old" ? old : Number(operand));
        }
      };
      const divisor = Number(lines[3].split(" ")[3]);
      const t = Number(lines[4].split(" ")[5]);
      const f = Number(lines[5].split(" ")[5]);
      const testFn = (old) => {
        return old % divisor === 0 ? t : f;
      };

      monkeyFns[i] = {operationFn, testFn};
      monkeys1.push({
        items: items.slice(),
        inspections: 0,
      });
      monkeys2.push({
        items: items.slice(),
        inspections: 0,
      });

      lcm *= divisor;
    });

  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < monkeys1.length; j++) {
      const monkey = monkeys1[j];

      monkey.inspections += monkey.items.length;
      for (let item of monkey.items) {
        item = Math.floor(monkeyFns[j].operationFn(item) / 3);
        monkeys1[monkeyFns[j].testFn(item)].items.push(item);
      }
      monkey.items = [];
    }
  }
  for (let i = 0; i < 10000; i++) {
    for (let j = 0; j < monkeys2.length; j++) {
      const monkey = monkeys2[j];

      monkey.inspections += monkey.items.length;
      for (let item of monkey.items) {
        item = monkeyFns[j].operationFn(item) % lcm;
        monkeys2[monkeyFns[j].testFn(item)].items.push(item);
      }
      monkey.items = [];
    }
  }

  return [
    monkeys1
      .map((m) => m.inspections)
      .sort((a, b) => b - a)
      .slice(0, 2)
      .product(),
    monkeys2
      .map((m) => m.inspections)
      .sort((a, b) => b - a)
      .slice(0, 2)
      .product(),
  ];
};

export const samples = `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`;
