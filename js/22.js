export const fns = {
  "Part 1": (input) => {
    const parts = input.split("\n\n");
    const map = parseMap(parts[0]);
    setFlatMap(map);
    const { node, face } = move(
      map[0].find((n) => n != null && n.val === "."),
      "U",
      parseMoves(parts[1].trim())
    );
    return (
      1000 * (node.x + 1) + 4 * (node.y + 1) + { R: 0, D: 1, L: 2, U: 3 }[face]
    );
  },
  "Part 2": (input, isSample) => {
    const parts = input.split("\n\n");
    const map = parseMap(parts[0]);
    isSample ? setSampleCubeMap(map) : setCubeMap(map);
    const { node, face } = move(
      map[0].find((n) => n != null && n.val === "."),
      "U",
      parseMoves(parts[1].trim())
    );
    return (
      1000 * (node.x + 1) + 4 * (node.y + 1) + { R: 0, D: 1, L: 2, U: 3 }[face]
    );
  },
};

const parseMap = (input) => {
  return input.split("\n").map((row, x) => {
    return row.split("").map((val, y) => (val !== " " ? { val, x, y } : null));
  });
};

const parseMoves = (input) => {
  return ("R" + input)
    .match(/[LR]\d+/g)
    .map((move) => ({ turn: move[0], num: Number(move.slice(1)) }));
};

const setFlatMap = (map) => {
  const valid = (n) => n != null && ".#".includes(n.val);
  map.forMatrix((node, i, j) => {
    if (node == null) return;

    if (map[i - 1] == null || map[i - 1][j] == null) {
      node.U = {
        node: map[map.map((r) => r[j]).findLastIndex(valid)][j],
        face: "U",
      };
    } else {
      node.U = { node: map[i - 1][j], face: "U" };
    }
    if (map[i + 1] == null || map[i + 1][j] == null) {
      node.D = {
        node: map[map.map((r) => r[j]).findIndex(valid)][j],
        face: "D",
      };
    } else {
      node.D = { node: map[i + 1][j], face: "D" };
    }
    if (map[i][j - 1] == null) {
      node.L = { node: map[i][map[i].findLastIndex(valid)], face: "L" };
    } else {
      node.L = { node: map[i][j - 1], face: "L" };
    }
    if (map[i][j + 1] == null) {
      node.R = { node: map[i][map[i].findIndex(valid)], face: "R" };
    } else {
      node.R = { node: map[i][j + 1], face: "R" };
    }
  });
};

const setSampleCubeMap = (map) => {
  map.forMatrix((node, i, j) => {
    if (node == null) return;

    if (map[i - 1] == null || map[i - 1][j] == null) {
      if (j < 4) {
        node.U = { node: map[0][11 - j], face: "D" };
      } else if (j < 8) {
        node.U = { node: map[j - 4][8], face: "R" };
      } else if (j < 12) {
        node.U = { node: map[4][11 - j], face: "D" };
      } else {
        node.U = { node: map[19 - j][11], face: "L" };
      }
    } else {
      node.U = { node: map[i - 1][j], face: "U" };
    }
    if (map[i + 1] == null || map[i + 1][j] == null) {
      if (j < 4) {
        node.D = { node: map[11][11 - j], face: "U" };
      } else if (j < 8) {
        node.D = { node: map[15 - j][8], face: "R" };
      } else if (j < 12) {
        node.D = { node: map[7][11 - j], face: "U" };
      } else {
        node.D = { node: map[19 - j][0], face: "R" };
      }
    } else {
      node.D = { node: map[i + 1][j], face: "D" };
    }
    if (map[i][j - 1] == null) {
      if (i < 4) {
        node.L = { node: map[4][i + 4], face: "D" };
      } else if (i < 8) {
        node.L = { node: map[11][19 - i], face: "U" };
      } else {
        node.L = { node: map[15 - i][8], face: "U" };
      }
    } else {
      node.L = { node: map[i][j - 1], face: "L" };
    }
    if (map[i][j + 1] == null) {
      if (i < 4) {
        node.R = { node: map[11 - i][15], face: "L" };
      } else if (i < 8) {
        node.R = { node: map[8][19 - i], face: "D" };
      } else {
        node.R = { node: map[11 - i][11], face: "L" };
      }
    } else {
      node.R = { node: map[i][j + 1], face: "R" };
    }
  });
};

const setCubeMap = (map) => {
  map.forMatrix((node, i, j) => {
    if (node == null) return;

    if (map[i - 1] == null || map[i - 1][j] == null) {
      if (j < 50) {
        node.U = { node: map[j + 50][50], face: "R" };
      } else if (j < 100) {
        node.U = { node: map[j + 100][0], face: "R" };
      } else {
        node.U = { node: map[199][j - 100], face: "U" };
      }
    } else {
      node.U = { node: map[i - 1][j], face: "U" };
    }
    if (map[i + 1] == null || map[i + 1][j] == null) {
      if (j < 50) {
        node.D = { node: map[0][j + 100], face: "D" };
      } else if (j < 100) {
        node.D = { node: map[j + 100][49], face: "L" };
      } else {
        node.D = { node: map[j - 50][99], face: "L" };
      }
    } else {
      node.D = { node: map[i + 1][j], face: "D" };
    }
    if (map[i][j - 1] == null) {
      if (i < 50) {
        node.L = { node: map[149 - i][0], face: "R" };
      } else if (i < 100) {
        node.L = { node: map[100][i - 50], face: "D" };
      } else if (i < 150) {
        node.L = { node: map[149 - i][50], face: "R" };
      } else {
        node.L = { node: map[0][i - 100], face: "D" };
      }
    } else {
      node.L = { node: map[i][j - 1], face: "L" };
    }
    if (map[i][j + 1] == null) {
      if (i < 50) {
        node.R = { node: map[149 - i][99], face: "L" };
      } else if (i < 100) {
        node.R = { node: map[49][i + 50], face: "U" };
      } else if (i < 150) {
        node.R = { node: map[149 - i][149], face: "L" };
      } else {
        node.R = { node: map[149][i - 100], face: "U" };
      }
    } else {
      node.R = { node: map[i][j + 1], face: "R" };
    }
  });
};

const move = (node, face, moves) => {
  for (let { turn, num } of moves) {
    face = {
      UL: "L",
      DR: "L",
      DL: "R",
      UR: "R",
      LL: "D",
      RR: "D",
      RL: "U",
      LR: "U",
    }[`${face}${turn}`];
    while (num-- > 0 && node[face].node.val !== "#") {
      const next = node[face];
      node = next.node;
      face = next.face;
    }
  }
  return { node, face };
};

Array.prototype.forMatrix = function (fn) {
  for (let i = 0; i < this.length; i++) {
    for (let j = 0; j < this[i].length; j++) {
      fn(this[i][j], i, j);
    }
  }
};

export const samples = `        ...#
        .#..
        #...
        ....
...#.......#
........#...
..#....#....
..........#.
        ...#....
        .....#..
        .#......
        ......#.

10R5L5R10L4R5L5`;
