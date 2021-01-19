export const defaultZIndex = 2000

let puid = 1
let zIndex = defaultZIndex

export function getNewZIndex() {
  return zIndex++
}

export function createPopup() {
  const $wrapper = document.createDocumentFragment()
  const id = puid++

  return {
    id,
    $wrapper
  }
}
