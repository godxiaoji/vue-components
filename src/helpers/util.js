/**
 * 将字段名转为驼峰式
 * @param {string} name 字段名
 */
export function kebabCase2CamelCase(name) {
  name = name.replace(/-(\w)/g, (all, letter) => {
    return letter.toUpperCase()
  })
  return name.substr(0, 1).toLowerCase() + name.substr(1)
}

/**
 * 将字段名转为横杆
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

export function isUndefined(object) {
  return typeof object === 'undefined'
}

export function isBoolean(object) {
  return typeof object === 'boolean'
}

export function isFunction(object) {
  return typeof object === 'function'
}

export function isString(object) {
  return typeof object === 'string'
}

export function isObject(object) {
  return typeof object === 'object'
}

export function isNumber(object) {
  return typeof object === 'number' && isFinite(object)
}

export function isNumeric(object) {
  return object != null && isFinite(object)
}

export function isArray(object) {
  return Array.isArray(object)
}

export function isDate(object) {
  return object instanceof Date
}

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

export function objectKeys(object) {
  const keys = []

  if (isObject(object)) {
    for (const k in object) {
      if (hasOwnProperty(object, k)) {
        keys.push(k)
      }
    }
  }

  return keys
}

export function objectForEach(object, callback) {
  if (isObject(object)) {
    for (const k in object) {
      if (hasOwnProperty(object, k)) {
        callback(object[k], k)
      }
    }
  }
}

export function cloneData(data) {
  return JSON.parse(JSON.stringify(data))
}

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

export function removeArraySubItems(values, array) {
  if (!isArray(values)) {
    values = [values]
  }

  const newArray = []

  array.forEach(v => {
    if (!inArray(v, values)) {
      newArray.push(v)
    }
  })

  return newArray
}

/**
 * 获取GUID
 */
export const createGuid = () => {
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
export const getRandomString = (length = 32) => {
  const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
  const maxPos = $chars.length
  let pwd = ''
  for (let i = 0; i < length; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}

export function NotNull(data) {
  if (data == null || (typeof data === 'number' && isNaN(data))) {
    return `${data}`
  }
  return data
}
