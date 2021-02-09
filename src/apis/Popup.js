import { createApp } from 'vue'
import Picker from '../Picker/PickerPopup.vue'
import Cascader from '../Cascader/CascaderPopup.vue'
import Calendar from '../Calendar/CalendarPopup.vue'
import ActionSheet from '../ActionSheet'
import Popover from '../Popover'
import PopMenu from '../Popover/PopMenu.vue'
import PopDialog from '../Popover/PopDialog.vue'
import Dialog from '../Dialog'
import ImagePreview from '../ImagePreview'
import { createPopup } from '../helpers/popup'
import { isObject } from '../helpers/util'
import { getCallbackFns } from './callback'
import { parseParamsByRules } from './rules'

/**
 * 展示弹窗
 * @param {Object} object 参数
 */
function show(object, apiName, getComp) {
  if (!isObject(object)) {
    object = {}
  }

  const { success, fail, complete } = getCallbackFns(object)

  return new Promise(function(resolve, reject) {
    try {
      const done = function(res) {
        success(res)
        complete()
        resolve(res)
      }

      const propsData = parseParamsByRules(object, apiName)

      if (propsData.mode) {
        propsData.initialMode = propsData.mode
        delete propsData.mode
      }
      if (propsData.value) {
        propsData.modelValue = propsData.value
        delete propsData.value
      }

      const { $wrapper } = createPopup()

      const compOptions = getComp(done)
      compOptions.name = apiName.replace('show', '')
      if (!isObject(compOptions.methods)) {
        compOptions.methods = {}
      }
      compOptions.methods.onUpdateVisible = function(value) {
        this.$refs.popup[value ? 'show' : 'hide']()
      }
      compOptions.methods.destroy = function() {
        app.unmount($wrapper)
      }

      const app = createApp(
        compOptions,
        Object.assign(propsData, {
          visible: true
        })
      )

      return app.mount($wrapper)
    } catch (e) {
      fail(e)
      complete()
      reject(e)
    }
  })
}

/**
 * 展示选择器
 * @param {Object} object 参数
 */
export function showPicker(object) {
  return show(object, 'showPicker', function(done) {
    return {
      extends: Picker,
      methods: {
        afterConfirm(detail) {
          done({
            cancel: false,
            confirm: true,
            detail
          })
        },
        afterCancel(res) {
          res.confirm = true
          done(res)
        },
        afterHidden() {
          this.destroy()
        }
      }
    }
  })
}

/**
 * 展示级联选择器
 * @param {Object} object 参数
 */
export function showCascader(object) {
  return show(object, 'showCascader', function(done) {
    return {
      extends: Cascader,
      methods: {
        afterSelect(detail) {
          done({
            cancel: false,
            selected: true,
            detail
          })
        },
        afterCancel(res) {
          res.selected = false
          done(res)
        },
        afterHidden() {
          this.destroy()
        }
      }
    }
  })
}

/**
 * 展示日历选择器
 * @param {Object} object 参数
 */
export function showCalendar(object) {
  return show(object, 'showCalendar', function(done) {
    return {
      extends: Calendar,
      methods: {
        afterConfirm(detail) {
          done({
            cancel: false,
            confirm: true,
            detail
          })
        },
        afterCancel(res) {
          res.confirm = true
          done(res)
        },
        afterHidden() {
          this.destroy()
        }
      }
    }
  })
}

/**
 * 展示动作面板
 * @param {Object} object 参数
 */
export function showActionSheet(object) {
  return show(object, 'showActionSheet', function(done) {
    return {
      extends: ActionSheet,
      methods: {
        afterSelect(detail) {
          done({
            cancel: false,
            selected: true,
            detail
          })
        },
        afterCancel(res) {
          res.selected = false
          done(res)
        },
        afterHidden() {
          this.destroy()
        }
      }
    }
  })
}

/**
 * 展示气泡
 * @param {Object} object 参数
 */
export function showPopover(object) {
  return show(object, 'showPopover', function(done) {
    return {
      extends: Popover,
      mounted() {
        done({})
      },
      methods: {
        afterHidden() {
          this.destroy()
        }
      }
    }
  })
}

/**
 * 展示气泡对话框
 * @param {Object} object 参数
 */
export function showPopDialog(object) {
  return show(object, 'showPopDialog', function(done) {
    return {
      extends: PopDialog,
      methods: {
        afterConfirm() {
          done({
            cancel: false,
            confirm: true
          })
        },
        afterCancel(res) {
          res.confirm = false
          done(res)
        },
        afterHidden() {
          this.destroy()
        }
      }
    }
  })
}

/**
 * 展示气泡菜单
 * @param {Object} object 参数
 */
export function showPopMenu(object) {
  return show(object, 'showPopMenu', function(done) {
    return {
      extends: PopMenu,
      methods: {
        afterSelect(detail) {
          done({
            cancel: false,
            selected: true,
            detail
          })
        },
        afterCancel(res) {
          res.selected = false
          done(res)
        },
        afterHidden() {
          this.destroy()
        }
      }
    }
  })
}

/**
 * 展示对话框
 * @param {Object} object 参数
 */
export function showDialog(object) {
  return show(object, 'showDialog', function(done) {
    return {
      extends: Dialog,
      methods: {
        afterConfirm() {
          done({ confirm: true, cancel: false })
        },
        afterCancel(res) {
          done(res)
        },
        afterHidden() {
          this.destroy()
        }
      }
    }
  })
}

/**
 * 展示图片预览
 * @param {Object} object 参数
 */
export function previewImage(object) {
  return show(object, 'previewImage', function(done) {
    return {
      extends: ImagePreview,
      methods: {
        afterCancel(res) {
          done(res)
        },
        afterHidden() {
          this.destroy()
        }
      }
    }
  })
}
