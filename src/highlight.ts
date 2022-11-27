import getBox from './getBox'
const highlight = () => {
  const pvs = getBox()?.getElementsByClassName('pv')
  for (let i = 0; i < (pvs?.length || 0); i++) {
    const sans = pvs?.item(i)?.getElementsByClassName('pv-san')

    const evens = Array.from(sans || []).reduce<HTMLElement[]>(
      (acc, cur, j) => [...acc, ...(j % 2 === 0 ? [cur as HTMLElement] : [])],
      [],
    )

    evens.forEach(e => {
      e.style.backgroundColor = 'pink'
    })
  }
}

export default highlight
