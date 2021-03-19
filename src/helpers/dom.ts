import {
  camelCase2KebabCase,
  inArray,
  isHTMLElement,
  isNumber,
  isString,
  objectForEach
} from '@/helpers/util'

const docEl = document.documentElement

export function appendToBody($el: Element) {
  document.body.appendChild($el)
}

export function removeEl($el: Element) {
  $el.parentNode && $el.parentNode.removeChild($el)
}

export function addClassName($el: Element, className: string) {
  $el.classList.add(className)
}

export function removeClassName($el: Element, className: string) {
  $el.classList.remove(className)
}

export function hasClassName($el: Element, className: string) {
  return inArray(className, [].slice.call($el.classList, 0))
}

export function getRelativeOffset(
  $el: HTMLElement | Document,
  $relativeEl: Element | Document = document,
  viewPosition: string | number = 0
) {
  if ($el === document) {
    return { offsetTop: 0, offsetLeft: 0 }
  }

  $el = $el as HTMLElement
  $relativeEl = ($relativeEl === document ? docEl : $relativeEl) as HTMLElement

  let offsetTop = $el.offsetTop
  let offsetLeft = $el.offsetLeft

  const transform = window.getComputedStyle($el).transform
  if (transform && transform !== 'none') {
    const transformMatrix = transform.slice(7, transform.length - 1).split(', ')
    offsetLeft += parseFloat(transformMatrix[4])
    offsetTop += parseFloat(transformMatrix[5])
  }

  if ($el.offsetParent && $el.offsetParent !== $relativeEl) {
    const parent = getRelativeOffset(
      $el.offsetParent as HTMLElement,
      $relativeEl
    )

    offsetTop += parent.offsetTop
    offsetLeft += parent.offsetLeft
  }

  const viewPositionMap = new Map([
    ['start', 0],
    ['center', 0.5],
    ['end', 1],
    ['0', 0],
    ['0.5', 0.5],
    ['1', 1]
  ])

  viewPosition = (viewPositionMap.get(viewPosition.toString()) || 0) as number

  if (viewPosition) {
    if (viewPosition === 1) {
      offsetTop -= $relativeEl.clientHeight - $el.clientHeight
      offsetLeft -= $relativeEl.clientWidth - $el.clientWidth
    } else {
      offsetTop -= $relativeEl.clientHeight / 2 - $el.clientHeight / 2
      offsetLeft -= $relativeEl.clientWidth / 2 - $el.clientWidth / 2
    }
  }

  return { offsetTop, offsetLeft }
}

/**
 * 获取长度值
 * @param size eg: 10 10vw 10vh 10px
 * @param defaultValue
 */
export function getSizeValue(size: number | string, defaultValue = 0) {
  if (isNumber(size)) {
    return size as number
  } else if (isString(size)) {
    size = size as string
    const matches = size.match(/^([\d.]+)((px)|(vw)|(vh)|)$/)

    if (matches) {
      size = parseFloat(matches[1])

      if (matches[2] === 'vw') {
        size *= docEl.clientWidth / 100
      } else if (matches[2] === 'vh') {
        size *= docEl.clientHeight / 100
      }

      return size
    }
  }

  return defaultValue
}

/**
 * 指定条件获取 HTMLElement
 * @param selector 选择参数
 */
export function querySelector(selector: any) {
  let $el

  if (isHTMLElement(selector)) {
    $el = selector
  } else if (isString(selector)) {
    $el = document.querySelector(selector as string)
  } else if (selector === document) {
    $el = docEl
  }

  return $el == null ? null : ($el as HTMLElement)
}

/**
 * 获取兼容滚动DOM节点
 */
export function getScrollDom($el: HTMLElement | Document = document) {
  if ($el === document || $el === document.documentElement) {
    if (
      typeof document.compatMode !== 'undefined' &&
      document.compatMode !== 'BackCompat'
    ) {
      return docEl
    } else {
      return document.body
    }
  }

  return $el as HTMLElement
}

interface StyleObject {
  [propName: string]: string
}

export function styleObject2CssText(object: StyleObject) {
  const arr: string[] = []

  objectForEach(object, (v: string, k: string) => {
    arr.push(`${camelCase2KebabCase(k)}: ${v}`)
  })

  return arr.join('; ')
}
