export const quadSolve = (a, b, c) => [
  (-b + Math.sqrt(b ** 2 - 4 * a * c)) / 2,
  (-b - Math.sqrt(b ** 2 - 4 * a * c)) / 2,
].sort()

