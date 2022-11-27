import getBox from './getBox'
const highlight = () => {
  const pvs = getBox()?.getElementsByClassName('pv')
  for (let i = 0; i < (pvs?.length || 0); i++) {
    const sans = pvs?.item(i)?.getElementsByClassName('pv-san')
    for (let j = 0; j < (sans?.length || 0); j++) {
      if (j % 2 === 0) {
        const el = sans?.item(j) as HTMLElement
        if (el) el.style.backgroundColor = 'green'
      }
    }
  }
}

export default highlight
