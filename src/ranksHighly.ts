// Number of moves that rank highly and should be highlighted
const N = 4

const ranksHighly = (san: string, standings: [string, number][]): boolean =>
  standings
    .filter((s, i) => i < N && s[1] > 1)
    .map(s => s[0])
    .includes(san)

export default ranksHighly
