export const fns = {
  "Part 1": (input) => {
    return parse(input)
      .group(2)
      .reduce((agg, [left, right], i) => {
        return agg + (compare(left, right) < 0 ? i + 1 : 0);
      }, 0);
  },
  "Part 2": (input) => {
    return [[[2]], [[6]], ...parse(input)]
      .sort(compare)
      .reduce((agg, packet, i) => {
        return agg * (["[[2]]", "[[6]]"].includes(JSON.stringify(packet)) ? i + 1 : 1);
      }, 1);
  },
};

const parse = (input) => {
  return input
    .split("\n")
    .filter((line) => line)
    .map(JSON.parse);
};

const compare = (left, right) => {
  let i = 0;
  while (i < left.length && i < right.length) {
    let diff;
    if (Number.isInteger(left[i]) && Number.isInteger(right[i])) {
      diff = left[i] - right[i];
    } else {
      diff = compare([].concat(left[i]), [].concat(right[i]));
    }
    if (diff !== 0) return diff;
    i++;
  }
  return i < right.length ? -1 : (i < left.length ? 1 : 0);
};

Array.prototype.group = function(size) {
  const groups = [];
  for (let i = 0; i < this.length; i += size) {
    groups.push(this.slice(i, i + size));
  }
  return groups;
};

export const samples = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`;
