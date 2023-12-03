import run from "aocrunner";
import { readFileSync } from "fs";
const inputFile = readFileSync("./src/day02/input.txt", "utf8");

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  return parseInput(rawInput)
    .split("\n")
    .reduce((acc, line) => {
      const [game, cubes] = line.split(": ");
      const gameKey = game.split(" ")[1];

      const games = cubes
        .split("; ")
        .map((subset) =>
          subset.split(", ").reduce((acc, cube) => {
            const [count, color] = cube.split(" ");
            const parsedCount = parseInt(count);

            switch (true) {
              case color === "red" && parsedCount <= 12:
              case color === "green" && parsedCount <= 13:
              case color === "blue" && parsedCount <= 14:
                return acc;
              default:
                return { ...acc, [color]: parsedCount };
            }
          }, {}),
        )
        .filter((game) => Object.keys(game).length > 0);

      return games.length > 0 ? acc : acc + parseInt(gameKey);
    }, 0);

  // return Object.keys(games).reduce((acc, key) => acc + parseInt(key), 0);
};

const part2 = (rawInput: string) => {
  return parseInput(rawInput)
    .split("\n")
    .reduce((acc, line) => {
      const subsets = line.split(": ")[1];

      const gameOutcome = subsets.split("; ").map((subset) =>
        subset.split(", ").reduce(
          (acc, cube) => {
            const [count, color] = cube.split(" ");
            return { ...acc, [color]: parseInt(count) };
          },
          { red: 1, green: 1, blue: 1 },
        ),
      );

      const maxRed = Math.max(...gameOutcome.map(({ red }) => red));
      const maxGreen = Math.max(...gameOutcome.map(({ green }) => green));
      const maxBlue = Math.max(...gameOutcome.map(({ blue }) => blue));

      return acc + maxRed * maxGreen * maxBlue;
    }, 0);
};

run({
  part1: {
    tests: [
      {
        input: inputFile,
        expected: 2283,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: inputFile,
        expected: 78669,
      },
      {
        input: `Game 1: 9 red, 2 green, 13 blue; 10 blue, 2 green, 13 red; 8 blue, 3 red, 6 green; 5 green, 2 red, 1 blue`,
        expected: 1014,
      },
      {
        input: `Game 95: 3 blue, 4 green, 10 red; 5 blue, 17 red, 2 green; 18 red, 2 green, 5 blue; 3 blue, 3 green, 2 red; 4 blue, 18 red; 6 red, 2 green`,
        expected: 360,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
