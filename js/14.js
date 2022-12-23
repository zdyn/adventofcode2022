export const fns = {
  "Part 1": (input) => {
    const {occupied, maxY} = parse(input);
    let result = 0;
    while (true) {
      const sand = [500, 0];
      while (true) {
        if (!occupied.has(key(sand[0], sand[1] + 1))) {
          sand[1]++;
        } else if (!occupied.has(key(sand[0] - 1, sand[1] + 1))) {
          sand[0]--;
          sand[1]++;
        } else if (!occupied.has(key(sand[0] + 1, sand[1] + 1))) {
          sand[0]++;
          sand[1]++;
        } else {
          result++;
          occupied.add(key(...sand));
          break;
        }
        if (sand[1] >= maxY) return result;
      }
    }
  },
  "Part 2": (input) => {
    const {occupied, maxY} = parse(input);
    let queue = [[500, 0]];
    let result = 1;
    occupied.add(key(500, 0));
    while (queue.length > 0) {
      const next = [];
      for (const [x, y] of queue) {
        for (const [xDiff, yDiff] of [[-1, 1], [0, 1], [1, 1]]) {
          const x2 = x + xDiff;
          const y2 = y + yDiff;
          const k = key(x2, y2);
          if (!occupied.has(k) && y2 < maxY + 2) {
            occupied.add(k);
            result++;
            next.push([x2, y2]);
          }
        }
      }
      queue = next;
    }
    return result;
  },
};

const parse = (input) => {
  const occupied = new Set();
  let maxY = 0;
  input
    .trim()
    .split("\n")
    .forEach((line) => {
      line
        .split(" -> ")
        .map((c) => c.split(",").map(Number))
        .group(2, 1)
        .forEach(([[x1, y1], [x2, y2]]) => {
          if (x1 > x2 || y1 > y2) {
            [x1, y1, x2, y2] = [x2, y2, x1, y1];
          }
          if (x1 === x2) {
            for (let y = y1; y <= y2; y++) occupied.add(key(x1, y));
          } else {
            for (let x = x1; x <= x2; x++) occupied.add(key(x, y1));
          }
          maxY = Math.max(maxY, y1, y2);
        });
    });
  return {occupied, maxY};
};

const key = (...args) => args.join(",");

Array.prototype.group = function(size, step) {
  const groups = [];
  for (let i = 0; i <= this.length - size; i += step) {
    groups.push(this.slice(i, i + size));
  }
  return groups;
};

export const samples = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`;
