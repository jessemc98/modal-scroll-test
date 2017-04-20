const { max } = Math

const initialWindowOverflow = parent.document.body.style.overflow || 'initial'

export function setWindowScroll(parent, shouldScroll) {
  if (!shouldScroll) return parent.document.body.style.overflow = 'hidden'

  return parent.document.body.style.overflow = initialWindowOverflow
}

export function getIframeOffset(parent) {
  return parent.document.getElementsByTagName('iframe').inner.offsetTop
}

export function getWindowScroll(window) {
  return window.scrollY
}

// expects object as input
export function getVisibleViewPortHeight({ window, marginTop = 0, marginBottom = 0 }) {
  const height = max(window.document.documentElement.clientHeight, window.innerHeight || 0)
  return height - marginTop - marginBottom
}
