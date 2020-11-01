import {
  getDateValues,
  getTimeValues,
  getDatetimeValues,
  parseDateList,
  parseTimeList,
  parseDatetimeList,
  dateString2Array,
  timeString2Array,
  datetimeString2Array,
  getDate
} from './date'
import { parseRegionList } from './region'
import { cloneData } from '../../../helpers/util'

export { dateString2Array, timeString2Array, datetimeString2Array, getDate }

const getList = options => {
  const list = []

  options.forEach(v => {
    const item = cloneData(v)

    item.hasChildren = v.children && v.children.length > 0 ? true : false

    list.push(item)
  })

  return list
}

/**
 * 解析下拉groups
 * @param {Number} index
 * @param {Object} parent
 */
export function parseDropdownList(mode, index, parent) {
  if (mode === 'date') {
    return parseDateList(index, parent)
  } else if (mode === 'time') {
    return parseTimeList(index, parent)
  } else if (mode === 'datetime') {
    return parseDatetimeList(index, parent)
  } else if (mode === 'region') {
    return parseRegionList(index, parent)
  }

  // 多项选择
  if (index === 0) {
    return getList(parent)
  } else if (parent && parent.hasChildren) {
    return getList(parent.children)
  }

  return []
}

export function array2String(labels, mode, separator = '') {
  if (mode === 'date') {
    return labels.join('-')
  } else if (mode === 'time') {
    return labels.join(':')
  } else if (mode === 'datetime' && labels.length > 0) {
    return [labels.slice(0, 3).join('-'), labels.slice(3, 6).join(':')].join(
      ' '
    )
  }

  return labels.join(separator)
}

// function getFirstSelected(mode, values = [], parent) {
//   const optionItem = parseDropdownList(
//     mode,
//     values.length,
//     parent
//   )[0]

//   if (optionItem) {
//     values.push(optionItem.value)

//     if (optionItem.hasChildren) {
//       return getFirstSelected(mode, values, optionItem)
//     }
//   }

//   return values
// }

// export function getDefaultParseSelected(mode, options) {
//   if (mode === 'date') {
//     return getDateValues()
//   } else if (mode === 'time') {
//     return getTimeValues()
//   } else if (mode === 'datetime') {
//     return getDatetimeValues()
//   }

//   return getFirstSelected(mode, [], options)
// }

export function getDefaultSelecteds(mode) {
  if (mode === 'date') {
    return getDateValues()
  } else if (mode === 'time') {
    return getTimeValues()
  } else if (mode === 'datetime') {
    return getDatetimeValues()
  }

  return []
}
