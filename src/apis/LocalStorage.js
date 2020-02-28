import { isString, isDate } from '../helpers/util'

/**
 * 验证是否合法key
 * @param key
 */
function _isVaildKey(key) {
  if (!isString(key) || !key) {
    throw new Error(`Invalid param: "key" is not a string type or empty.`)
  }
}

const STORAGE_PER_LIMIT_SIZE = 1024 // 每个限制使用的大小，KB
const STORAGE_LIMIT_SIZE = 2560 // 限制使用的大小，KB

/**
 * 将数据存储在本地缓存中指定的 key 中。会覆盖掉原来该 key 对应的内容。除非用户主动删除或因存储空间原因被系统清理，否则数据都一直可用。单个 key 允许存储的最大数据长度为 1024KB，所有数据存储上限为 2560KB
 * @param key
 * @param data
 */
export function setStorageSync(key, data) {
  _isVaildKey(key)

  if (data == null) {
    throw new Error('Invalid param: "data" cannot be null or undefined.')
  }

  const storageInfo = getStorageInfoSync()

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

  localStorage.setItem(key, value)
}

/**
 * 从本地缓存中获取指定 key 的内容
 * @param key
 */
export function getStorageSync(key) {
  _isVaildKey(key)

  const value = localStorage.getItem(key)

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
  _isVaildKey(key)

  localStorage.removeItem(key)
}

/**
 * 清理本地数据缓存
 */
export function clearStorageSync() {
  localStorage.clear()
}

/**
 * 获取当前storage的相关信息
 */
export function getStorageInfoSync() {
  const keys = []
  let size = 0

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)

    keys.push(key)
    size += localStorage.getItem(key).length
  }

  return {
    keys,
    currentSize: size / 1024,
    limitSize: STORAGE_LIMIT_SIZE
  }
}
