import getBox from './getBox'
import highlight from './highlight'

const aObserver = new MutationObserver(() => {
  if (getBox()) initializeBoxObserver()
  else bObserver.disconnect()
})

const bObserver = new MutationObserver(highlight)

const analyse = document.querySelector('.analyse')

const initializeBoxObserver = () => {
  if (analyse) {
    // Always true
    const box = getBox()

    if (box) {
      highlight()
      bObserver.observe(box, { subtree: true, characterData: true, childList: true })
    }
  }
}

if (analyse) {
  aObserver.observe(analyse, { childList: true })
  if (getBox()) initializeBoxObserver()
} else aObserver.disconnect()
