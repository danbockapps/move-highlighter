import getBox from './getBox'
import highlight from './highlight'

const aObserver = new MutationObserver(() => {
  if (getBox()) initializeBoxObserver()
  else bObserver.disconnect()
})

const bObserver = new MutationObserver(highlight)

interface MoveColors {
  [move: string]: string
}

export let moveColors: MoveColors = {}
export const resetMoveColors = () => {
  moveColors = {}
}

const analyseTools = document.querySelector('.analyse__tools')

const initializeBoxObserver = () => {
  moveColors = {}
  if (analyseTools) {
    // Always true
    const box = getBox()

    if (box) {
      highlight()
      bObserver.observe(box, { subtree: true, characterData: true, childList: true })
    }
  }
}

if (analyseTools) {
  aObserver.observe(analyseTools, { childList: true })
  if (getBox()) initializeBoxObserver()
} else aObserver.disconnect()
