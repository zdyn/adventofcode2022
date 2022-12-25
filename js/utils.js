Array.prototype.forMatrix = function (fn) {
  for (let i = 0; i < this.length; i++) {
    for (let j = 0; j < this[i].length; j++) {
      fn(this[i][j], i, j);
    }
  }
  return this;
};

Array.prototype.group = function (size, step) {
  step ??= size;
  const groups = [];
  for (let i = 0; i <= this.length - size; i += step) {
    groups.push(this.slice(i, i + size));
  }
  return groups;
};

Array.prototype.mapMatrix = function (fn) {
  return this.map((row, i) => row.map((c, j) => fn(c, i, j)));
};

Array.prototype.product = function () {
  return this.reduce((agg, num) => agg * num, 1);
};

Array.prototype.sum = function () {
  return this.reduce((agg, num) => agg + num, 0);
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

String.prototype.group = function (size) {
  const groups = [];
  for (let i = 0; i < this.length; i += size) {
    groups.push(this.slice(i, i + size));
  }
  return groups;
};

export const extractNumbers = (nums) => nums.match(/\-?\d+/g).map(Number);

export const fkey = (k) => k.split(",").map(Number);

export const key = (...args) => [].concat(args).join(",");

export const parseGrid = (grid) => grid.split("\n").map((r) => r.split(""));
