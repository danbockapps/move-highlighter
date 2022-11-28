let toMove: 'w' | 'b' | undefined

let colorIndex = 0

const colors = ['#0f0', '#ff0', '#0ff', '#f0f', '#fc0', '#c9f']

interface MoveColors {
  [move: string]: string
}

let moveColors: MoveColors = {}

const assignNextMoveColor = (san: string) => {
  moveColors[san] = colors[colorIndex++] || 'black'
}

const resetMove = (newToMove: 'w' | 'b') => {
  colorIndex = 0
  moveColors = {}
  toMove = newToMove
}

export { toMove, resetMove, moveColors, assignNextMoveColor }
