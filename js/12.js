export const run = (input) => {
  let start;
  let end;
  const as = [];
  const letters = "abcdefghijklmnopqrstuvwxyz"
    .split("")
    .reduce((agg, letter, i) => {
      agg[letter] = i;
      return agg;
    }, {"S": 0, "E": 25});
  const matrix = input
    .trim()
    .split("\n")
    .map((line, i) => {
      const row = line.split("");
      row.forEach((c, j) => {
        if (c === "S") {
          start = [i, j];
        } else if (c === "E") {
          end = [i, j];
        } else if (c === "a") {
          as.push([i, j]);
        }
      });
      return row;
    });
  const distances = {[end.join(",")]: 0};

  let queue = [end];
  while (queue.length > 0) {
    const next = [];

    for (let [x, y] of queue) {
      const key = `${x},${y}`;
      const distance = distances[key] + 1;

      for (let [xDiff, yDiff] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
        const x2 = x + xDiff;
        const y2 = y + yDiff;
        const key2 = `${x2},${y2}`;

        if (
          x2 < 0 || y2 < 0 || x2 >= matrix.length || y2 >= matrix[x2].length ||
          letters[matrix[x2][y2]] - letters[matrix[x][y]] < -1 ||
          (distances[key2] != null && distances[key2] <= distance)
        ) continue;

        distances[key2] = distance;
        next.push([x2, y2]);
      }
    }
    queue = next;
  }

  return [
    distances[start],
    as.reduce((agg, [x, y]) => {
      const distance = distances[`${x},${y}`];
      return distance == null ? agg : Math.min(agg, distance);
    }, Number.MAX_SAFE_INTEGER),
  ];
};

export const samples = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;
