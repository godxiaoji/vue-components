import {
  isString,
  inArray,
  isFunction,
  isNumber,
  isSymbol,
  isStringArray,
  isElement,
  isArray,
  isDate,
  isDateArray,
  isNumberArray,
  isStringNumberMixArray,
  isObject
} from './util'
import dayjs from 'dayjs'
import { getSizeValue } from './dom'

const emptys = ['null', 'undefined', 'NaN']

/**
 * dom
 * @param {any} value
 */
export function elementValidator(value) {
  return isElement(value)
}

elementValidator._type = `Element`

/**
 * 字符串数组
 * @param {any} value
 */
export function stringArrayValidator(value) {
  return isStringArray(value)
}

stringArrayValidator._type = `String[]`

/**
 * 非空校验器
 * @param {any} value
 */
export function notNullValidator(value) {
  if (value == null || (typeof value === 'number' && isNaN(value))) {
    return false
  }
  return true
}

notNullValidator._type = `any(not in [${emptys
  .map(v => {
    return `"${v}"`
  })
  .join(', ')}])`

/**
 * hex色值校验器
 * @param {any} value
 */
export function hexColorValidator(value) {
  return /^#[0-9A-F]{6}$/i.test(value)
}

hexColorValidator._type = 'HexColor(eg: #000000)'

/**
 * 创建数值范围验证器
 * @param {Number} min
 * @param {Number} max
 */
export function createNumberRangeValidator(min = -Infinity, max = Infinity) {
  /**
   * 数值范围验证器
   * @param {any} value
   */
  function numberRangeValidator(value) {
    if (isNumber(value) && value >= min && value <= max) {
      return true
    }
    return false
  }
  numberRangeValidator._type = `Range(${min} ~ ${max})`

  return numberRangeValidator
}

export function calendarValueValidator(value) {
  if (value == null) {
    return true
  } else if (isDateArray(value)) {
    return true
  } else if (isDate(value)) {
    return true
  } else if (isStringArray(value) || isNumberArray(value)) {
    let is = true
    for (let i = 0; i < value.length; i++) {
      if (!dayjs(value[i]).isValid()) {
        is = false
        break
      }
    }
    return is
  } else if (value === '') {
    return true
  }
  return dayjs(value).isValid()
}

/**
 * 获取类型
 * @param {any} obj
 */
export function getType(obj) {
  if (isFunction(obj)) {
    if (obj._type) {
      // 如果是校验器
      return obj._type
    }
    return 'custom type'
  } else if (isSymbol(obj)) {
    return 'symbol'
  } else if (isString(obj)) {
    return typeof obj
  } else if (inArray(obj + '', emptys)) {
    return obj + ''
  } else if (isArray(obj)) {
    return 'array'
  }

  return typeof obj
}

export function selectorValidator(value) {
  return isString(value) || isElement(value)
}
selectorValidator._type = 'element Or string'

export function eventSelectorValidator(value) {
  // 这个值必须匹配下列字符串中的一个
  return selectorValidator(value) || value === document
}
eventSelectorValidator._type = 'element, document Or string'

export function arrayValueValidator(value) {
  return isStringNumberMixArray(value) || isString(value) || isNumber(value)
}
arrayValueValidator._type = 'number, string, number[] or string[]'

export function sizeValidator(value) {
  const size = getSizeValue(value, null)

  return size !== null
}

const ENUM_MAP = {
  placement: ['bottom', 'top', 'left', 'right'],
  buttonSize: ['large', 'middle', 'small'],
  buttonShape: ['rectangle', 'round', 'circle', 'square'],
  buttonPattern: ['default', 'solid', 'dashed', 'borderless', 'gradient'],
  type: ['default', 'primary', 'warning', 'danger', 'success'],
  buttonFormType: ['button', 'submit', 'reset'],
  tagPattern: ['light', 'dark', 'plain'],
  tagSize: ['large', 'middle', 'small']
}

export function createEnumsValidator(propName) {
  const rule = ENUM_MAP[propName]

  const validator = function(value) {
    return inArray(value, rule)
  }
  validator._type = `in [${rule
    .map(v => {
      return `"${v}"`
    })
    .join(', ')}]`

  return validator
}

export function getEnumsValue(propName, value) {
  const rule = ENUM_MAP[propName]

  if (inArray(value, rule)) {
    return value
  }
  return rule[0]
}

export function iconValidator(value) {
  return isString(value) || (isObject(value) && value.functional)
}
iconValidator._type = 'string Or SVG Component'
