import {
  isObject,
  isString,
  isUndefined,
  isFunction,
  noop
} from '../helpers/util'

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
    `<div class="modal">`,
    `<div class="modal-box">`,
    `<div class="modal-header">`,
    `<span class="modal-title">${options.title}</span>`,
    `</div>`,
    `<div class="modal-body">`,
    `<div class="modal-content">`,
    htmlEscape(options.content),
    `</div>`,
    `</div>`,
    `<div class="modal-footer">`,
    `<button style="display: ` +
      (options.showCancel ? 'block' : 'none') +
      `;" class="modal-button modal-cancel-button">${options.cancelText}</button>`,
    `<button class="modal-button modal-confirm-button primary">${options.confirmText}</button>`,
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

function getParamValue(object, key, type, defaultValue) {
  const param = object[key]

  if (!isUndefined(param)) {
    if (typeof param === type) {
      return param
    } else {
      throw new TypeError(
        `Invalid param: "object.${key}" must be a ${type} type.`
      )
    }
  } else {
    return defaultValue
  }
}

export function show(object) {
  if (!isObject(object)) {
    object = {}
  }

  const options = {}
  options.success = isFunction(object.success) ? object.success : noop
  options.fail = isFunction(object.fail) ? object.fail : noop
  options.complete = isFunction(object.complete) ? object.complete : noop

  try {
    if (!isString(object.content)) {
      throw new TypeError(
        'Invalid param: "object.content" must be a string type.'
      )
    }
    options.content = object.content
    options.title = getParamValue(object, 'title', 'string', '提示')
    options.maskClosable = getParamValue(
      object,
      'maskClosable',
      'boolean',
      false
    )
    options.showCancel = getParamValue(object, 'showCancel', 'boolean', true)
    options.confirmText = getParamValue(object, 'confirmText', 'string', '确定')
    options.cancelText = getParamValue(object, 'cancelText', 'string', '取消')

    hide()

    // 获取节点
    $el = render(options)

    // 添加事件
    const $cancel = $el.querySelector('.modal-cancel-button')
    $cancel._options = options
    $cancel.addEventListener('click', Events.onCancelClick, false)
    const $confirm = $el.querySelector('.modal-confirm-button')
    $confirm._options = options
    $confirm.addEventListener('click', Events.onConfirmClick, false)

    document.body.appendChild($el)
  } catch (e) {
    const res = {
      errMsg: e.message
    }

    if (options.fail != noop) {
      options.fail(res)
      options.complete(res)
    } else {
      options.complete(res)
      throw e
    }
  }
}

export function hide() {
  if ($el) {
    // 添加事件
    $el
      .querySelector('.modal-cancel-button')
      .removeEventListener('click', Events.onCancelClick, false)
    $el
      .querySelector('.modal-confirm-button')
      .removeEventListener('click', Events.onConfirmClick, false)

    document.body.removeChild($el)
    $el = null
  }
}
