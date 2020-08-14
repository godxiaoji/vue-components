import { isObject } from '../helpers/util'
import { parseParamsByRules } from './rules'
import { getCallbackFns } from './callback'

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
  const html = [
    `<div class="ly-modal">`,
    `<div class="ly-modal_box">`,
    `<div class="ly-modal_header">`,
    `<span class="ly-modal_title">${options.title}</span>`,
    `</div>`,
    `<div class="ly-modal_body">`,
    `<div class="ly-modal_content">`,
    htmlEscape(options.content),
    `</div>`,
    `</div>`,
    `<div class="ly-modal_footer">`,
    `<button style="display: ` +
      (options.showCancel ? 'block' : 'none') +
      `;" class="ly-modal_button type--cancel">${options.cancelText}</button>`,
    `<button class="ly-modal_button type--confirm primary">${options.confirmText}</button>`,
    `</div>`,
    `</div>`,
    `</div>`
  ].join('')

  const $wrapper = document.createElement('div')
  $wrapper.innerHTML = html

  return $wrapper.firstChild
}

var $el = null

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
    $el = render(options)

    // 添加事件
    const $cancel = $el.querySelector('.type--cancel')
    $cancel._options = options
    $cancel.addEventListener('click', Events.onCancelClick, false)
    const $confirm = $el.querySelector('.type--confirm')
    $confirm._options = options
    $confirm.addEventListener('click', Events.onConfirmClick, false)

    document.body.appendChild($el)
  } catch (e) {
    options.fail(e)
    options.complete()
  }
}

function hide() {
  if ($el) {
    // 添加事件
    $el
      .querySelector('.type--cancel')
      .removeEventListener('click', Events.onCancelClick, false)
    $el
      .querySelector('.type--confirm')
      .removeEventListener('click', Events.onConfirmClick, false)

    document.body.removeChild($el)
    $el = null
  }
}

export const showModal = show
