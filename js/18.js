export const fns = {
  "Part 1": (input) => {
    const coords = parse(input);
    const visited = new Set();
    let sum = 0;
    for (const coord of coords) {
      sum += 6;
      const k = key(...coord);
      visited.add(k);
      for (const neighbor of neighbors(...coord)) {
        if (visited.has(key(...neighbor))) sum -= 2;
      }
    }
    return sum;
  },
  "Part 2": (input) => {
    const coords = parse(input);
    const cubes = new Set();
    let min = Array(3).fill(Number.MAX_SAFE_INTEGER);
    let max = Array(3).fill(0);
    for (const coord of coords) {
      cubes.add(key(...coord));
      coord.forEach((num, i) => {
        min[i] = Math.min(min[i], num);
        max[i] = Math.max(max[i], num);
      });
    }
    min = min.map((num) => num - 1);
    max = max.map((num) => num + 1);
    const visited = new Set(key(...min));
    let sum = 0;
    let queue = [min];
    while (queue.length > 0) {
      const next = [];
      for (const coord of queue) {
        for (const neighbor of neighbors(...coord)) {
          if (neighbor.some((num, i) => num < min[i] || num > max[i])) continue;

          const k = key(...neighbor);
          if (cubes.has(k)) {
            sum++;
          } else if (!visited.has(k)) {
            visited.add(k);
            next.push(neighbor);
          }
        }
      }
      queue = next;
    }
    return sum;
  },
};

const parse = (input) => {
  return input
    .trim()
    .split("\n")
    .map((line) => line.split(",").map(Number));
};

const key = (...args) => args.join(",");

const neighbors = (x, y, z) => {
  return [
    [x - 1, y, z],
    [x + 1, y, z],
    [x, y - 1, z],
    [x, y + 1, z],
    [x, y, z - 1],
    [x, y, z + 1],
  ];
};

export const samples = `2,2,2
1,2,2
3,2,2
2,1,2
2,3,2
2,2,1
2,2,3
2,2,4
2,2,6
1,2,5
3,2,5
2,1,5
2,3,5`;
