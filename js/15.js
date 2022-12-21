export const fns = {
  "Part 1": (input, isSample) => {
    const reports = parse(input);
    const y = isSample ? 10 : 2000000;
    const ranges = getRanges(reports, y);
    splitRanges(ranges);
    const beacons = new Set(reports.filter(({by}) => by === y).map(({bx, by}) => `${bx},${by}`));
    return ranges.map(([a, b]) => b - a + 1).sum() - beacons.size;
  },
  "Part 2": (input, isSample) => {
    const reports = parse(input);
    const limit = isSample ? 20 : 4000000;
    for (let i = 0; i < limit; i++) {
      const ranges = getRanges(reports, i);
      splitRanges(ranges)
      const y = ranges
        .sort((a, b) => a[0] - b[0])
        .findIndex(([from, to], i) => {
          return i !== 0 && from <= limit && to >= 0 && from - ranges[i - 1][1] > 1;
        });
      if (y !== -1) {
        return 4000000 * (ranges[y][0] - 1) + i;
      }
    }
  },
  "Part 1 (alternate)": (input, isSample) => {
    const reports = parse(input);
    const y = isSample ? 10 : 2000000;
    const rangesMap = getRangesMap(reports, null, [y, y]);
    const beacons = new Set(reports.filter(({by}) => by === y).map(({bx, by}) => `${bx},${by}`));
    return rangesMap[y]
      .map(([from, to]) => to - from + 1)
      .sum() - beacons.size;
  },
  "Part 2 (alternate)": (input, isSample) => {
    const reports = parse(input);
    const limit = isSample ? 20 : 4000000;
    const rangesMap = getRangesMap(reports, [0, limit], [0, limit]);
    for (let i = 0; i <= limit; i++) {
      if (rangesMap[i].length > 1) {
        return i + 4000000 * (rangesMap[i][0][1] + 1);
      }
    }
  },
};

const parse = (input) => {
  return input
    .trim()
    .split("\n")
    .map((report) => {
      const [sx, sy, bx, by] = report.match(/-?\d+/g).map(Number);
      const d = Math.abs(by - sy) + Math.abs(bx - sx);
      return {sx, sy, bx, by, d};
    });
};

const getRanges = (reports, y) => {
  return reports
    .filter(({sy, d}) => (sy - d <= y && sy + d >= y))
    .map(({sx, sy, d}) => {
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
};

const getRangesMap = (reports, xLimits, yLimits) => {
  const rangesMap = {};
  for (const {sx, sy, d} of reports) {
    for (let i = 0; i <= d; i++) {
      let x1 = sx - d + i;
      let x2 = sx + d - i;
      if (xLimits != null) {
        if (x2 < xLimits[0] || x1 > xLimits[1]) continue;

        x1 = Math.max(xLimits[0], x1);
        x2 = Math.min(xLimits[1], x2);
      }
      if (yLimits == null || (sy - i >= yLimits[0] && sy - i <= yLimits[1])) {
        addRange(rangesMap, sy - i, x1, x2);
      }
      if (yLimits == null || (sy + i >= yLimits[0] && sy + i <= yLimits[1])) {
        addRange(rangesMap, sy + i, x1, x2);
      }
    }
  }
  return rangesMap;
};

const addRange = (rangesMap, y, x1, x2) => {
  if (rangesMap[y] == null) {
    rangesMap[y] = [[x1, x2]];
    return;
  }

  const ranges = rangesMap[y];
  let i = 0;
  while (i < ranges.length && x1 > ranges[i][0]) i++;
  if (i < ranges.length && x1 === ranges[i][0] && ranges[i][1] < x2) i++;
  if (i > 0 && ranges[i - 1][1] >= x1 - 1) {
    ranges[i - 1][1] = Math.max(ranges[i - 1][1], x2);
    for (let j = i; j < ranges.length; j++) {
      if (ranges[j][0] > ranges[i - 1][1] + 1) break;

      ranges[i - 1][1] = Math.max(ranges[i - 1][1], ranges[j][1]);
      ranges.splice(j, 1);
      j--;
    }
  } else if (i < ranges.length && ranges[i][0] <= x2 + 1) {
    ranges[i][0] = x1;
    ranges[i][1] = Math.max(ranges[i][1], x2);
    for (let j = i + 1; j < ranges.length; j++) {
      if (ranges[j][0] > ranges[i][1] + 1) break;

      ranges[i][1] = Math.max(ranges[i][1], ranges[j][1]);
      ranges.splice(j, 1);
      j--;
    }
  } else {
    ranges.splice(i, 0, [x1, x2]);
  }
};

Array.prototype.sum = function() {
  return this.reduce((agg, num) => agg + num, 0);
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
