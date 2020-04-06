import { objectForEach, isString } from './util'

const start = Date.now()

class HandleEvent {
  constructor(el, type, detail) {
    this.id = el.id || ''
    this.detail = detail
    this.dataset = getDataset(el.dataset)
    this.timeStamp = Date.now() - start
    this.type = type

    return this
  }
}

export function getHandleEvent(el, event, detail = {}, changedType = null) {
  let type = isString(changedType) ? changedType : event.type

  return new HandleEvent(el, type, detail)
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
