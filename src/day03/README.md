# 🎄 Advent of Code 2023 - day 3 🎄

## Info

Task description: [link](https://adventofcode.com/2023/day/3)

## Notes

This was a challenge!

- But a fun one

## Solution 1

### GitHub Copilot explanation of my code for Solution 1

1. We parse the input into a list of symbols and a list of numbers for each line
2. We iterate through each line's number list
3. For each number, we check if there is a symbol in the previous line, current line, or next line that is adjacent to the number
4. If there is, we add the number to the sum
5. We repeat this process for each line \*/

## Solution 2

### GitHub Copilot explanation of my code for Solution 2

1. We build a map of each line in the input
2. We build a map of each number location in each line
3. We build a map of each asterisk location in each line
4. We iterate over each number location in each line and find the asterisks that are adjacent to it
5. We do this for the line before, the current line and the line after
6. We merge all of these maps together
7. We check to see if the merged map has two values in its array
8. If it does, we multiply them together and return the result
9. If it doesn't, we return 0
