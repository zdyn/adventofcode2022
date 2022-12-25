import "./utils.js";

export const fns = {
  "Part 1": (input) => {
    const { valves, rates, tunnels, distances } = parse(input);
    const dfs = (from, visited, time, released) => {
      const totals = [released];
      for (const [to, distance] of Object.entries(distances[from])) {
        if (visited.has(to) || distance >= time) continue;

        visited.add(to);
        totals.push(
          dfs(
            to,
            visited,
            time - distance,
            released + (time - distance) * rates[to]
          )
        );
        visited.delete(to);
      }
      return Math.max(...totals);
    };
    return dfs("AA", new Set(["AA"]), 30, 0);
  },
  "Part 2": (input) => {
    const { valves, rates, tunnels, distances } = parse(input);
    // TODO: Speed up.
    const dfs = ([from1, from2], visited, [time1, time2], released) => {
      const totals = [released];
      if (time1 >= time2) {
        for (const [to, distance] of Object.entries(distances[from1])) {
          if (visited.has(to) || distance >= time1) continue;

          visited.add(to);
          totals.push(
            dfs(
              [to, from2],
              visited,
              [time1 - distance, time2],
              released + (time1 - distance) * rates[to]
            )
          );
          visited.delete(to);
        }
      } else {
        for (const [to, distance] of Object.entries(distances[from2])) {
          if (visited.has(to) || distance >= time2) continue;

          visited.add(to);
          totals.push(
            dfs(
              [from1, to],
              visited,
              [time1, time2 - distance],
              released + (time2 - distance) * rates[to]
            )
          );
          visited.delete(to);
        }
      }
      return Math.max(...totals);
    };
    return dfs(["AA", "AA"], new Set(["AA"]), [26, 26], 0);
  },
};

const parse = (input) => {
  const valves = ["AA"];
  const rates = {};
  const tunnels = {};
  const distances = {};
  input
    .trim()
    .split("\n")
    .forEach((line) => {
      const [from, ...to] = line.match(/[A-Z]{2}/g);
      const rate = Number(line.match(/\d+/)[0]);
      if (rate > 0) {
        rates[from] = rate;
        valves.push(from);
      }
      tunnels[from] = to;
    });
  const bfs = (from, to) => {
    const visited = new Set([from]);
    let distance = 0;
    let queue = [from];
    while (queue.length > 0) {
      const next = [];
      for (const valve of queue) {
        for (const neighbor of tunnels[valve]) {
          if (neighbor === to) return distance + 2;

          if (!visited.has(neighbor)) {
            visited.add(neighbor);
            next.push(neighbor);
          }
        }
      }
      distance++;
      queue = next;
    }
    return distance;
  };
  for (let i = 0; i < valves.length; i++) {
    for (let j = i + 1; j < valves.length; j++) {
      const distance = bfs(valves[i], valves[j]);
      distances[valves[i]] ??= {};
      distances[valves[j]] ??= {};
      distances[valves[i]][valves[j]] = distance;
      distances[valves[j]][valves[i]] = distance;
    }
  }
  return { valves, rates, tunnels, distances };
};

export const samples = `Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
Valve BB has flow rate=13; tunnels lead to valves CC, AA
Valve CC has flow rate=2; tunnels lead to valves DD, BB
Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
Valve EE has flow rate=3; tunnels lead to valves FF, DD
Valve FF has flow rate=0; tunnels lead to valves EE, GG
Valve GG has flow rate=0; tunnels lead to valves FF, HH
Valve HH has flow rate=22; tunnel leads to valve GG
Valve II has flow rate=0; tunnels lead to valves AA, JJ
Valve JJ has flow rate=21; tunnel leads to valve II`;
