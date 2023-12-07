// --- Day 6: Wait For It ---

import { quadSolve } from '../util/quad-solve.mjs'
import { readFileLines } from '../util/read-file-lines.mjs'
import { zip } from '../util/zip.mjs'

//

const testInput = readFileLines('./test-input.txt')
const realInput = readFileLines('./input.txt')

const parser = data => {
  const [times, distances] = data.map(d => d.split(/\W+/g).slice(1).map(n => parseInt(n)))
  return zip(times, distances)
}

const parser2 = data => {
  const [time, distance] = data
    .map(d => d.split(/\W+/g))
    .map(a => a.slice(1)) // remove the row label
    .map(a => a.join(''))
    .map(s => parseInt(s))
  return { time, distance }
}

const solve = input => {
  let part1 = 0
  let part2 = []
  const races = parser(input)
  part1 = races.reduce((prod, [t, d]) => {
    const roots = quadSolve(-1, t, -d)
    return prod * (Math.floor(roots[1]) - Math.ceil(roots[0]) + 1)
  }, 1)
  const race = parser2(input)
  const roots = quadSolve(-1, race.time, -race.distance)
  part2 = Math.floor(roots[1]) - Math.ceil(roots[0]) + 1
  return { part1, part2 }
}

console.log(solve(testInput))
console.log(solve(realInput))
