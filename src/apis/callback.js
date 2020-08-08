import { noop, isFunction } from '../helpers/util'

function handleError(error) {
  if (isFunction(error.getFailError)) {
    return error.getFailError()
  }
  return {
    errMsg: error.message
  }
}

/**
 * 获取回调函数
 * @param {Object} options object
 * @returns {{success: Function, fail: Function, complete: Function}}
 */
export function getCallbackFns(options) {
  return {
    success: isFunction(options.success) ? options.success : noop.bind(options),
    fail(error) {
      if (isFunction(options.fail)) {
        options.fail(handleError(error))
      } else {
        console.error(error)
      }
    },
    complete: isFunction(options.complete)
      ? options.complete
      : noop.bind(options)
  }
}
