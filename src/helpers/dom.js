export function appendToBody($el) {
  document.body.appendChild($el)
}

export function removeEl($el) {
  $el.parentNode.removeChild($el)
}

export function addClassName($el, className) {
  $el.classList.add(className)
}

export function removeClassName($el, className) {
  $el.classList.remove(className)
}
