import {
  isString,
  inArray,
  isFunction,
  isNumber,
  isSymbol,
  isStringArray,
  isElement,
  isArray
} from './util'

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
