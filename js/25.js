export const fns = {
  "Part 1": (input) => {
    let fuel = input
      .trim()
      .split("\n")
      .map((req) => {
        return req
          .split("")
          .reverse()
          .reduce((agg, c, i) => {
            return (
              agg + Math.pow(5, i) * { 2: 2, 1: 1, 0: 0, "-": -1, "=": -2 }[c]
            );
          }, 0);
      })
      .reduce((agg, num) => agg + num, 0);
    let snafu = "";
    let mult = 1;
    let exp = Math.floor(Math.log(fuel) / Math.log(5));
    while (exp >= 0) {
      const place = Math.pow(5, exp);
      const rem = fuel % place;
      let div = (fuel - rem) / place;
      let max = 0;
      for (let i = 0; i < exp; i++) {
        max += Math.pow(5, i) * 2;
      }
      if (rem > max) div++;
      snafu += { "-2": "=", "-1": "-", 0: 0, 1: 1, 2: 2 }[div * mult];
      if (rem > max) mult *= -1;
      fuel = Math.abs(fuel - div * place);
      exp--;
    }
    return snafu;
  },
};

export const samples = `1=-0-2
12111
2=0=
21
2=01
111
20012
112
1=-1=
1-12
12
1=
122`;
