export const run = (input, isSample) => {
  Array.prototype.sum = function() {
    return this.reduce((agg, num) => agg + num, 0);
  };

  const distance = (y1, x1, y2, x2) => {
    return Math.abs(y2 - y1) + Math.abs(x2 - x1);
  };
  const key = (y, x) => `${y},${x}`;
  const getRanges = (positions, y) => {
    return positions
      .filter(([sx, sy, bx, by, d]) => (sy - d <= y && sy + d >= y))
      .map(([sx, sy, bx, by, d]) => {
        const diff = Math.abs(y - sy);

        return [sx - d + diff, sx + d - diff];
      });
  };
  const splitRanges = (ranges) => {
    for (let i = 0; i < ranges.length; i++) {
      for (let j = i + 1; j < ranges.length; j++) {
        if (ranges[i][0] >= ranges[j][0] && ranges[i][1] <= ranges[j][1]) {
          ranges.splice(i, 1);
          i--;
          break;
        } else if (ranges[i][0] <= ranges[j][0] && ranges[i][1] >= ranges[j][1]) {
          ranges.splice(j, 1);
          j--;
        } else if (ranges[i][0] <= ranges[j][0] && ranges[i][1] >= ranges[j][0]) {
          ranges[j][0] = ranges[i][1] + 1;
        } else if (ranges[i][1] >= ranges[j][1] && ranges[i][0] <= ranges[j][1]) {
          ranges[j][1] = ranges[i][0] - 1;
        }
      }
    }

    return ranges;
  };
  const positions = input
    .trim()
    .split("\n")
    .map((line) => {
      const coords = line.match(/-?\d+/g).map(Number);
      return coords.concat(distance(...coords));
    });
  const p1Y = isSample ? 10 : 2000000;
  const p2Y = isSample ? 20 : 4000000;
  const p1Ranges = getRanges(positions, p1Y);
  const p1Beacons = new Set(
    positions
      .filter(([sx, sy, bx, by]) => by === p1Y)
      .map(([sx, sy, bx, by]) => key(by, bx)),
  );

  let p2 = 0;

  for (let i = 0; i < p2Y; i++) {
    const p2Ranges = getRanges(positions, i);
    const found = splitRanges(p2Ranges)
      .sort((a, b) => a[0] - b[0])
      .findIndex(([from, to], i) => {
        return i !== 0 && from <= p2Y && to >= 0 && from - p2Ranges[i - 1][1] > 1;
      });
    if (found !== -1) {
      p2 = 4000000 * (p2Ranges[found][0] - 1) + i;
      break;
    }
  }

  return [
    splitRanges(p1Ranges).map(([from, to]) => to - from + 1).sum() - p1Beacons.size,
    p2,
  ];
};

export const samples = `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`;
