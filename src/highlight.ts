import getBox from './getBox'
const highlight = () => {
  const els = getBox()?.getElementsByClassName('pv-san')
  for (let i = 0; i < (els?.length || 0); i++) {
    const el = els?.item(i) as HTMLElement
    if (el) el.style.backgroundColor = 'yellow'
  }
}

export default highlight
