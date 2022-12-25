import "./utils.js";

export const fns = {
  "Part 1": (input) => {
    return input
      .trim()
      .split("\n")
      .reduce((agg, snafu) => {
        let next = "";
        let carry = 0;
        let i = 0;
        while (carry !== 0 || i < Math.max(agg.length, snafu.length)) {
          const aDigit = { "=": -2, "-": -1, 0: 0, 1: 1, 2: 2 }[
            agg[agg.length - i - 1] || 0
          ];
          const sDigit = { "=": -2, "-": -1, 0: 0, 1: 1, 2: 2 }[
            snafu[snafu.length - i - 1] || 0
          ];
          const sum = carry + aDigit + sDigit;
          carry = 0;
          if (sum % 5 > 2) {
            next = { "-2": "=", "-1": "-" }[(sum % 5) - 5] + next;
            carry = Math.floor(sum / 5) + 1;
          } else if (sum % 5 < -2) {
            next = (sum % 5) + 5 + next;
            carry = Math.floor(sum / 5);
          } else {
            next = { "-2": "=", "-1": "-", 0: 0, 1: 1, 2: 2 }[sum % 5] + next;
            carry = Math.floor((sum - sum % 5) / 5);
          }
          i++;
        }
        return next;
      }, "");
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
