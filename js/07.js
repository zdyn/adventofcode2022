export const run = (input) => {
  const lines = input.trim().split("\n");
  const root = {size: 0, children: {}};
  let path = [];

  for (let line of lines) {
    const parts = line.split(" ");
    if (parts[0] === "$") {
      if (parts[1] !== "cd") continue;
      if (parts[2] === "/") {
        path = [];
      } else if (parts[2] === "..") {
        path = path.slice(0, -1);
      } else {
        path.push(parts[2]);
      }
    } else {
      const size = parts[0] === "dir" ? 0 : Number(parts[0]);
      let dir = root;
      dir.size += size;
      for (let p of path) {
        dir = dir.children[p];
        dir.size += size;
      }
      if (parts[0] === "dir") {
        dir.children[parts[1]] = {size: 0, children: {}};
      }
    }
  }

  let dirs = [root];
  let p1 = 0;
  let p2 = Number.MAX_SAFE_INTEGER;
  while (dirs.length > 0) {
    const next = [];
    for (let dir of dirs) {
      const size = dir.size;
      if (size <= 100000) {
        p1 += size;
      }
      if (40000000 >= root.size - size) {
        p2 = Math.min(p2, size);
      }
      next.push(...Object.values(dir.children));
    }
    dirs = next;
  }

  return [
    p1,
    p2,
  ];
};
