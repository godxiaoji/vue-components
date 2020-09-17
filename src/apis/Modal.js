import { isObject } from '../helpers/util'
import { parseParamsByRules } from './rules'
import { getCallbackFns } from './callback'
import { SDKKey } from '../config'

function htmlEscape(text) {
  return text.replace(/[<>"&]/g, function(match) {
    switch (match) {
      case '<':
        return '&lt;'
      case '>':
        return '&gt;'
      case '&':
        return '&amp;'
      case '"':
        return '&quot;'
    }
  })
}

function render(options) {
  const $wrapper = document.createElement('div')

  $wrapper.innerHTML = `
  <div class="${SDKKey}-modal">
    <div class="${SDKKey}-modal_box">
      <div class="${SDKKey}-modal_header">
        <span class="${SDKKey}-modal_title">${options.title}</span>
      </div>
      <div class="${SDKKey}-modal_body">
        <div class="${SDKKey}-modal_content">
          ${htmlEscape(options.content)}
        </div>
      </div>
      <div class="${SDKKey}-modal_footer">
        <button style="display: ${
          options.showCancel ? 'inline-block' : 'none'
        };" class="${SDKKey}-button type--secondary size--default ${SDKKey}-modal_button">${
    options.cancelText
  }</button>
        <button class="${SDKKey}-button type--primary size--default ${SDKKey}-modal_button">${
    options.confirmText
  }</button>
      </div>
    </div>
  </div>
      `.trim()

  return $wrapper.firstElementChild
}

let $el = null

const Events = {
  onCancelClick() {
    const res = {
      confirm: false,
      cancel: true
    }

    this._options.success(res)
    this._options.complete(res)

    hide()
  },
  onConfirmClick() {
    const res = {
      confirm: true,
      cancel: false
    }

    this._options.success(res)
    this._options.complete(res)

    hide()
  }
}

function show(object) {
  if (!isObject(object)) {
    object = {}
  }

  let options = getCallbackFns(object)

  try {
    options = Object.assign(options, parseParamsByRules(object, 'showModal'))

    hide()

    // 获取节点
    const $currentEl = render(options)

    // 添加事件
    const $cancel = $currentEl.querySelector('.type--secondary')
    $cancel._options = options
    $cancel.addEventListener('click', Events.onCancelClick, false)
    const $confirm = $currentEl.querySelector('.type--primary')
    $confirm._options = options
    $confirm.addEventListener('click', Events.onConfirmClick, false)

    document.body.appendChild($currentEl)

    setTimeout(() => {
      $currentEl.firstElementChild.classList.add('visibility')
    }, 17)

    $el = $currentEl
  } catch (e) {
    options.fail(e)
    options.complete()
  }
}

function hide() {
  if ($el) {
    // 添加事件
    $el
      .querySelector('.type--secondary')
      .removeEventListener('click', Events.onCancelClick, false)
    $el
      .querySelector('.type--primary')
      .removeEventListener('click', Events.onConfirmClick, false)

    document.body.removeChild($el)
    $el = null
  }
}

export const showModal = show
