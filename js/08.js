export const run = (input) => {
  const mat = input
    .trim()
    .split("\n")
    .map((line) => line.split("").map(Number));
  let visible = 0;
  let maxScore = 0;

  for (let i = 0; i < mat.length; i++) {
    for (let j = 0; j < mat[i].length; j++) {
      const tree = mat[i][j];
      const views = [
        mat[i].slice(0, j).reverse(),
        mat[i].slice(j + 1),
        mat.map((row) => row[j]).slice(0, i).reverse(),
        mat.map((row) => row[j]).slice(i + 1),
      ];

      if (views.some((view) => view.every((h) => h < tree))) {
        visible++;
      }
      maxScore = Math.max(
        maxScore,
        views.reduce((agg, view) => {
          const i = view.findIndex((h) => h >= tree);
          return agg * (i === -1 ? view.length : i + 1);
        }, 1),
      );
    }
  }

  return [
    visible,
    maxScore,
  ];
};

export const samples = `30373
25512
65332
33549
35390`;
