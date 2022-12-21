export const fns = {
  "Part 1": (input) => {
    const monkeyFns = {};
    const monkeys = [];
    input
      .split("\n\n")
      .forEach((monkey, i) => {
        const lines = monkey.split("\n").map((s) => s.trim());
        const items = lines[1].match(/\d+/g).map(Number);
        const [operation, operand] = lines[2].split(" ").slice(4);
        const operationFn = (old) => {
          if (operation === "+") {
            return old + (operand === "old" ? old : Number(operand));
          } else {
            return old * (operand === "old" ? old : Number(operand));
          }
        };
        const divisor = Number(lines[3].match(/\d+/)[0]);
        const t = Number(lines[4].match(/\d+/)[0]);
        const f = Number(lines[5].match(/\d+/)[0]);
        const testFn = (old) => old % divisor === 0 ? t : f;
        monkeyFns[i] = {operationFn, testFn};
        monkeys.push({
          items: items.slice(),
          inspections: 0,
        });
      });
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < monkeys.length; j++) {
        const monkey = monkeys[j];
        monkey.inspections += monkey.items.length;
        for (let item of monkey.items) {
          item = Math.floor(monkeyFns[j].operationFn(item) / 3);
          monkeys[monkeyFns[j].testFn(item)].items.push(item);
        }
        monkey.items = [];
      }
    }
    return monkeys
      .map((m) => m.inspections)
      .sort((a, b) => b - a)
      .slice(0, 2)
      .product();
  },
  "Part 2": (input) => {
    const monkeyFns = {};
    const monkeys = [];
    let lcm = 1;
    input
      .split("\n\n")
      .forEach((monkey, i) => {
        const lines = monkey.split("\n").map((s) => s.trim());
        const items = lines[1].match(/\d+/g).map(Number);
        const [operation, operand] = lines[2].split(" ").slice(4);
        const operationFn = (old) => {
          if (operation === "+") {
            return old + (operand === "old" ? old : Number(operand));
          } else {
            return old * (operand === "old" ? old : Number(operand));
          }
        };
        const divisor = Number(lines[3].match(/\d+/)[0]);
        const t = Number(lines[4].match(/\d+/)[0]);
        const f = Number(lines[5].match(/\d+/)[0]);
        const testFn = (old) => old % divisor === 0 ? t : f;
        lcm *= divisor;
        monkeyFns[i] = {operationFn, testFn};
        monkeys.push({
          items: items.slice(),
          inspections: 0,
        });
      });
    for (let i = 0; i < 10000; i++) {
      for (let j = 0; j < monkeys.length; j++) {
        const monkey = monkeys[j];
        monkey.inspections += monkey.items.length;
        for (let item of monkey.items) {
          item = monkeyFns[j].operationFn(item) % lcm;
          monkeys[monkeyFns[j].testFn(item)].items.push(item);
        }
        monkey.items = [];
      }
    }
    return monkeys
      .map((m) => m.inspections)
      .sort((a, b) => b - a)
      .slice(0, 2)
      .product();
  },
};

Array.prototype.product = function() {
  return this.reduce((agg, num) => agg * num, 1);
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
