import run from "aocrunner";
import _ from "lodash";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const lines = input.split("\n").map((line) => line.split(" | "));

  const points = lines.reduce((acc, line, currentIndex) => {
    const [winningNumbers, numbersIHave] = line;

    const winningNumbersArray = winningNumbers
      .substring(10)
      .split(" ")
      .filter((n) => n !== "")
      .map((n) => parseInt(n, 10));

    const numbersIHaveArray = numbersIHave
      .split(" ")
      .filter((n) => n !== "")
      .map((n) => parseInt(n.trim(), 10));

    const intersection = _.intersection(winningNumbersArray, numbersIHaveArray);
    const points = intersection.reduce((acc, val, currentIndex) => {
      return currentIndex === 0 ? 1 : acc * 2;
    }, 0);

    return acc + points;
  }, 0);

  return points;
};

type Card = {
  cardNumber: string;
  winningNumbers: Array<string>;
  cardNumbers: Array<string>;
};

function checkHits(card: Card) {
  return card.cardNumbers.reduce((acc, cardNumber) => {
    return card.winningNumbers.includes(cardNumber) ? acc + 1 : acc;
  }, 0);
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  /**
   * Use regex with match groups to allow for
   * destructuring each section of the line
   * So much easier than splitting and trimming
   * Regex is so powerful! I always love learning more about it
   */
  const lineRegex =
    /^Card\s+(?<cardNumber>\d+):\s+(?<winningNums>.+)\|(?<cardNums>.+)$/;

  const cards: Card[] = input.split("\n").map((line) => {
    const match = line.match(lineRegex);
    const { cardNumber, winningNums, cardNums } = match?.groups ?? {};
    const parseNumsStr = (str: string) => str.trim().split(" ").filter(Boolean);

    return {
      cardNumber,
      winningNumbers: parseNumsStr(winningNums),
      cardNumbers: parseNumsStr(cardNums),
    };
  });

  const cardInstances = cards.reduce<Record<string, number>>((acc, card) => {
    return { ...acc, [card.cardNumber]: 1 };
  }, {});

  cards.forEach((card, i) => {
    const hits: number = checkHits(card);

    /**
     * Create a new array that starts from the card after the current one
     * and ends at the card that is hits cards after the current one,
     * and then iterates over each nextCard in this new array.
     */
    cards.slice(i + 1, i + 1 + hits).forEach((nextCard) => {
      cardInstances[nextCard.cardNumber] =
        (cardInstances[nextCard.cardNumber] ?? 0) +
        cardInstances[card.cardNumber];
    });
  });

  // Return the Sum of all card instances
  return Object.values(cardInstances).reduce((sum, val) => sum + val, 0);
};

run({
  part1: {
    tests: [
      {
        input: `
Card   1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card   2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card   3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card   4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card   5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card   6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
          `,
        expected: 13,
      },
      {
        input: `Card   1: 47 10 77 75 94 50 93 43 27 18 | 73 75 32 65 98 76 71 13 50 78 54 94 18 83 77  6 79 93 45 27 87 57 51 55 43`,
        expected: 128,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
Card   1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card   2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card   3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card   4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card   5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card   6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
        `,
        expected: 30,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
