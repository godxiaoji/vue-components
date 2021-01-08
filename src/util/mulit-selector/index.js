import {
  getDateValues,
  getTimeValues,
  getDatetimeValues,
  parseDateList,
  parseTimeList,
  parseDatetimeList,
  dateString2Array,
  timeString2Array,
  datetimeString2Array
} from './date'
import { parseRegionList } from './region'
import {
  cloneData,
  isArray,
  isNumber,
  isObject,
  isString
} from '../../helpers/util'
import Exception from '../../helpers/exception'

export { dateString2Array, timeString2Array, datetimeString2Array }

const getList = options => {
  const list = []

  if (options && options.length > 0) {
    options.forEach(v => {
      const item = cloneData(v)

      item.hasChildren = v.children && v.children.length > 0 ? true : false

      list.push(item)
    })
  }

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

export function array2String(labels, mode, separator = '/') {
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

export function string2Array(value, mode, separator = '/') {
  try {
    let values = []

    if (value == null) {
      return []
    } else if (isNumber(value)) {
      values = [value]
    } else if (!value) {
      values = []
    } else if (isArray(value)) {
      values = value
    } else if (mode === 'date') {
      values = dateString2Array(value)
    } else if (mode === 'time') {
      values = timeString2Array(value)
    } else if (mode === 'datetime') {
      values = datetimeString2Array(value)
    } else if (isString(value)) {
      values = value.split(separator)
    } else {
      throw new Error('Invalid prop: invalid "value".')
    }

    return values
  } catch (e) {
    return new Error(e.message)
  }
}

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

export function parseOptions(options, fieldNames) {
  const newOptions = []

  if (isArray(options)) {
    options.forEach(option => {
      if (isArray(option)) {
        // 二维数组
        const subOptions = parseOptions(option, fieldNames)

        if (subOptions.length > 0) {
          newOptions.push(subOptions)
        }
      } else if (isNumber(option) || isString(option)) {
        // 纯数值或者字符串
        newOptions.push({
          label: option.toString(),
          value: option,
          disabled: false
        })
      } else if (
        isObject(option) &&
        (isNumber(option[fieldNames.value]) ||
          isString(option[fieldNames.value]))
      ) {
        newOptions.push({
          label:
            option[fieldNames.label] == null
              ? option[fieldNames.value]
              : option[fieldNames.label],
          value: option[fieldNames.value],
          disabled: option.disabled ? true : false,
          children: parseOptions(option[fieldNames.children], fieldNames)
        })
      }
    })
  }

  return newOptions
}

export function getDefaultFieldNames() {
  return cloneData({ label: 'label', value: 'value', children: 'children' })
}

export function getDefaultDetail() {
  return cloneData({ valueString: '', value: [], labelString: '', label: [] })
}

export const DATE_MODE_NAMES = ['date', 'time', 'datetime']

export const MODE_NAMES = ['multiSelector', 'region'].concat(DATE_MODE_NAMES)

/**
 * 非级联检查
 * @param {Array} values
 * @param {Array} options
 */
function validateCols(values, options) {
  const cols = isArray(options[0]) ? options : [options]
  let selectCount = 0
  const value = []
  const label = []

  cols.forEach((list, colIndex) => {
    for (let i = 0; i < list.length; i++) {
      const item = list[i]
      if (item.value == values[colIndex]) {
        selectCount++
        value.push(item.value)
        label.push(item.label)
        break
      }
    }
  })

  return selectCount === cols.length
    ? {
        vaild: true,
        value,
        label
      }
    : {
        vaild: false,
        value: [],
        label: []
      }
}

/**
 * 级联检查
 * @param {Array} values
 * @param {Array} options
 */
function validateCascadeCols(values, options, mode) {
  const value = []
  const label = []

  const deep = (index, parent) => {
    const optionList = parseDropdownList(mode, index, parent)

    for (let i = 0; i < optionList.length; i++) {
      const optionItem = optionList[i]

      if (optionItem.value === values[index]) {
        if (optionItem.hasChildren && values[index + 1]) {
          // 都有下一项
          value.push(optionItem.value)
          label.push(optionItem.label)
          return deep(index + 1, optionItem)
        } else if (!optionItem.hasChildren && index + 1 >= values.length) {
          // 都没有下一项，匹配正确
          value.push(optionItem.value)
          label.push(optionItem.label)
          return true
        } else {
          return false
        }
      }
    }

    return false
  }

  return deep(0, options)
    ? {
        vaild: true,
        value,
        label
      }
    : {
        vaild: false,
        value: [],
        label: []
      }
}

export function validateValues(values, options, mode, separator, isCascade) {
  values = string2Array(values, mode, separator)

  let ret

  if (values instanceof Error) {
    console.error(values.message)
    ret = {
      vaild: false,
      value: [],
      label: [],
      valueString: '',
      labelString: ''
    }
  } else if (values.length === 0) {
    // 空数组也算符合
    ret = {
      vaild: true,
      value: [],
      label: []
    }
  } else {
    ret = isCascade
      ? validateCascadeCols(values, options, mode)
      : validateCols(values, options)

    if (!ret.vaild) {
      console.error(
        new Exception(
          '"value" is not in "options".',
          Exception.TYPE.PROP_ERROR,
          'MulitSelector'
        )
      )
    }
  }

  ret.valueString =
    ret.value.length > 0 ? array2String(ret.value, mode, separator) : ''
  ret.labelString =
    ret.label.length > 0 ? array2String(ret.label, mode, separator) : ''

  return ret
}

export function getFormatOptions(options, fieldNames, mode, cascader = false) {
  const newFieldNames = getDefaultFieldNames()

  let newOptions = []
  let isCascade = false

  if (mode === MODE_NAMES[0]) {
    if (isObject(fieldNames)) {
      if (isString(fieldNames.label)) {
        newFieldNames.label = fieldNames.label
      }
      if (isString(fieldNames.value)) {
        newFieldNames.value = fieldNames.value
      }
      if (isString(fieldNames.children)) {
        newFieldNames.children = fieldNames.children
      }
    }

    newOptions = parseOptions(options, newFieldNames)

    // 判断是否级联模式
    if (cascader) {
      // 级联选择器下强制级联模式
      isCascade = true
    } else {
      for (let i = 0; i < newOptions.length; i++) {
        if (newOptions[i].children && newOptions[i].children[0]) {
          isCascade = true
          break
        }
      }
    }
  } else {
    isCascade = true
  }

  // console.log({
  //   options: newOptions,
  //   isCascade,
  //   fieldNames: newFieldNames,
  //   mode
  // })

  return {
    options: newOptions,
    isCascade,
    fieldNames: newFieldNames
  }
}

export function isEmpty(object) {
  return (
    object == null || object === '' || (isArray(object) && object.length === 0)
  )
}
