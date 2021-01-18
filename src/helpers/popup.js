import { appendToBody } from './dom'

export const defaultZIndex = 2000

let puid = 1
let zIndex = defaultZIndex

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
