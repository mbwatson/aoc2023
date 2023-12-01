import fs from 'fs'

export const readFileLines = path => {
  let lines = []
  try {
    const input = fs.readFileSync(path, 'utf8')
    lines = input.trim().split('\n')
  } catch (error) {
    console.log(error)
  }
  return lines
}
