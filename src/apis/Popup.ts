import { createApp } from 'vue'
import { isObject, isString } from '@/helpers/util'
import { getCallbackFns } from '@/apis/callback'
import { parseParamsByRules } from '@/apis/rules'
import { ApiOptions, PopupHook, PopupBridge } from './types'
import { createPopup } from '@/hooks/popup'
import Exception from '@/helpers/exception'

type PopupDone = (res: any) => void

interface RefFns {
  [propName: string]: Function
}

const $refs: {
  [propName: string]: {
    uid: number
    fns: RefFns
  }
} = {}

/**
 * 展示弹窗
 * @param object 参数
 */
export function showPopup(
  object: string | ApiOptions,
  apiName: string,
  getOptions: (
    done: PopupDone
  ) => { component: any; hook?: PopupHook; singleMode?: boolean }
) {
  let options: ApiOptions

  if (isString(object)) {
    options = {
      title: object
    }
  } else if (!isObject(object)) {
    options = {}
  } else {
    options = object as ApiOptions
  }

  const { success, fail, complete } = getCallbackFns(options)

  return new Promise<any>(function(resolve, reject) {
    try {
      const key = apiName.replace('show', '')
      const { component, hook, singleMode } = getOptions(function(res) {
        success(res)
        complete()
        resolve(res)
      })

      singleMode && clear(key)

      const fns: RefFns = {}
      const propsData: any = parseParamsByRules(options, apiName)

      if (propsData.mode) {
        propsData.initialMode = propsData.mode
        delete propsData.mode
      }
      if (propsData.value) {
        propsData.modelValue = propsData.value
        delete propsData.value
      }

      const { $wrapper } = createPopup()

      const app = createApp(
        component,
        Object.assign(propsData, {
          visible: true
        })
      )
      app.provide('fxApis', {
        in(hookName, res) {
          switch (hookName) {
            case 'afterHidden': {
              app.unmount()
              singleMode && remove(key, $ref.uid)
              break
            }
            default: {
              hook && hook(hookName, res)
              break
            }
          }
        },
        out(key: string, value: any) {
          fns[key] = value
        }
      } as PopupBridge)
      app.mount($wrapper)

      const $ref = {
        uid: app._uid,
        fns
      }

      // 单例：如Toast
      singleMode && ($refs[key] = $ref)

      return app
    } catch (e) {
      fail(e)
      complete()
      reject(e)
    }
  })
}

function clear(key: string) {
  if ($refs[key]) {
    $refs[key].fns.customCancel('clear', true)
    delete $refs[key]
  }
}

function remove(key: string, uid: number) {
  if ($refs[key] && $refs[key].uid === uid) {
    delete $refs[key]
  }
}

/**
 * 隐藏弹窗
 * @param object 参数
 */
export function hidePopup(object: ApiOptions, apiName: string) {
  if (!isObject(object)) {
    object = {}
  }

  const { success, fail, complete } = getCallbackFns(object)

  try {
    clear(apiName.replace('hide', ''))

    success()
  } catch (e) {
    fail(new Exception(e.message))
  }
  complete()
}
