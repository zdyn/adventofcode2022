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

Array.prototype.group = function (size) {
  const groups = [];
  for (let i = 0; i < this.length; i += size) {
    groups.push(this.slice(i, i + size));
  }
  return groups;
};

Set.prototype.intersection = function (set) {
  const [a, b] = this.size <= set.size ? [this, set] : [set, this];
  const result = new Set();
  for (const mem of a) {
    if (b.has(mem)) {
      result.add(mem);
    }
  }
  return result;
};

export const samples = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;
