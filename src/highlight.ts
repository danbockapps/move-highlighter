import { moveColors, resetMoveColors } from './content'
import getBox from './getBox'

let toMove: string | undefined

const highlight = () => {
  const box = getBox()
  const newToMove = box?.getAttribute('data-fen')?.split(' ')[1]
  if (toMove !== newToMove) resetMove()
  toMove = newToMove

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
      if (moveColors[san]) e.style.backgroundColor = moveColors[san]
      else moveColors[san] = colors[colorIndex++] || 'black'
    }
  })
}

let colorIndex = 0
const colors = ['#0f0', '#ff0', '#0ff', '#f0f', '#fc0', '#c9f']

const resetMove = () => {
  colorIndex = 0
  resetMoveColors()
}

export default highlight
