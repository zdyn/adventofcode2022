export const fns = {
  "Part 1": (input) => {
    const root = parse(input);
    let result = 0;
    let queue = [root];
    while (queue.length > 0) {
      const next = [];
      for (const dir of queue) {
        if (dir.size <= 100000) {
          result += dir.size;
        }
        next.push(...Object.values(dir.children));
      }
      queue = next;
    }
    return result;
  },
  "Part 2": (input) => {
    const root = parse(input);
    let result = Number.MAX_SAFE_INTEGER;
    let queue = [root];
    while (queue.length > 0) {
      const next = [];
      for (const dir of queue) {
        if (40000000 >= root.size - dir.size && dir.size < result) {
          result = dir.size;
        }
        next.push(...Object.values(dir.children));
      }
      queue = next;
    }
    return result;
  },
};

const parse = (input) => {
  const root = {size: 0, children: {}};
  let path = [];
  for (const line of input.trim().split("\n")) {
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
      for (const p of path) {
        dir = dir.children[p];
        dir.size += size;
      }
      if (parts[0] === "dir") {
        dir.children[parts[1]] = {size: 0, children: {}};
      }
    }
  }
  return root;
};

export const samples = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;
