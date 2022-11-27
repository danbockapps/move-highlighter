import getBox from './getBox'

const highlight = () => {
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

  allEvens.forEach(e => {
    e.style.backgroundColor = 'salmon'
  })
}

export default highlight
