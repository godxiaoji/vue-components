import {
  objectForEach
} from "./util"

const start = Date.now()

export function getHandleEvent(el, event, detail = {}, changedType = null) {
  const handleEvent = {
    id: el.id,
    detail,
    dataset: getDataset(el.dataset),
    timeStamp: event.timeStamp ? Math.round(event.timeStamp) : (Date.now() - start),
    type: changedType || event.type
  }

  return handleEvent
}

export function getDataset(object) {
  const dataset = {}

  objectForEach(object, (value, key) => {
    if (key.indexOf('v-') === 0) {
      // 屏蔽带v-的vue属性
    } else {
      dataset[key] = value
    }
  })

  return dataset
}
