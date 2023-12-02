// --- Day 2: Cube Conundrum ---

import { readFileLines } from '../util/read-file-lines.mjs'

//

const input = readFileLines('./input.txt')
const constraints = { red: 12, green: 13, blue: 14 }

/**
 * turn a string like this:
 *   "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green"
 * into an object like this:
 *   {
 *     index: 1,
 *     pulls: [
 *       { blue: 3, red: 4 },
 *       { red: 1, green: 2, blue: 6 },
 *       { green: 2 }
 *     ],
 *   }
 *   
 * @param      string  game    The game as a string.
 * @return     Object          The game as an object
 */
const parseGame = game => {
  const [gameName, reveals] = game.split(':')
  const gameNumber = +gameName.split(' ')[1]
  const gameReveals = reveals.split(';').map(str => {
    const pattern = new RegExp(/\d+? (red|green|blue)/g)
    const rawPulls = str.match(pattern)
    const pulls = rawPulls.reduce((acc, pull) => {
      const [count, color] = pull.split(' ')
      acc[color] = +count
      return acc
    }, {})
    return pulls
  })
  return { index: gameNumber, reveals: gameReveals }
}

/**
 * Determine if a game's reveals are valid.
 *
 * @param   object[]  reveals  The reveals, in the form
 *                             returned from the game parser.
 * @return  boolean            Whether the reveals are valid.
 */
const validateGame = reveals => {
  let valid = true
  let i = 0
  while (valid && i < reveals.length) {
    const reveal = reveals[i]
    valid = Object.keys(reveal)
      .every(color => reveal[color] <= constraints[color])
    i += 1
  }
  return valid
}

const gameRequirements = reveals => {
  return reveals.reduce(
    (acc, reveal) => {
      Object.keys(reveal).forEach(color => {
        acc[color] = Math.max(acc[color], reveal[color])
      })
      return acc
    },
    { red: 0, green: 0, blue: 0 }
  )
}

const games = input.map(parseGame)
const validGames = games.reduce((acc, game) => {
  if (validateGame(game.reveals)) {
    acc.push(game)
  }
  return acc
}, [])
const validGameIdSum = validGames.reduce((sum, game) => {
  sum += game.index
  return sum
}, 0)

// const validGames = games.reduce((acc, game) => {
//   if (validateGame(game.reveals)) {
//     acc += game.index
//   }
//   return acc
// }, 0)

console.log('part 1', validGameIdSum)

const powerSum = games.reduce((sum, game) => {
  const { red, green, blue } = gameRequirements(game.reveals)
  return sum + red*blue*green
}, 0)

console.log('part 2', powerSum)