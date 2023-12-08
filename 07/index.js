// --- Day 7: Camel Cards ---

import { readFileLines } from '../util/read-file-lines.mjs'

//

const testInput = readFileLines('./test-input.txt')
const realInput = readFileLines('./input.txt')

const cards = '23456789TJQKA'
const cardsWild = 'J23456789TQKA'

const cardFrequencies = arr => arr.split('')
  .reduce((acc, ch) => {
    if (ch in acc) {
      acc[ch] += 1
      return acc
    }
    acc[ch] = 1
    return acc
  }, {})

const handType = (hand, jokersWild = false) => {
  let counts = cardFrequencies(hand)
  if (jokersWild && ('J' in counts)) {
    const newCounts = { ...counts }
    if (counts['J'] === 5) {
      counts = { 'J': 5 }
    } else {
      const jCount = newCounts['J']
      delete newCounts['J']
      const highestCount = Math.max(...Object.values(newCounts))
      const mostFreqCard = Object.keys(newCounts)
        .reduce((freqCard, ch, i) => {
          if (!freqCard || newCounts[ch] > newCounts[freqCard]){
            return ch
          }
          return freqCard
        }, null)
      newCounts[mostFreqCard] += jCount
    }
    counts = { ...newCounts }
  }
  const typeArray = Object.values(counts).sort().reverse()
  const typeCode = Array(5).fill(0).map((z, i) => typeArray[i] ?? 0)
  return typeCode.join(',')
}

const parser = (input, jokersWild = false) => {
  const cardValues = jokersWild ? cardsWild : cards
  
  const hands = input.map(line => {
    const splitLine = line.split(' ')
    const hand = splitLine[0]
    const bid = parseInt(splitLine[1])
    const type = handType(hand, jokersWild)
    const handValues = hand.split('')
      .map(ch => cardValues.indexOf(ch))
      .map(x => String(x).padStart(2, '0'))
      .join(',')
    const compareCode = `${ type }--${ handValues }`
    return { hand, bid, type, compareCode }
  })

  return hands.sort((a, b) => a.compareCode < b.compareCode ? -1 : 1)
}

//

const score = arr => arr.reduce((score, hand, rank) => {
  return score + hand.bid * (rank + 1)
}, 0)

const solutions = input => {
  const part1 = parser(input, false)
  const part2 = parser(input, true)
  
  return {
    part1: score(part1),
    part2: score(part2),
  }
}

// console.log(solutions(testInput))
console.log(solutions(realInput))
