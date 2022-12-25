import { parseGrid } from "./utils.js";

export const fns = {
  "Part 1": (input) => {
    return parseGrid(input.trim()).reduce((agg, items) => {
      const set = items
        .group(items.length / 2)
        .map((items) => new Set(items))
        .reduce((agg, set) => agg.intersection(set));
      return agg + PRIORITY[[...set][0]];
    }, 0);
  },
  "Part 2": (input) => {
    return parseGrid(input.trim())
      .group(3)
      .reduce((agg, group) => {
        const set = group
          .map((items) => new Set(items))
          .reduce((agg, set) => agg.intersection(set));
        return agg + PRIORITY[[...set][0]];
      }, 0);
  },
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
