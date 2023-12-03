# 🎄 Advent of Code 2023 - day 1 🎄

## Info

Task description: [link](https://adventofcode.com/2023/day/1)

## Notes

### Part 1

### Part 2

Part 2 has a gotcha. `String.match` will not match overlapping strings.

[This Stackoverflow describes it well](https://stackoverflow.com/questions/20833295/how-can-i-match-overlapping-strings-with-regex)

The way to solve it is by using a lookahead. In my case, I used a positive lookahead.

```js
/**
 * This regex will match all numbers in a string
 */
const regex = const numRegex =
      /one|two|three|four|five|six|seven|eight|nine|[1-9]/g;

/**
 * This regex will match all numbers in a string even if they overlap
 * e.g. wrap with (?=(<original_regex>))
 */

const numRegex =
      /(?=(/one|two|three|four|five|six|seven|eight|nine|[1-9]))/g;
```
