// Number of moves that rank highly and should be highlighted
const N = 3

const ranksHighly = (san: string, standings: [string, number][]): boolean =>
  standings
    .filter((_s, i) => i < N)
    .map(s => s[0])
    .includes(san)

export default ranksHighly
