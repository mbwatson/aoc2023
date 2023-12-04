import { readFileLines } from '../util/read-file-lines.mjs'

//

const testInput = readFileLines('./test-input.txt')
const realInput = readFileLines('./input.txt')

const scoreScard = ({ winning, mine }) => {
  return score
}

const parseCard = card => {
    const pattern = new RegExp(/^Card\W+(\d+): (.+)$/g)
    const matches = pattern.exec(card)
    let [, index, lists] = matches
    index = parseInt(index)
    const [winning, mine] = lists
      .split(' | ')
      .map(str => str
        .split(/\W+/)
        .map(n => parseInt(n))
        .filter(n => !!n)
      )
    const winningNumbers = mine.filter(value => winning.includes(value))
    const matchCount = winningNumbers.length
    const score = matches.length ? 2 ** (matches.length - 1) : 0
  return { index, winning, matchCount, mine, score }
}

const solutions = input => {
  const { part1, part2 } = input
    .reverse()
    .reduce((acc, line) => {
      const card = parseCard(line)
      const matches = card.mine.filter(value => card.winning.includes(value))
      // part 1 - raw scores
      acc.part1.push(matches.length)
      // part 2 - scratchcard copies
      acc.part2[card.index] = 1
      for (let i = 0; i < card.matchCount; i += 1) {
        const prevIndex = card.index + i + 1
        acc.part2[card.index] += acc.part2[prevIndex]
      }
      return acc
    }, { part1: [], part2: {} })

  return {
    part1: part1
      .map(score => score ? 2 ** (score - 1) : 0)
      .reduce((sum, num) => sum + num, 0),
    part2: Object.values(part2)
      .reduce((sum, num) => sum + num, 0),
  }
}

// console.log(solutions(testInput))
console.log(solutions(realInput))
