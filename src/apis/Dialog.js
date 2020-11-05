import Vue from 'vue'
import Dialog from '../components/Dialog'
import { createPopup } from '../helpers/popup'
import { htmlEscape, isObject } from '../helpers/util'
import { getCallbackFns } from './callback'
import { parseParamsByRules } from './rules'

export function showDialog(object) {
  if (!isObject(object)) {
    object = {}
  }

  const { success, fail, complete } = getCallbackFns(object)

  try {
    const propsData = parseParamsByRules(object, 'showDialog')
    propsData.content = htmlEscape(propsData.content)

    const Comp = Vue.extend({
      extends: Dialog,
      methods: {
        onCancelClick() {
          this.visible2 = false

          success({ confirm: false, cancel: true })
          complete()
        },
        onConfirmClick() {
          this.visible2 = false

          success({ confirm: true, cancel: false })
          complete()
        },
        onMaskClick() {
          success({ confirm: false, cancel: true, maskClick: true })
          complete()
        },
        onHidden() {
          this.destroy()
        }
      }
    })

    const { $wrapper } = createPopup()

    const app = new Comp({
      propsData: Object.assign(propsData, {
        visible: true
      })
    }).$mount($wrapper)

    return app
  } catch (e) {
    fail(e)
    complete()
  }
}
