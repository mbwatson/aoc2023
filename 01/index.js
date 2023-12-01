// --- Day 1: Trebuchet?! ---

import { readFileLines } from '../util/read-file-lines.mjs'

const calibration = data => {
  const pattern = new RegExp(/\d/g)
  return data
    .reduce((sum, line) => {
      const matches = line.match(pattern)
      const [first] = matches.slice(0, 1)
      const [last] = matches.slice(-1)
      const code = +[first, last].join('')
      return sum + code
    }, 0)
}

// part 1

// const input = readFileLines('./input.txt')
const input = readFileLines('./input.txt')
console.log('part 1', calibration(input))

// part 2

// can't just replace "one" with "1"
// because "oneight" would become "1ight" etc
const input2 = input
  .map(line => line
    .replace(/one/g, 'one1one')
    .replace(/two/g, 'two2two')
    .replace(/three/g, 'three3three')
    .replace(/four/g, 'four4four')
    .replace(/five/g, 'five5five')
    .replace(/six/g, 'six6six')
    .replace(/seven/g, 'seven7seven')
    .replace(/eight/g, 'eight8eight')
    .replace(/nine/g, 'nine9nine')
  )
console.log('part 2', calibration(input2))

