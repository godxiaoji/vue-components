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

export function isArray(object) {
  return Array.isArray(object)
}

export function isDate(object) {
  return object instanceof Date
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

export function getRandomNumber(length = 6) {
  return Math.random()
    .toString()
    .substr(2, length)
}
