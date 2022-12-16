export const run = (input) => {
  Array.prototype.group = function(size, step) {
    const groups = [];
    for (let i = 0; i <= this.length - size; i += step) {
      groups.push(this.slice(i, i + size));
    }
    return groups;
  };

  const coords = {};
  const key = (x, y) => `${x},${y}`;
  const occupied = (x, y) => {
    return coords[key(x, y)] || y === maxY + 2;
  };
  let minX = Number.MAX_SAFE_INTEGER;
  let maxX = 0;
  let maxY = 0;
  let p1Done = false;
  let p1 = 0;
  let p2 = 0;

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
            for (let y = y1; y <= y2; y++) coords[key(x1, y)] = true;
          } else {
            for (let x = x1; x <= x2; x++) coords[key(x, y1)] = true;
          }
          minX = Math.min(minX, x1, x2);
          maxX = Math.max(maxX, x1, x2);
          maxY = Math.max(maxY, y1, y2);
        });
    });

  while (true) {
    const sand = [500, 0];

    while (true) {
      if (!occupied(sand[0], sand[1] + 1)) {
        sand[1]++;
      } else if (!occupied(sand[0] - 1, sand[1] + 1)) {
        sand[0]--;
        sand[1]++;
      } else if (!occupied(sand[0] + 1, sand[1] + 1)) {
        sand[0]++;
        sand[1]++;
      } else {
        p1Done = p1Done || sand[1] >= maxY;
        if (!p1Done) {
          p1++;
        }
        p2++;
        coords[key(sand[0], sand[1])] = true;
        break;
      }
    }
    if (sand[0] === 500 && sand[1] === 0) break;
  }

  return [
    p1,
    p2,
  ];
};

export const samples = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`;
