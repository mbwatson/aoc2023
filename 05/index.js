// --- Day 5: If You Give A Seed A Fertilizer ---

import { readFileLines } from '../util/read-file-lines.mjs'

//

const testInput = readFileLines('./test-input.txt', '\n\n')
const realInput = readFileLines('./input.txt', '\n\n')

const parseAlmanac = almanac => {
  const data = {}
  const [seedsString, ...mapStrings] = almanac
  const [, vals] = seedsString.split(': ')
  
  const seeds = vals.split(/\W+/).map(n => parseInt(n))
  const mappings = mapStrings.map(str => {
    const [label, mapsString] = str.split(' map:\n')
    const [sourceType, to, destinationType] = label.split('-')
    const maps = mapsString.split('\n')
      .map(str => str.split(/\W+/g))
      .map(arr => arr.map(n => parseInt(n)))
    return {
      source: sourceType,
      destination: destinationType,
      maps,
    }
  })

  return { seeds, mappings }
}

const part1 = input => {
  const { seeds, mappings } = parseAlmanac(input)

  const mapValue = (value, type) => {
    if (type === 'location') {
      return value
    }
    const mapGroup = mappings.find(m => m.source === type)
    const map = mapGroup.maps.find(
      ([dStart, sStart, range]) => sStart <= value && value <= sStart + range
    )
    if (map) {
      const [dStart, sStart, range] = map
      return mapValue(value - sStart + dStart, mapGroup.destination)
    }
    return mapValue(value, mapGroup.destination)
  }

  return seeds.reduce((min, seed) => {
    const result = mapValue(seed, 'seed')
    return Math.min(min, result)
  }, Infinity)
}

// console.log(part1(testInput))
console.log(part1(realInput))

