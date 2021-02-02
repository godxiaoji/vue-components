/**
 * 将字段名转为驼峰式格式
 * @param {string} name 字段名
 */
export function kebabCase2CamelCase(name) {
  name = name.replace(/-(\w)/g, (all, letter) => {
    return letter.toUpperCase()
  })
  return name.substr(0, 1).toLowerCase() + name.substr(1)
}

/**
 * 将字段名转为横杆连接格式
 * @param {string} name 字段名
 */
export function camelCase2KebabCase(name) {
  const arr = []

  for (let i = 0; i < name.length; i++) {
    let letter = name[i]

    if (letter.charCodeAt() >= 65 && letter.charCodeAt() <= 90) {
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
 * @param {any} object 值
 */
export function isUndefined(object) {
  return typeof object === 'undefined'
}

/**
 * 是否布尔值
 * @param {any} object 值
 */
export function isBoolean(object) {
  return typeof object === 'boolean'
}

/**
 * 是否函数
 * @param {any} object 值
 */
export function isFunction(object) {
  return typeof object === 'function'
}

/**
 * 是否字符串
 * @param {any} object 值
 */
export function isString(object) {
  return typeof object === 'string'
}

/**
 * 是否对象，包含常见的{}/[]，不含null
 * @param {any} object 值
 */
export function isObject(object) {
  return typeof object === 'object' && object !== null
}

/**
 * 是否数值，这里会对排除无穷大/无穷小的情况
 * @param {any} object 值
 */
export function isNumber(object) {
  return typeof object === 'number' && isFinite(object)
}

/**
 * 是否数值/可转为数值，如'1.1'，这里会对排除无穷大/无穷小的情况
 * @param {any} object 值
 */
export function isNumeric(object) {
  return object != null && !isNaN(parseFloat(object))
}

/**
 * 是否整数
 * @param {any} object 值
 */
export function isInteger(object) {
  return isNumber(object) && object % 1 === 0
}

/**
 * 是否数组
 * @param {any} object 值
 */
export function isArray(object) {
  return Array.isArray(object)
}

/**
 * 是否Date实例
 * @param {any} object 值
 */
export function isDate(object) {
  return object instanceof Date
}

/**
 * 是否DOM
 * @param {any} object 值
 */
export function isElement(object) {
  return object instanceof Element
}

/**
 * 是否node节点
 * @param {any} object 值
 */
export function isNode(object) {
  return object instanceof Node
}

/**
 * 是否Symbol
 * @param {any} object 值
 */
export function isSymbol(object) {
  return (
    typeof object === 'symbol' ||
    (isObject(object) &&
      Object.prototype.toString.call(object) === '[object Symbol]')
  )
}

/**
 * 是否空对象{}
 * @param {Object} object 值
 */
export function isEmptyObject(object) {
  let has = false

  for (const i in object) {
    if (hasOwnProperty(object, i)) {
      has = true
      break
    }
  }

  return !has
}

export function isStringNumberMix(value) {
  return isString(value) || isNumber(value)
}

/**
 * 是否Number[]
 * @param {any} object 值
 */
export function isNumberArray(object) {
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
 * @param {any} object 值
 */
export function isStringArray(object) {
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
 * 是否只存在数值或者字符串的数组
 * @param {any} object 值
 */
export function isStringNumberMixArray(object) {
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
 * @param {any} object 值
 */
export function isDateArray(object) {
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
export function isSameArray(a, b) {
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
 * 伪数组转为数组
 * @param {ArrayLike} object 伪数组
 */
export function arrayLike2Array(object) {
  return Array.prototype.slice.call(object)
}

export function noop() {}

export function no() {
  return false
}

function hasOwnProperty(object, key) {
  return Object.prototype.hasOwnProperty.call(object, key)
}

/**
 * 对象遍历
 * @param {Object} object 对象
 * @param {Function} callback 遍历回调
 */
export function objectForEach(object, callback) {
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
 * @param {Object} data 对象
 */
export function cloneData(data) {
  return JSON.parse(JSON.stringify(data))
}

/**
 * 判断值是否在数组中
 * @param {any} value 值
 * @param {any[]} array 数组
 */
export function inArray(value, array) {
  return array.indexOf(value) !== -1
}

/**
 * 获取随机数
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 */
export function getRandomNumber(min, max) {
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
 * @param {Number} length 返回字符串长度
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
 * @param {String} value 值
 */
export function capitalize(value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export function htmlEscape(text) {
  return text.replace(/[<>"&]/g, function(match) {
    switch (match) {
      case '<':
        return '&lt;'
      case '>':
        return '&gt;'
      case '&':
        return '&amp;'
      case '"':
        return '&quot;'
    }
  })
}

/**
 * 获取限定范围的数值
 * @param {Number} number
 * @param {Number} min
 * @param {Number} max
 */
export function rangeNumber(number, min, max) {
  return Math.min(max, Math.max(min, number))
}

/**
 * 获取限定范围内的整数
 * @param {Number} number
 * @param {Number} min
 * @param {Number} max
 */
export function rangeInteger(number, min, max) {
  if (isString(number)) {
    if (isNumeric(number)) {
      number = parseFloat(number)
    } else {
      number = min
    }
  }

  return rangeNumber(Math.round(number), Math.ceil(min), Math.floor(max))
}
