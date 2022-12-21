export const fns = {
  "Part 1": (input) => {
    return mix(input.trim().split("\n").map(Number), 1);
  },
  "Part 2": (input) => {
    return mix(input.trim().split("\n").map((num) => Number(num) * 811589153), 10);
  },
  "Part 1 (linked list)": (input) => {
    return ll(input.trim().split("\n").map(Number), 1);
  },
  "Part 2 (linked list)": (input) => {
    return ll(input.trim().split("\n").map((num) => Number(num) * 811589153), 10);
  },
};

const mix = (nums, count) => {
  const len = nums.length - 1;
  const numIdxs = nums.map((num, i) => i);
  const idxIdxs = nums.map((num, i) => i);
  while (count-- > 0) {
    for (let i = 0; i < numIdxs.length; i++) {
      const from = numIdxs[i];
      const num = nums[from];
      const to = (num % len + len + from) % len;
      if (to === from) continue;

      nums.splice(from, 1)[0];
      if (from < to) {
        for (let j = from; j < to; j++) {
          idxIdxs[j] = idxIdxs[j + 1];
          numIdxs[idxIdxs[j]] = j;
        }
      } else {
        for (let j = from; j > to; j--) {
          idxIdxs[j] = idxIdxs[j - 1];
          numIdxs[idxIdxs[j]] = j;
        }
      }
      idxIdxs[to] = i;
      numIdxs[idxIdxs[to]] = to;
      nums.splice(to, 0, num);
    }
  }
  const i = nums.findIndex((num) => num === 0);
  return nums[(1000 + i) % nums.length] +
    nums[(2000 + i) % nums.length] +
    nums[(3000 + i) % nums.length];
};

const ll = (nums, count) => {
  let start;
  const nodes = nums.map((num) => {
    const ref = {val: num, prev: null, next: null};
    if (num === 0) start = ref;
    return ref;
  });
  for (let i = 0; i < nums.length; i++) {
    nodes[i].next = nodes[(i + 1) % nums.length];
    nodes[(i + 1) % nums.length].prev = nodes[i];
  }
  while (count-- > 0) {
    for (const node of nodes) {
      let {val, prev, next} = node;
      if (val === 0) continue;

      prev.next = next;
      next.prev = prev;
      if (val < 0) {
        for (let i = 0; i > val % (nodes.length - 1); i--) prev = prev.prev;
      } else {
        for (let i = 0; i < val % (nodes.length - 1); i++) prev = prev.next;
      }
      node.next = prev.next;
      node.next.prev = node;
      prev.next = node;
      node.prev = prev;
    }
  }
  return [1000, 2000, 3000].reduce((agg, target) => {
    let node = start;
    for (let i = 0; i < target % nodes.length; i++) node = node.next;
    return agg + node.val;
  }, 0);
};

export const samples = `1
2
-3
3
-2
0
4`;
