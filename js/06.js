export const fns = {
  "Part 1": (input) => find(input.trim().split(""), 4),
  "Part 2": (input) => find(input.trim().split(""), 14),
};

const find = (chars, size) => {
  for (let i = 0; i < chars.length - size; i++) {
    if (new Set(chars.slice(i, i + size)).size !== size) continue;

    return i + size;
  }
};

export const samples = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`;
