import { appendToBody } from "../helpers/dom"

let puid = 1
const zIndex = 10000

export function createPopup() {
  const $wrapper = document.createElement('div')
  const id = puid++

  appendToBody($wrapper)

  return {
    id,
    $wrapper,
    zIndex: zIndex + id
  }
}
