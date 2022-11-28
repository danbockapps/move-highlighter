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

  const standings = Object.entries(
    allEvens
      .map(e => e.innerHTML.replace('+', ''))
      .reduce<{ [san: string]: number }>(
        (acc, cur) => (acc[cur] ? { ...acc, [cur]: acc[cur] + 1 } : { ...acc, [cur]: 1 }),
        {},
      ),
  ).sort((a, b) => b[1] - a[1])

  allEvens.forEach(e => {
    const san = e.innerHTML.replace('+', '')

    if (san === standings[0][0]) e.style.backgroundColor = '#0f0'
    else if (san === standings[1][0]) e.style.backgroundColor = '#ff0'
    else if (san === standings[2][0]) e.style.backgroundColor = '#0ff'
    else if (san === standings[3][0]) e.style.backgroundColor = '#f0f'
  })
}

export default highlight
