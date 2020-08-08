import { isDate, isObject } from '../helpers/util'
import { parseParamsByRules } from './rules'
import { SDKKey } from '../config'
import { getCallbackFns } from './callback'

const prefix = SDKKey + ':'

const STORAGE_PER_LIMIT_SIZE = 1024 // 每个限制使用的大小，KB
const STORAGE_LIMIT_SIZE = 2560 // 限制使用的大小，KB

/**
 * 将数据存储在本地缓存中指定的 key 中。会覆盖掉原来该 key 对应的内容。除非用户主动删除或因存储空间原因被系统清理，否则数据都一直可用。单个 key 允许存储的最大数据长度为 1024KB，所有数据存储上限为 2560KB
 * @param key
 * @param data
 */
export function setStorageSync(key, data) {
  parseParamsByRules(
    {
      key,
      data
    },
    'setStorage'
  )

  const storageInfo = getStorageInfo()

  const value = JSON.stringify({
    isApp: true,
    isDate: isDate(data),
    data
  })

  const valueSize = value.length / 1024

  if (valueSize > STORAGE_PER_LIMIT_SIZE) {
    throw new Error(
      `Storage error: per storage limit size exceeded ${STORAGE_PER_LIMIT_SIZE}KB.`
    )
  }

  if (storageInfo.currentSize + valueSize > storageInfo.limitSize) {
    // 超过限制大小
    throw new Error(
      `Storage error: total storage limit size exceeded ${STORAGE_LIMIT_SIZE}KB.`
    )
  }

  localStorage.setItem(prefix + key, value)
}

/**
 * 从本地缓存中获取指定 key 的内容
 * @param key
 */
export function getStorageSync(key) {
  parseParamsByRules(
    {
      key
    },
    'getStorage'
  )

  const value = localStorage.getItem(prefix + key)

  if (value) {
    try {
      let ret = JSON.parse(value)

      if (ret.isApp) {
        return ret.isDate ? new Date(ret.data) : ret.data
      }
    } catch (e) {
      //
    }

    return null
  }
}

/**
 * 从本地缓存中移除指定 key
 * @param key
 */
export function removeStorageSync(key) {
  parseParamsByRules(
    {
      key
    },
    'removeStorage'
  )

  localStorage.removeItem(prefix + key)
}

/**
 * 清理本地数据缓存
 */
export function clearStorageSync() {
  // localStorage.clear()

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)

    if (key.indexOf(prefix) === 0) {
      // 只删除有当前api集存储的数据
      localStorage.removeItem(key)
    }
  }
}

/**
 * 获取当前storage的相关信息
 */
export function getStorageInfoSync() {
  const keys = []
  let size = 0

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)

    if (key.indexOf(prefix) === 0) {
      // 只显示有当前api集存储的数据
      keys.push(key.replace(prefix, ''))
    }

    size += localStorage.getItem(key).length
  }

  return {
    keys,
    currentSize: size / 1024,
    limitSize: STORAGE_LIMIT_SIZE
  }
}

export function getStorage(object) {
  if (!isObject(object)) {
    object = {}
  }
  const { success, fail, complete } = getCallbackFns(object)

  try {
    const data = getStorageSync(object.key)

    success({ data })
  } catch (error) {
    fail(error)
  }

  complete()
}

export function setStorage(object) {
  if (!isObject(object)) {
    object = {}
  }
  const { success, fail, complete } = getCallbackFns(object)

  try {
    setStorageSync(object.key, object.data)

    success({})
  } catch (error) {
    fail(error)
  }

  complete()
}

export function removeStorage(object) {
  if (!isObject(object)) {
    object = {}
  }
  const { success, fail, complete } = getCallbackFns(object)

  try {
    removeStorageSync(object.key)

    success({})
  } catch (error) {
    fail(error)
  }

  complete()
}

export function clearStorage(object) {
  if (!isObject(object)) {
    object = {}
  }
  const { success, complete } = getCallbackFns(object)

  clearStorageSync()
  success({})
  complete()
}

export function getStorageInfo(object) {
  if (!isObject(object)) {
    object = {}
  }
  const { success, complete } = getCallbackFns(object)

  const res = getStorageInfoSync()
  success(res)
  complete()
}
