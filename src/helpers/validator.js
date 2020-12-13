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
  cloneData,
  isObject,
  isStringNumberMixArray
} from './util'
import dayjs from 'dayjs'

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

function selectorValidator(value) {
  return isString(value) || isElement(value)
}
selectorValidator._type = 'element Or string'

export function arrayValueValidator(value) {
  return isStringNumberMixArray(value) || isString(value) || isNumber(value)
}
arrayValueValidator._type = 'number, string, number[] or string[]'

const MAP = {
  placement: {
    enums: ['bottom', 'top', 'left', 'right'],
    default: 'bottom'
  },
  buttonSize: {
    enums: ['large', 'middle', 'small'],
    default: 'large'
  },
  buttonShape: {
    enums: ['rectangle', 'round', 'circle', 'square'],
    default: 'rectangle'
  },
  buttonPattern: {
    enums: ['default', 'solid', 'dashed', 'borderless'],
    default: 'default'
  },
  selector: {
    validator: selectorValidator,
    requird: true
  }
}

export function getPropValidation(propName) {
  const rule = MAP[propName]

  if (rule.enums) {
    const validator = function(value) {
      return inArray(value, rule.enums)
    }
    validator._type = `in [${rule.enums
      .map(v => {
        return `"${v}"`
      })
      .join(', ')}]`

    return {
      validator,
      default: isObject(rule.default)
        ? function() {
            return cloneData(rule.default)
          }
        : rule.default
    }
  } else if (rule.validator) {
    return rule
  }
}

export function getPropValue(propName, value) {
  const rule = MAP[propName]

  if (rule.enums) {
    if (inArray(value, rule.enums)) {
      return value
    }
    return rule.default
  }

  return null
}
