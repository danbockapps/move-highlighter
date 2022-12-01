import ranksHighly from './ranksHighly'

let toMove: 'w' | 'b' | undefined

interface MoveColors {
  [move: string]: string | null
}

let moveColors: MoveColors = {}

const assignMoveColors = (moveElements: HTMLElement[], colors: string[]) => {
  const standings = Object.entries(
    moveElements
      .map(e => e.innerHTML.replace('+', ''))
      .reduce<{ [san: string]: number }>(
        (acc, cur) => ({ ...acc, [cur]: acc[cur] ? acc[cur] + 1 : 1 }),
        {},
      ),
  ).sort((a, b) => b[1] - a[1])

  // First, remove from moveColors any move that shouldn't be there anymore
  Object.keys(moveColors).forEach(san => {
    if (!ranksHighly(san, standings)) {
      delete moveColors[san]
    }
  })

  // Then, assign colors to highly ranked moves that aren't in moveColors, and set them in DOM.
  moveElements.forEach(e => {
    const san = e.innerHTML.replace('+', '')

    if (ranksHighly(san, standings) && !moveColors[san]) {
      // Move needs to be added to moveColors.
      const color = colors.reduce<string | undefined>(
        (acc, cur) => acc || (Object.values(moveColors).includes(cur) ? undefined : cur),
        undefined,
      )
      if (color) moveColors[san] = color
    }

    e.style.backgroundColor = moveColors[san] || 'initial'
    e.style.color = moveColors[san] ? 'black' : 'inherit'
  })
}

const resetMove = (newToMove: 'w' | 'b') => {
  moveColors = {}
  toMove = newToMove
}

export { toMove, resetMove, assignMoveColors }
