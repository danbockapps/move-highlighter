import getBox from './getBox'
import { assignMoveColors, resetMove, toMove } from './state'

interface AllMoves {
  evens: HTMLElement[]
  odds: HTMLElement[]
}

const emptyAllMoves = { evens: [], odds: [] }
const evenColors = ['#0f0', '#ff0', '#0ff']
const oddColors = ['red', 'blue', '#012e02']

const highlight = () => {
  const box = getBox()
  const newToMove = box?.getAttribute('data-fen')?.split(' ')[1] as 'w' | 'b'
  if (newToMove && ['w', 'b'].includes(newToMove) && toMove !== newToMove) resetMove(newToMove)

  const allMoves = Array.from(getBox()?.getElementsByClassName('pv') || []).reduce<AllMoves>(
    (acc, cur) => {
      const currentRow = Array.from(cur.getElementsByClassName('pv-san') || []).reduce<AllMoves>(
        (acc, cur, j) => ({
          ...acc,
          ...(j % 2 === 0
            ? { evens: [...acc.evens, cur as HTMLElement] }
            : { odds: [...acc.odds, cur as HTMLElement] }),
        }),
        emptyAllMoves,
      )
      return {
        evens: [...acc.evens, ...currentRow.evens],
        odds: [...acc.odds, ...currentRow.odds],
      }
    },
    emptyAllMoves,
  )

  assignMoveColors(allMoves.evens, 'color')
  assignMoveColors(allMoves.odds, 'shadow')
}

export default highlight
