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

  return input.split("\n").reduce((acc, curr) => {
    /**
     * TIL: Use Positive Lookahead to match all numbers
     * - including overlapping number words like `twone`
     * - https://stackoverflow.com/questions/20833295/how-can-i-match-overlapping-strings-with-regex
     */
    const numRegex =
      /(?=(one|two|three|four|five|six|seven|eight|nine|[1-9]))/g;
    const numArray = Array.from(curr.matchAll(numRegex), (match) => match[1]);
    const firstAndLastDigit = [numArray[0], numArray[numArray.length - 1]];

    const renamed = firstAndLastDigit.map((item) => {
      if (item === "one") return "1";
      if (item === "two") return "2";
      if (item === "three") return "3";
      if (item === "four") return "4";
      if (item === "five") return "5";
      if (item === "six") return "6";
      if (item === "seven") return "7";
      if (item === "eight") return "8";
      if (item === "nine") return "9";
      return item;
    });

    return acc + parseInt(renamed.join(""));
  }, 0);
};

run({
  part1: {
    tests: [
      {
        input: "fivepqxlpninevh2xxsnsgg63pbvdnqptmg",
        expected: 23,
      },
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
        input: "fivepqxlpninevh2xxsnsgg63pbvdnqptmg",
        expected: 53,
      },
      {
        input: inputFile,
        expected: 53894,
      },
      {
        input: "649twomktwonebx", // Overlapping two and one
        expected: 61,
      },
      {
        input: "sbglrkhrhrfldkftzfknblj1twonemm", // Overlapping two and one
        expected: 11,
      },
      {
        input: "sixtqsmcrseveninenblqqnjgx", // Overlapping seven and nine
        expected: 69,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
