import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

/**
 * Determine which games would have been possible if the bag had been loaded with only:
 * - 12 red cubes
 * - 13 green cubes
 * - 14 blue cubes
 */
const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const lines = input.split("\n");

  const games = lines.reduce((acc, line) => {
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

    return games.length > 0 ? acc : { ...acc, [gameKey]: games };
  }, {});

  return Object.keys(games).reduce((acc, key) => acc + parseInt(key), 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      // {
      //   input: `Game 1: 9 red, 2 green, 13 blue; 10 blue, 2 green, 13 red; 8 blue, 3 red, 6 green; 5 green, 2 red, 1 blue`,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
