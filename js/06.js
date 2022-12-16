export const run = (input) => {
  const chars = input.trim().split("");
  const find = (size) => {
    for (let i = 0; i < chars.length - size; i++) {
      if (new Set(chars.slice(i, i + size)).size !== size) continue;

      return i + size;
    }
  };

  return [
    find(4),
    find(14),
  ];
};

export const samples = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`;
