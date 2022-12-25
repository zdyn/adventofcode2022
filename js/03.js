import "./utils.js";

export const fns = {
  "Part 1": (input) => {
    return parse(input).reduce((agg, items) => {
      const set = items
        .group(items.length / 2)
        .map((items) => new Set(items))
        .reduce((agg, set) => agg.intersection(set));
      return agg + PRIORITY[[...set][0]];
    }, 0);
  },
  "Part 2": (input) => {
    return parse(input)
      .group(3)
      .reduce((agg, group) => {
        const set = group
          .map((items) => new Set(items))
          .reduce((agg, set) => agg.intersection(set));
        return agg + PRIORITY[[...set][0]];
      }, 0);
  },
};

const parse = (input) => {
  return input
    .trim()
    .split("\n")
    .map((items) => items.split(""));
};

const PRIORITY = "abcdefghijklmnopqrstuvwxyz"
  .split("")
  .reduce((agg, char, i) => {
    agg[char] = i + 1;
    agg[char.toUpperCase()] = i + 27;
    return agg;
  }, {});

export const samples = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;
