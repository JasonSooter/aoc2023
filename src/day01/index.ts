import run from "aocrunner";
import { readFileSync } from "fs";
const inputFile = readFileSync("./src/day01/input.txt", "utf8");

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  /**
   * 1. Split input by new line
   * 2. Remove all non-numeric characters
   * 3. Concatenate first and last digit of each number
   * 4. Sum all numbers
   */
  return input.split("\n").reduce((acc, curr) => {
    const numbers = curr.replace(/\D/g, "");
    const firstDigit = numbers.slice(0, 1);
    const lastDigit = numbers.slice(-1);
    return acc + parseInt(`${firstDigit}${lastDigit}`);
  }, 0); // 53651
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  /**
   * 1. Split input by new line
   * 2. Remove all non-numeric characters
   * 3. Concatenate first and last digit of each number
   * 4. Sum all numbers
   */

  // return input.split("\n").reduce((acc, curr) => {
  //   const firstNumberReplaced = curr
  //     .replace(/(one)/, "1")
  //     .replace(/(two)/, "2")
  //     .replace(/(three)/, "3")
  //     .replace(/(four)/, "4")
  //     .replace(/(five)/, "5")
  //     .replace(/(six)/, "6")
  //     .replace(/(seven)/, "7")
  //     .replace(/(eight)/, "8")
  //     .replace(/(nine)/, "9")
  //     .replace(/\D/, "");
  //   const lastNumberReplaced = curr
  //     .replace(/(one)/, "1")
  //     .replace(/(two)/, "2")
  //     .replace(/(three)/, "3")
  //     .replace(/(four)/, "4")
  //     .replace(/(five)/, "5")
  //     .replace(/(six)/, "6")
  //     .replace(/(seven)/, "7")
  //     .replace(/(eight)/, "8")
  //     .replace(/(nine)/, "9")
  //     .replace(/\D/, "");

  //   const firstDigit = firstNumberReplaced.slice(0, 1);
  //   const lastDigit = lastNumberReplaced.slice(-1);
  //   const firstAndLastDigit = `${firstDigit}${lastDigit}`;
  //   return acc + parseInt(firstAndLastDigit); }, 0);
  return;
};

run({
  part1: {
    tests: [
      {
        input: inputFile,
        expected: 53651,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: inputFile,
        expected: 53148,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
