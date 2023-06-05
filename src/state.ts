import ranksHighly from './ranksHighly'

let toMove: 'w' | 'b' | undefined

interface MoveColors {
  evens: {
    [move: string]: string | null
  }
  odds: {
    [move: string]: string | null
  }
}

const createDefaultMoveColors = () => ({ evens: {}, odds: {} })
let moveColors: MoveColors = createDefaultMoveColors()

const colors = ['#0f0', '#ff0', '#0ff', '#f0f']

const assignMoveColors = (moveElements: HTMLElement[], set: 'evens' | 'odds') => {
  const standings = Object.entries(
    moveElements
      .map(e => e.innerHTML.replace('+', ''))
      .reduce<{ [san: string]: number }>(
        (acc, cur) => ({ ...acc, [cur]: acc[cur] ? acc[cur] + 1 : 1 }),
        {},
      ),
  ).sort((a, b) => b[1] - a[1])

  // First, remove from moveColors any move that shouldn't be there anymore
  Object.keys(moveColors[set]).forEach(san => {
    if (!ranksHighly(san, standings)) {
      delete moveColors[set][san]
    }
  })

  // Then, assign colors to highly ranked moves that aren't in moveColors, and set them in DOM.
  moveElements.forEach(e => {
    const san = e.innerHTML.replace('+', '')

    if (ranksHighly(san, standings) && !moveColors[set][san]) {
      // Move needs to be added to moveColors.
      const color = colors.reduce<string | undefined>(
        (acc, cur) => acc || (Object.values(moveColors[set]).includes(cur) ? undefined : cur),
        undefined,
      )
      if (color) moveColors[set][san] = color
    }

    // Create a const so TypeScript knows it exists when the conditional is true
    const currentColor = moveColors[set][san]

    if (currentColor) {
      if (set === 'evens') {
        e.style.backgroundColor = currentColor
      }

      if (set === 'odds') {
        e.style.backgroundColor = 'white'
        e.style.boxShadow = `inset 0 0 0 3px ${currentColor}`
      }

      e.style.borderRadius = '3px'
      e.style.color = 'black'
    } else {
      e.style.backgroundColor = 'inherit'
      e.style.boxShadow = 'inherit'
      e.style.color = 'inherit'
    }
  })

  console.log('moveColors', set, moveColors)
}

const resetMove = (newToMove: 'w' | 'b') => {
  moveColors = createDefaultMoveColors()
  toMove = newToMove
}

export { toMove, resetMove, assignMoveColors }
