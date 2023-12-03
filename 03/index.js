// --- Day 3: Gear Ratios ---

import { readFileLines } from '../util/read-file-lines.mjs'

//

const testInput = readFileLines('./test-input.txt')
const input = readFileLines('./input.txt')

const chars = input.reduce((acc, line, row) => {
  const pattern = new RegExp(/[^\d\.]/g)
  for (let match; match = pattern.exec(line); null) {
    const location = { row, col: match.index }
    const [symbol] = match
    if (symbol in acc) {
      acc[symbol].push(location)
      continue
    }
    acc[symbol] = [location]
  }
  return acc
}, { })

const solutions = input => {
  const solutionData = input.reduce((acc, line, row) => {
    const pattern = new RegExp(/(\d+)/g)
    for (let match; match = pattern.exec(line); null) {
      const number = match[0]
      const col = match.index
      // rows
      for (
        let r = Math.max(0, row - 1);
        r <= Math.min(input.length - 1, row + 1);
        r += 1
      ) {
        // cols
        for (
          let c = Math.max(0, col - 1);
          c <= Math.min(line.length - 1, col + number.length);
          c += 1
        ) {
          const ch = input[r][c]
          if (ch in chars) {
            const key = `${ch}-${r}-${c}`
            if (key in acc.part2) {
              acc.part2[key].push(+number)
            } else {
              acc.part2[key] = [+number]
            }
            acc.part1.push(+number)
          }
        }
      }
    }
    return acc
  }, { part1: [], part2: {} })

  return {
    part1: solutionData.part1
      .reduce((sum, num) => num + sum, 0),
    part2: Object.values(solutionData.part2)
      .filter(nums => nums.length === 2)
      .reduce((sum, [a, b]) => sum + a * b, 0),
  }
}

// console.log(solutions(testInput))
console.log(solutions(input))
