import getBox from './getBox'
import { assignNextMoveColor, moveColors, resetMove, toMove } from './state'

const highlight = () => {
  const box = getBox()
  const newToMove = box?.getAttribute('data-fen')?.split(' ')[1] as 'w' | 'b'
  if (newToMove && ['w', 'b'].includes(newToMove) && toMove !== newToMove) resetMove(newToMove)

  const allEvens = Array.from(getBox()?.getElementsByClassName('pv') || []).reduce<HTMLElement[]>(
    (acc, cur) => [
      ...acc,
      ...Array.from(cur.getElementsByClassName('pv-san') || []).reduce<HTMLElement[]>(
        (acc, cur, j) => [...acc, ...(j % 2 === 0 ? [cur as HTMLElement] : [])],
        [],
      ),
    ],
    [],
  )

  const standings = Object.entries(
    allEvens
      .map(e => e.innerHTML.replace('+', ''))
      .reduce<{ [san: string]: number }>(
        (acc, cur) => ({ ...acc, [cur]: acc[cur] ? acc[cur] + 1 : 1 }),
        {},
      ),
  ).sort((a, b) => b[1] - a[1])

  allEvens.forEach(e => {
    const san = e.innerHTML.replace('+', '')
    if ([standings[0][0], standings[1][0], standings[2][0], standings[3][0]].includes(san)) {
      if (!moveColors[san]) assignNextMoveColor(san)
      e.style.backgroundColor = moveColors[san]
    }
  })
}

export default highlight
