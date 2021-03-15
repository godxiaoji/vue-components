/**
 * 将字段名转为驼峰式格式
 * @param {string} name 字段名
 */
export function kebabCase2CamelCase(name: string) {
  name = name.replace(/-(\w)/g, (all, letter) => {
    return letter.toUpperCase()
  })
  return name.substr(0, 1).toLowerCase() + name.substr(1)
}

/**
 * 将字段名转为横杆连接格式
 * @param {string} name 字段名
 */
export function camelCase2KebabCase(name: string) {
  const arr = []

  for (let i = 0; i < name.length; i++) {
    let letter = name[i]

    if (letter.charCodeAt(0) >= 65 && letter.charCodeAt(0) <= 90) {
      letter = letter.toLowerCase()
      if (i !== 0) {
        arr.push('-')
      }
    }

    arr.push(letter)
  }

  return arr.join('')
}

/**
 * 是否undefined
 * @param object 值
 */
export function isUndefined(object: any) {
  return typeof object === 'undefined'
}

/**
 * 是否布尔值
 * @param object 值
 */
export function isBoolean(object: any) {
  return typeof object === 'boolean'
}

/**
 * 是否函数
 * @param object 值
 */
export function isFunction(object: any) {
  return typeof object === 'function'
}

/**
 * 是否字符串
 * @param object 值
 */
export const isString = (object: any) => {
  return typeof object === 'string'
}

/**
 * 是否对象，包含常见的{}/[]，不含null
 * @param object 值
 */
export function isObject(object: any) {
  return typeof object === 'object' && object !== null
}

/**
 * 是否数值，这里会对排除无穷大/无穷小的情况
 * @param object 值
 */
export function isNumber(object: any) {
  return typeof object === 'number' && isFinite(object)
}

/**
 * 是否数值/可转为数值，如'1.1'，这里会对排除无穷大/无穷小的情况
 * @param object 值
 */
export const isNumeric = (object: any) => {
  return (
    isNumber(object) ||
    (isString(object) &&
      !isNaN(parseFloat(object)) &&
      isFinite(parseFloat(object)))
  )
}

/**
 * 是否整数
 * @param object 值
 */
export function isInteger(object: any) {
  return isNumber(object) && object % 1 === 0
}

/**
 * 是否数组
 * @param object 值
 */
export function isArray(object: any) {
  return Array.isArray(object)
}

/**
 * 是否Date实例
 * @param object 值
 */
export function isDate(object: any) {
  return object instanceof Date
}

/**
 * 是否DOM
 * @param object 值
 */
export function isElement(object: any) {
  return object instanceof Element
}

/**
 * 是否HTML DOM
 * @param object 值
 */
export function isHTMLElement(object: any) {
  return object instanceof HTMLElement
}

/**
 * 是否node节点
 * @param object 值
 */
export function isNode(object: any) {
  return object instanceof Node
}

/**
 * 是否Symbol
 * @param object 值
 */
export function isSymbol(object: any) {
  return (
    typeof object === 'symbol' ||
    (isObject(object) &&
      Object.prototype.toString.call(object) === '[object Symbol]')
  )
}

/**
 * 是否空对象{}
 * @param object 值
 */
export function isEmptyObject(object: any) {
  let has = false

  for (const i in object) {
    if (hasOwnProperty(object, i)) {
      has = true
      break
    }
  }

  return !has
}

/**
 *
 * @param object 值
 */
export const isStringNumberMix = (object: any) => {
  return isString(object) || isNumber(object)
}

/**
 * 是否Number[]
 * @param object 值
 */
export function isNumberArray(object: any) {
  let is = false

  if (isArray(object)) {
    is = true

    for (let i = 0; i < object.length; i++) {
      if (!isNumber(object[i])) {
        is = false
        break
      }
    }
  }

  return is
}

/**
 * 是否String[]
 * @param object 值
 */
export const isStringArray = (object: any) => {
  let is = false

  if (isArray(object)) {
    is = true

    for (let i = 0; i < object.length; i++) {
      if (!isString(object[i])) {
        is = false
        break
      }
    }
  }

  return is
}

/**
 * string/string[]统一转为string[]
 * @param object 值
 */
export function stringMix2StringArray(object: any) {
  return isStringArray(object)
    ? (object as string[])
    : isString(object)
    ? [object as string]
    : []
}

/**
 * 是否只存在数值或者字符串的数组
 * @param object 值
 */
export const isStringNumberMixArray = (object: any) => {
  let is = false

  if (isArray(object)) {
    is = true

    for (let i = 0; i < object.length; i++) {
      if (!(isString(object[i]) || isNumber(object[i]))) {
        is = false
        break
      }
    }
  }

  return is
}

/**
 * 是否Date[]
 * @param object 值
 */
export function isDateArray(object: any) {
  let is = false

  if (isArray(object)) {
    is = true

    for (let i = 0; i < object.length; i++) {
      if (!isDate(object[i])) {
        is = false
        break
      }
    }
  }

  return is
}

/**
 * 是否相同的数组
 * @param {Array} a 数组a
 * @param {Array} b 数组b
 */
export function isSameArray(a: any[], b: any[]): boolean {
  if (a.length === b.length) {
    for (let i = 0; i < a.length; i++) {
      if (a[i] != b[i]) {
        return false
      }
    }
  } else {
    return false
  }

  return true
}

/**
 * 判断一个字段是否为空
 * @param object
 * 以下的东西被认为是空的：
 * - "" (空字符串)
 * - 0 (作为整数的0)
 * - 0.0 (作为浮点数的0)
 * - "0" (作为字符串的0)
 * - null
 * - false
 * - []
 * - undefined
 * - NaN
 * - {}
 */
export function isEmpty(object: any) {
  return (
    object == null ||
    object === '' ||
    object === '0' ||
    object === false ||
    (isNumber(object) && object == 0) ||
    (typeof object === 'number' && isNaN(object)) ||
    (isArray(object) && object.length === 0) ||
    isEmptyObject(object)
  )
}

/**
 * 伪数组转为数组
 * @param object 伪数组
 */
export function arrayLike2Array(object: ArrayLike<any>) {
  return Array.prototype.slice.call(object)
}

export function noop() {}

export function no() {
  return false
}

function hasOwnProperty(object: any, key: string) {
  return Object.prototype.hasOwnProperty.call(object, key)
}

/**
 * 对象遍历
 * @param object 对象
 * @param callback 遍历回调
 */
export function objectForEach(object: any, callback: Function) {
  if (isObject(object)) {
    for (const k in object) {
      if (hasOwnProperty(object, k)) {
        callback(object[k], k)
      }
    }
  }
}

/**
 * 深度拷贝对象
 * @param object 对象
 */
export function cloneData<T = any>(object: T): T {
  return JSON.parse(JSON.stringify(object))
}

/**
 * 判断值是否在数组中
 * @param value 值
 * @param array 数组
 */
export function inArray(value: any, array: any[]) {
  return array.indexOf(value) !== -1
}

/**
 * 获取随机数
 * @param min 最小值
 * @param max 最大值
 */
export function getRandomNumber(min: number, max: number) {
  if (min === max) {
    return min
  }
  return Math.round((Math.random() * 1000000) % (max - min)) + min
}

/**
 * 获取GUID
 */
export function createGuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * 获取随机字符
 * @param length 返回字符串长度
 */
export function getRandomString(length = 32) {
  const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
  const maxPos = $chars.length
  let pwd = ''
  for (let i = 0; i < length; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}

/**
 * 首字母大写
 * @param value 值
 */
export function capitalize(value: string) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
}

/**
 * 获取限定范围的数值
 * @param number 数值
 * @param min 最小值
 * @param max 最大值
 */
export function rangeNumber(number: number, min: number, max: number) {
  return Math.min(max, Math.max(min, number))
}

/**
 * 获取限定范围内的整数
 * @param number 数值
 * @param min 最小值
 * @param max 最大值
 */
export function rangeInteger(
  number: number | string,
  min: number,
  max: number
) {
  if (isString(number)) {
    if (isNumeric(number)) {
      number = parseFloat(number as string)
    } else {
      number = min
    }
  }

  return rangeNumber(
    Math.round(number as number),
    Math.ceil(min),
    Math.floor(max)
  )
}

/**
 * 是否在指定范围内
 * @param number 数值
 * @param min 最小值
 * @param max 最大值
 */
export const isInNumberRange = (number: unknown, min: number, max: number) => {
  return (
    isNumber(number) && (number as number) >= min && (number as number) <= max
  )
}
