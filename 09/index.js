// --- Day 9: Mirage Maintenance ---

import { readFileLines } from '../util/read-file-lines.mjs'

//

// const input = readFileLines('./test-input.txt')
const input = readFileLines('./input.txt')

const extrapolate = str => {
  const terms = [str.split(' ').map(x => +x)]
  
  let i = 0
  let next
  while (!terms[i].every(x => x === 0)) {
    next = []
    const current = terms[i]
    for (let i = 0; i < current.length - 1; i += 1) {
      next[i] = current[i + 1] - current[i]
    }
    i += 1
    terms[i] = [...next]
  }

  const nextTerm = i => {
    if (i + 1 >= terms.length) {
      return 0
    }
    const row = terms.slice(i, i + 1)[0]
    return row[row.length - 1] + nextTerm(i + 1)
  }

  const prevTerm = i => {
    if (i + 1 >= terms.length) {
      return 0
    }

    const row = terms.slice(i, i + 1)[0]
    return row[0] - prevTerm(i + 1)
  }

  return {
    nextTerm: nextTerm(0),
    prevTerm: prevTerm(0),
  }
}

const solutions = input => input
  .map(line => {
    const { prevTerm, nextTerm } = extrapolate(line)
    return { prevTerm, nextTerm }
  })
  .reduce((acc, ext) => {
    acc.part1 += ext.nextTerm
    acc.part2 += ext.prevTerm
    return acc
  }, { part1: 0, part2: 0 })

console.log(solutions(input))

