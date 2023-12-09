// --- Day 8: Haunted Wasteland ---

import { readFileLines } from '../util/read-file-lines.mjs'
import { lcm } from 'mathjs'

//

const testInput = readFileLines('./test-input.txt', '\n\n')
const realInput = readFileLines('./input.txt', '\n\n')

const createStepper = steps => {
  let counter = -1

  const iterator = {
    next() {
      counter = (counter + 1) % steps.length
      return steps[counter]
    }
  }

  return iterator
}

const solutions = input => {
  const [instructions, rest] = input

  const network = rest.split('\n')
    .reduce((acc, line) => {
      const pattern = new RegExp(/^([A-Z]{3}) = \(([A-Z]{3}), ([A-Z]{3})\)/)
      const [_, node, L, R] = pattern.exec(line)
      acc[node] = { L, R }
      return acc
    }, {})

  // part1
  const stepper = createStepper(instructions)
  let stepCount = 0
  let current = 'AAA'
  while (current !== 'ZZZ') {
    stepCount += 1
    const dir = stepper.next()
    current = network[current][dir]
  }
  let part1 = stepCount

  // part2
  const stepper2 = createStepper(instructions)
  const seeds = Object.keys(network).filter(key => key.endsWith('A'))
  let currents = seeds.reduce((acc, node) => {
    acc[node] = [node]
    return acc
  }, {})
  const loopLengths = seeds.reduce((acc, node) => {
    acc[node] = 0
    return acc
  }, {})
  let stepCount2 = 0
  while (Object.values(loopLengths).some(val => !val)) {
    stepCount2 += 1
    const dir = stepper2.next()
    Object.keys(currents).forEach(seed => {
      currents[seed] = network[currents[seed]][dir]
      if (currents[seed].endsWith('Z')) {
        loopLengths[seed] = stepCount2
        delete currents[seed]
      }
    })
  }
  let part2 = lcm(...Object.values(loopLengths))

  return {
    part1,
    part2,
  }
}

// console.log(solutions(testInput))
console.log(solutions(realInput))

