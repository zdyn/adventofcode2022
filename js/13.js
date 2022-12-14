export const run = (input) => {
  Array.prototype.group = function(size) {
    const groups = [];
    for (let i = 0; i < this.length; i += size) {
      groups.push(this.slice(i, i + size));
    }
    return groups;
  };
  Array.prototype.product = function() {
    return this.reduce((agg, num) => agg * num, 1);
  };
  Array.prototype.sum = function() {
    return this.reduce((agg, num) => agg + num, 0);
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
      } else if (Number.isInteger(left[i])) {
        diff = check([left[i]], right[i]);
      } else if (Number.isInteger(right[i])) {
        diff = check(left[i], [right[i]]);
      } else {
        diff = check(left[i], right[i]);
      }
      if (diff !== 0) return diff;
      i++;
    }
    return i < right.length ? -1 : (i < left.length ? 1 : 0);
  };

  return [
    packets
      .group(2)
      .map(([left, right], i) => {
        return check(left, right) < 0 ? i + 1 : 0;
      })
      .sum(),
    [[[2]], [[6]], ...packets]
      .sort(check)
      .map((packet, i) => {
        return ["[[2]]", "[[6]]"].includes(JSON.stringify(packet)) ? i + 1 : 1;
      })
      .product(),
  ];
};
