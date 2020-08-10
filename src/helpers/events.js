import { objectForEach, isObject, isElement } from './util'
import Exception from './exception'

export class BaseEvent {
  constructor(e) {
    let { type, currentTarget, target } = e

    if (!isElement(currentTarget)) {
      currentTarget = document.createElement('view')
    }

    if (!isElement(target)) {
      target = currentTarget
    }

    this.type = type
    this.timeStamp = Date.now()

    this.currentTarget = {
      id: currentTarget.id,
      dataset: getDataset(currentTarget.dataset),
      offsetLeft: currentTarget.offsetLeft,
      offsetTop: currentTarget.offsetTop
    }
    this.target = {
      id: target.id,
      dataset: getDataset(target.dataset),
      offsetLeft: target.offsetLeft,
      offsetTop: target.offsetTop
    }

    this.detail = {}

    if (e instanceof MouseEvent) {
      this.detail.x = e.x
      this.detail.y = e.y
    }

    return this
  }
}

export class CustomEvent extends BaseEvent {
  constructor(event, detail = {}) {
    super(event)

    if (isObject(detail)) {
      if (detail instanceof Exception) {
        detail = detail.getFailError()
      }
    }

    this.detail = isObject(detail) ? detail : {}

    return this
  }
}

export function getDataset(object) {
  const dataset = {}

  objectForEach(object, (value, key) => {
    if (
      key.indexOf('v-') === 0 ||
      (key.indexOf('v') === 0 && key.length === 9)
    ) {
      // 屏蔽带v-的vue属性
    } else {
      dataset[key] = value
    }
  })

  return dataset
}
