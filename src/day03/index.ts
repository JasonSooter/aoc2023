import run from "aocrunner";
import { readFileSync } from "fs";
import _ from "lodash";
const inputFile = readFileSync("./src/day03/input.txt", "utf8");

type SymbolLocation = {
  symbol: string;
  index: number;
  line: number;
};

type SymbolLocations = {
  [key: string]: Array<SymbolLocation>;
};

type NumberLocation = {
  number: string;
  index: number;
  length: number;
  startRange: number;
  endRange: number;
};

type NumberLocations = {
  [key: string]: Array<NumberLocation>;
};

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const symbolLocations: SymbolLocations = input
    .split("\n")
    .reduce((acc, line, index) => {
      const symbols = Array.from(line.matchAll(/[^0-9.]/g)).map((match) => ({
        symbol: match[0],
        index: match.index,
      }));

      return { ...acc, [index]: [...symbols] };
    }, {});

  const numberLocations: NumberLocations = input
    .split("\n")
    .reduce((acc, line, index) => {
      const numbers = Array.from(line.matchAll(/\d+/g)).map((match) => {
        if (match.index === undefined) return;
        return {
          number: match[0],
          index: match.index,
          length: match[0].length,
          startRange: match.index - 1,
          endRange: match.index + match[0].length + 1,
        };
      });

      return { ...acc, [index]: [...numbers] };
    }, {});

  return Object.values(numberLocations).reduce((acc, line, currentIndex) => {
    const adjacentNumberSum: number = line.reduce((acc, number) => {
      function isSymbolAdjacent(symbolLocationList: Array<SymbolLocation>) {
        return symbolLocationList !== undefined
          ? symbolLocationList?.map(
              (symbol) =>
                symbol.index >= number.startRange &&
                symbol.index < number.endRange,
            )
          : [false];
      }

      const hasAdjacentSymbol = [
        ...isSymbolAdjacent(symbolLocations[currentIndex - 1] ?? []),
        ...isSymbolAdjacent(symbolLocations[currentIndex]),
        ...isSymbolAdjacent(symbolLocations[currentIndex + 1]),
      ].some((val) => val === true);

      return hasAdjacentSymbol ? acc + parseInt(number.number) : acc;
    }, 0);

    return acc + adjacentNumberSum;
  }, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const symbolLocations: SymbolLocations = input
    .split("\n")
    .reduce((acc, line, index) => {
      const symbols = Array.from(line.matchAll(/\*/g)).map((match) => ({
        symbol: match[0],
        index: match.index,
        line: index,
      }));

      return { ...acc, [index]: [...symbols] };
    }, {});

  const numberLocations: NumberLocations = input
    .split("\n")
    .reduce((acc, line, index) => {
      const numbers = Array.from(line.matchAll(/\d+/g)).map((match) => {
        if (match.index === undefined) return;
        return {
          number: match[0],
          index: match.index,
          length: match[0].length,
          startRange: match.index - 1,
          endRange: match.index + match[0].length + 1,
        };
      });

      return { ...acc, [index]: [...numbers] };
    }, {});

  const beforeResult = Object.values(numberLocations).reduce(
    (acc, number, currentIndex) => {
      const adjacentNumbers = number.reduce((acc, numberLocation) => {
        const before = asteriskAdjacentLocations(
          symbolLocations[currentIndex - 1] ?? [],
          numberLocation,
        );
        return _.mergeWith(acc, before, customizer);
      }, {});

      return { ...acc, ...adjacentNumbers };
    },
    {},
  );

  const currentResult = Object.values(numberLocations).reduce(
    (acc, number, currentIndex) => {
      const adjacentNumbers = number.reduce((acc, numberLocation) => {
        const current = asteriskAdjacentLocations(
          symbolLocations[currentIndex],
          numberLocation,
        );
        return _.mergeWith(acc, current, customizer);
      }, {});

      return { ...acc, ...adjacentNumbers };
    },
    {},
  );

  const afterResult = Object.values(numberLocations).reduce(
    (acc, number, currentIndex) => {
      const adjacentNumbers = number.reduce((acc, numberLocation) => {
        const after = asteriskAdjacentLocations(
          symbolLocations[currentIndex + 1],
          numberLocation,
        );

        return _.mergeWith(acc, after, customizer);
      }, {});

      return { ...acc, ...adjacentNumbers };
    },
    {},
  );

  const finalMerge = _.mergeWith(
    _.mergeWith(beforeResult, currentResult, customizer),
    afterResult,
    customizer,
  );

  const values: Array<number[]> = Object.values(finalMerge);

  return values.reduce(
    (acc, arr) => (arr.length === 2 ? acc + arr[0] * arr[1] : acc),
    0,
  );
};

function customizer(objValue: any, srcValue: any) {
  return _.isArray(objValue) ? objValue.concat(srcValue) : objValue;
}

function asteriskAdjacentLocations(
  symbolLocationList: Array<SymbolLocation>,
  numberLocation: NumberLocation,
) {
  return symbolLocationList?.reduce((acc, symbol) => {
    const hasAdjacentAsterisk =
      symbol.index >= numberLocation.startRange &&
      symbol.index < numberLocation.endRange;
    const key: string = `${symbol.line}|${symbol.index}`;

    return hasAdjacentAsterisk
      ? { ...acc, [key]: [parseInt(numberLocation.number)] }
      : acc;
  }, {});
}

run({
  part1: {
    tests: [
      {
        input: `
.........398.............551.....................452..................712.996.................646.40...1.....875..958.553...................
.......................................-.........*.../...........#.......*.......................*.....*.............*............*.........
`,
        expected: 4358,
      },
      {
        input: `
.........398.............551.....................452..................712.996.................646.40...1.....875..958.553...................
..................................661..-844......*.../781...835..#163....*.......698.239.........*.....*.............*............*57.......
.....................&...............*......+.......................................*.........-.............................................
`,
        expected: 7801,
      },
      {
        input: `
............%...............+............*.........................+....*...................*......+.............../...../.............*....
................490......519../...........16....%...42.822..486......214..../...............985.480..............798....................249.
........369*........317*.........632...#.............=...*.$........................-703.............+341............88.....*659...@........
............595.........566.............847............456...................................182.........................791........533.....
`,
        expected: 10788,
      },
      {
        input: `
................#..................................&...........................................#...........*....$...........................
...=............................../.............995...........*..689.....*.....-....#..............*604..696.......489..........+...193.&336
.......................................+...........................*...........................................-..%.........................
`,
        expected: 3809,
      },
      {
        input: inputFile,
        expected: 544433,
      },
      {
        input: inputFile,
        expected: 544433,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..        
        `,
        expected: 467835,
      },
      {
        input: `
...712.996...
......*......       
        `,
        expected: 709152,
      },
      {
        input: inputFile,
        expected: 76314915,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
