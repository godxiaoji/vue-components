import {
  isString,
  inArray,
  // isFunction,
  // isNumber,
  // isSymbol,
  // isStringArray,
  // isArray,
  // isDate,
  // isDateArray,
  // isNumberArray,
  // isStringNumberMixArray,
  isObject,
  isHTMLElement,
  isStringNumberMixArray,
  isNumber,
  isDateArray,
  isDate,
  isStringArray,
  isNumberArray,
  isFunction,
  isSymbol,
  isArray
} from '../helpers/util'
import dayjs from 'dayjs'
import { DomSelector, getSizeValue } from '../helpers/dom'

export interface Validator {
  (value: any): boolean
  _type: string
}

const emptys = ['null', 'undefined', 'NaN']

/**
 * dom
 * @param value
 */
export const elementValidator = (value: unknown) => {
  return isHTMLElement(value)
}
elementValidator._type = `HTMLElement`

/**
 * 字符串数组
 * @param value
 */
export const stringArrayValidator = (value: unknown) => {
  return isStringArray(value)
}
stringArrayValidator._type = `String[]`

/**
 * 非空校验器
 * @param value
 */
export const notNullValidator = (value: unknown) => {
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

// /**
//  * hex色值校验器
//  * @param value
//  */
// export function hexColorValidator(value) {
//   return /^#[0-9A-F]{6}$/i.test(value)
// }

// hexColorValidator._type = 'HexColor(eg: #000000)'

// /**
//  * 创建数值范围验证器
//  * @param {Number} min
//  * @param {Number} max
//  */
// export function createNumberRangeValidator(min = -Infinity, max = Infinity) {
//   /**
//    * 数值范围验证器
//    * @param value
//    */
//   function numberRangeValidator(value) {
//     if (isNumber(value) && value >= min && value <= max) {
//       return true
//     }
//     return false
//   }
//   numberRangeValidator._type = `Range(${min} ~ ${max})`

//   return numberRangeValidator
// }

export function calendarValueValidator(value: unknown) {
  if (value == null) {
    return true
  } else if (isDateArray(value)) {
    return true
  } else if (isDate(value)) {
    return true
  } else if (isStringArray(value) || isNumberArray(value)) {
    let is = true
    for (let i = 0; i < (value as any[]).length; i++) {
      if (!dayjs((value as any[])[i]).isValid()) {
        is = false
        break
      }
    }
    return is
  } else if (value === '') {
    return true
  }
  return dayjs(value as any).isValid()
}
calendarValueValidator._type = 'Date, Date[], number[], string[] et.'

/**
 * 获取类型
 * @param {any} obj
 */
export function getType(obj: unknown) {
  if (isFunction(obj)) {
    if ((obj as Validator)._type) {
      // 如果是校验器
      return (obj as Validator)._type
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

export const selectorValidator = (value: DomSelector) => {
  return isString(value) || isHTMLElement(value) || value === document
}
selectorValidator._type = 'Element, Document Or string'

export const stringNumberArrayMixValidator = (value: unknown) => {
  return isStringNumberMixArray(value) || isString(value) || isNumber(value)
}
stringNumberArrayMixValidator._type = 'number, string, (number | string)[]'

export const sizeValidator = (value: number | string) => {
  return getSizeValue(value, Infinity) !== Infinity
}
sizeValidator._type = 'number or string(eg: 10px, 5vw, 1vh)'

export const createEnumsValidator = (enums: string[]) => {
  const validator = function(value: string) {
    return inArray(value, enums)
  }

  validator._type = `in [${enums
    .map(v => {
      return `"${v}"`
    })
    .join(', ')}]`

  return validator as Validator
}

export function getEnumsValue<T = string>(enums: T[], value?: unknown): T {
  return inArray(value, enums) ? (value as T) : enums[0]
}

/**
 * 判断是否svg组件
 * @param value 值
 */
export function isSvgComponent(value: any) {
  return !!(
    isObject(value) &&
    value.__file &&
    value.__file.indexOf('.svg') > -1
  )
}

export const iconValidator = (value: unknown) => {
  return isString(value) || isSvgComponent(value)
}
iconValidator._type = 'string Or SVG Component'
