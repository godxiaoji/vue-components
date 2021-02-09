import { appendToBody } from './dom'
import { popupZIndex } from './layer'

let puid = 1
let zIndex = popupZIndex

export function getNewZIndex() {
  return zIndex++
}

export function createPopup() {
  const $wrapper = document.createElement('div')
  const id = puid++

  appendToBody($wrapper)

  return {
    id,
    $wrapper
  }
}
