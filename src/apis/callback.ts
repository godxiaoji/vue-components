import {
  ApiOptions,
  ApiOptionsComplete,
  ApiOptionsFail,
  ApiOptionsSuccess
} from './types'
import Exception from '@/helpers/exception'
import { noop, isFunction } from '@/helpers/util'

/**
 * 获取回调函数
 * @param options object
 */
export function getCallbackFns(options: ApiOptions) {
  return {
    success: (isFunction(options.success)
      ? options.success
      : noop.bind(options)) as ApiOptionsSuccess,
    fail(error: Error | string) {
      if (isFunction(options.fail)) {
        ;(options.fail as ApiOptionsFail)(new Exception(error))
      } else {
        console.error(error)
      }
    },
    complete: (isFunction(options.complete)
      ? options.complete
      : noop.bind(options)) as ApiOptionsComplete
  }
}
