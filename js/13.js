export const run = (input) => {
  Array.prototype.group = function(size) {
    const groups = [];
    for (let i = 0; i < this.length; i += size) {
      groups.push(this.slice(i, i + size));
    }
    return groups;
  };

  const packets = input
    .split("\n")
    .filter((line) => line)
    .map(eval);

  const check = (left, right) => {
    let i = 0;
    while (i < left.length && i < right.length) {
      let diff;
      if (Number.isInteger(left[i]) && Number.isInteger(right[i])) {
        diff = left[i] - right[i];
      } else {
        diff = check([].concat(left[i]), [].concat(right[i]));
      }
      if (diff !== 0) return diff;
      i++;
    }
    return i < right.length ? -1 : (i < left.length ? 1 : 0);
  };

  return [
    packets
      .group(2)
      .reduce((agg, [left, right], i) => {
        return agg + (check(left, right) < 0 ? i + 1 : 0);
      }, 0),
    [[[2]], [[6]], ...packets]
      .sort(check)
      .reduce((agg, packet, i) => {
        return agg * (["[[2]]", "[[6]]"].includes(JSON.stringify(packet)) ? i + 1 : 1);
      }, 1),
  ];
};
