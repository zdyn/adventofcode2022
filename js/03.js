export const run = (input) => {
  Array.prototype.group = function(size) {
    const groups = [];
    for (let i = 0; i < this.length; i += size) {
      groups.push(this.slice(i, i + size));
    }
    return groups;
  };
  Set.prototype.intersection = function(set) {
    const result = new Set();
    for (let mem of this) {
      if (set.has(mem)) {
        result.add(mem);
      }
    }
    return result;
  };

  const PRIORITY_MAP = "abcdefghijklmnopqrstuvwxyz"
    .split("")
    .reduce((agg, char, i) => {
      agg[char] = i + 1;
      agg[char.toUpperCase()] = i + 27;
      return agg;
    }, {});

  const rucksacks = input
    .trim()
    .split("\n")
    .map((text) => text.split(""));

  return [
    rucksacks.reduce((agg, rucksack) => {
      const [rs1, rs2] = rucksack.group(rucksack.length / 2);
      const intersection = Array.from(
        new Set(rs1).intersection(new Set(rs2)),
      )[0];
      return agg + PRIORITY_MAP[intersection];
    }, 0),
    rucksacks.group(3).reduce((agg, [rs1, rs2, rs3]) => {
      const intersection = Array.from(
        new Set(rs1).intersection(new Set(rs2)).intersection(new Set(rs3)),
      )[0];
      return agg + PRIORITY_MAP[intersection];
    }, 0),
  ];
};

export const samples = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;
