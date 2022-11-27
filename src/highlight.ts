import getBox from './getBox'

const highlight = () => {
  const pvs = Array.from(getBox()?.getElementsByClassName('pv') || [])

  const allEvens = pvs.reduce<HTMLElement[]>((acc, cur) => {
    const sans = cur.getElementsByClassName('pv-san')
    const evens = Array.from(sans || []).reduce<HTMLElement[]>(
      (acc, cur, j) => [...acc, ...(j % 2 === 0 ? [cur as HTMLElement] : [])],
      [],
    )
    return [...acc, ...evens]
  }, [])

  allEvens.forEach(e => {
    e.style.backgroundColor = 'salmon'
  })
}

export default highlight
