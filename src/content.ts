const box: HTMLElement | null = document.querySelector('.pv_box')

if (box) {
  const observer = new MutationObserver((mutations, observer) =>
    console.log({ mutations, observer }),
  )
  observer.observe(box, { subtree: true, attributes: true })
  box.style.backgroundColor = 'yellow'
}

console.log('box', box)
