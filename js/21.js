import { extractNumbers } from "./utils.js";

export const fns = {
  "Part 1": (input) => eval(expand(parse(input), "root")),
  "Part 2": (input) => {
    const monkes = parse(input);
    const eq = evalSolve(expand(monkes, monkes.root[0], { humn: "x" }));
    return solveFor("x", eq, eval(expand(monkes, monkes.root[2])));
  },
  "Part 1 (no eval)": (input) => Number(solve(expand(parse(input), "root"))),
  "Part 2 (no eval)": (input) => {
    const monkes = parse(input);
    const eq = solve(expand(monkes, monkes.root[0], { humn: "x" }));
    return solveFor("x", eq, Number(solve(expand(monkes, monkes.root[2]))));
  },
};

const parse = (input) => {
  return input
    .trim()
    .split("\n")
    .reduce((monkes, line) => {
      const parts = line.split(": ");
      monkes[parts[0]] = parts[1].split(" ");
      // Return to monke.
      return monkes;
    }, {});
};

const expand = (monkes, monke, m) => {
  if (m != null && m[monke] != null) return m[monke];

  const yell = monkes[monke];
  if (yell.length === 1) return yell[0];

  const [left, op, right] = yell;
  return `(${expand(monkes, left, m)}${op}${expand(monkes, right, m)})`;
};

const evalSolve = (eq) => {
  const re = /\(\d+\.*\d*[+\-*/]\d+\.*\d*\)/g;
  let match = eq.match(re);
  while (match != null) {
    eq = eq.replace(match[0], eval(match[0]));
    match = eq.match(re);
  }
  return eq;
};

const solve = (eq) => {
  const re = /\(\d+\.*\d*[+\-*/]\d+\.*\d*\)/g;
  let match = eq.match(re);
  while (match != null) {
    const [left, right] = match[0]
      .slice(1, -1)
      .split(/[+\-*/]/)
      .map(Number);
    let num;
    switch (match[0][`${left}`.length + 1]) {
      case "+":
        num = left + right;
        break;
      case "-":
        num = left - right;
        break;
      case "*":
        num = left * right;
        break;
      case "/":
        num = left / right;
        break;
    }
    eq = eq.replace(match[0], num);
    match = eq.match(re);
  }
  return eq;
};

const solveFor = (x, eq, constant) => {
  while (eq[0] === "(") {
    if (eq[eq.length - 2] !== ")") {
      let i = eq.slice(0, -1).lastIndexOf(")");
      if (i === -1) i = eq.indexOf(x) + x.length - 1;
      const op = eq[i + 1];
      const num = Number(eq.slice(i + 2, -1));
      switch (op) {
        case "+":
          constant -= num;
          break;
        case "-":
          constant += num;
          break;
        case "*":
          constant /= num;
          break;
        case "/":
          constant *= num;
          break;
      }
      eq = eq.slice(1, i + 1);
    } else {
      const i = eq.slice(1).indexOf("(");
      const op = eq[i];
      const num = Number(eq.slice(1, i));
      switch (op) {
        case "+":
          constant -= num;
          break;
        case "-":
          constant = num - constant;
          break;
        case "*":
          constant /= num;
          break;
        case "/":
          constant = num / constant;
          break;
      }
      eq = eq.slice(i + 1, -1);
    }
  }
  return constant;
};

export const samples = `root: pppw + sjmn
dbpl: 5
cczh: sllz + lgvd
zczc: 2
ptdq: humn - dvpt
dvpt: 3
lfqf: 4
humn: 5
ljgn: 2
sjmn: drzm * dbpl
sllz: 4
pppw: cczh / lfqf
lgvd: ljgn * ptdq
drzm: hmdt - zczc
hmdt: 32`;
