import { createApp } from 'vue'
import Picker from '@/PickerPopup'
import Cascader from '@/CascaderPopup'
import Calendar from '@/CalendarPopup'
import ActionSheet from '@/ActionSheet'
import Popover from '@/Popover'
import PopMenu from '@/PopMenu'
import PopDialog from '@/PopDialog'
import Dialog from '@/Dialog'
import ImagePreview from '@/ImagePreview'
import { isObject } from '@/helpers/util'
import { getCallbackFns } from '@/apis/callback'
import { parseParamsByRules } from '@/apis/rules'
import { ApiOptions } from '@/apis/types'
import { PopupBridge, PopupRes, createPopup } from '@/hooks/popup'

type Hook = (hookName: string, res: PopupRes) => void
type Done = (res: PopupRes) => void

/**
 * 展示弹窗
 * @param object 参数
 */
function show(
  object: ApiOptions,
  apiName: string,
  getOptions: (done: Done) => { component: any; hook?: Hook }
) {
  if (!isObject(object)) {
    object = {}
  }

  const { success, fail, complete } = getCallbackFns(object)

  return new Promise<PopupRes>(function(resolve, reject) {
    try {
      const done: Done = function(res) {
        success(res)
        complete()
        resolve(res)
      }

      const propsData: any = parseParamsByRules(object, apiName)

      if (propsData.mode) {
        propsData.initialMode = propsData.mode
        delete propsData.mode
      }
      if (propsData.value) {
        propsData.modelValue = propsData.value
        delete propsData.value
      }

      const { component, hook } = getOptions(done)
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
              app.unmount($wrapper)
              break
            }
            default: {
              hook && hook(hookName, res)
              break
            }
          }
        }
      } as PopupBridge)
      app.mount($wrapper)

      return app
    } catch (e) {
      fail(e)
      complete()
      reject(e)
    }
  })
}

/**
 * 展示选择器
 * @param object 参数
 */
export function showPicker(object: ApiOptions) {
  return show(object, 'showPicker', function(done) {
    const hook: Hook = (hookName, res) => {
      if (hookName === 'afterConfirm' || hookName === 'afterCancel') {
        done(res)
      }
    }

    return {
      component: Picker,
      hook
    }
  })
}

/**
 * 展示级联选择器
 * @param object 参数
 */
export function showCascader(object: ApiOptions) {
  return show(object, 'showCascader', function(done) {
    const hook: Hook = (hookName, res) => {
      if (hookName === 'afterConfirm' || hookName === 'afterCancel') {
        done(res)
      }
    }

    return {
      component: Cascader,
      hook
    }
  })
}

/**
 * 展示日历选择器
 * @param object 参数
 */
export function showCalendar(object: ApiOptions) {
  return show(object, 'showCalendar', function(done) {
    const hook: Hook = (hookName, res) => {
      if (hookName === 'afterConfirm' || hookName === 'afterCancel') {
        done(res)
      }
    }

    return {
      component: Calendar,
      hook
    }
  })
}

/**
 * 展示动作面板
 * @param object 参数
 */
export function showActionSheet(object: ApiOptions) {
  return show(object, 'showActionSheet', function(done) {
    const hook: Hook = (hookName, res) => {
      if (hookName === 'afterConfirm' || hookName === 'afterCancel') {
        done(res)
      }
    }

    return {
      component: ActionSheet,
      hook
    }
  })
}

/**
 * 展示气泡
 * @param object 参数
 */
export function showPopover(object: ApiOptions) {
  return show(object, 'showPopover', function(done) {
    const hook: Hook = (hookName, res) => {
      if (hookName === 'afterShow') {
        done(res)
      }
    }

    return {
      component: Popover,
      hook
    }
  })
}

/**
 * 展示气泡对话框
 * @param object 参数
 */
export function showPopDialog(object: ApiOptions) {
  return show(object, 'showPopDialog', function(done) {
    const hook: Hook = (hookName, res) => {
      if (hookName === 'afterConfirm' || hookName === 'afterCancel') {
        done(res)
      }
    }

    return {
      component: PopDialog,
      hook
    }
  })
}

/**
 * 展示气泡菜单
 * @param object 参数
 */
export function showPopMenu(object: ApiOptions) {
  return show(object, 'showPopMenu', function(done) {
    const hook: Hook = (hookName, res) => {
      if (hookName === 'afterConfirm' || hookName === 'afterCancel') {
        done(res)
      }
    }

    return {
      component: PopMenu,
      hook
    }
  })
}

/**
 * 展示对话框
 * @param object 参数
 */
export function showDialog(object: ApiOptions) {
  return show(object, 'showDialog', function(done) {
    const hook: Hook = (hookName, res) => {
      if (hookName === 'afterConfirm' || hookName === 'afterCancel') {
        done(res)
      }
    }

    return {
      component: Dialog,
      hook
    }
  })
}

/**
 * 展示图片预览
 * @param object 参数
 */
export function previewImage(object: ApiOptions) {
  return show(object, 'previewImage', function(done) {
    const hook: Hook = (hookName, res) => {
      if (hookName === 'afterCancel') {
        done(res)
      }
    }

    return {
      component: ImagePreview,
      hook
    }
  })
}
