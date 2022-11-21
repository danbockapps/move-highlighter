const analyseTools = document.querySelector('.analyse__tools')

if (analyseTools) {
  const aObserver = new MutationObserver(() => {
    if (analyseTools.querySelector('.pv_box')) initializeBoxObserver()
  })
  aObserver.observe(analyseTools, { childList: true })
}

const initializeBoxObserver = () => {
  if (analyseTools) {
    // Always true
    const box: HTMLElement | null = analyseTools.querySelector('.pv_box')

    if (box) {
      // Always true
      const bObserver = new MutationObserver(() => {
        console.log('observer triggered')
        console.log(box.querySelector('.pv-san'))
      })
      bObserver.observe(box, { subtree: true, characterData: true, childList: true })
    }
  }
}
