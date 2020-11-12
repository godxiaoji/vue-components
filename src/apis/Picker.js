import Vue from 'vue'
import Picker from '../components/Picker'
import { createPopup } from '../helpers/popup'
import { cloneData, isObject } from '../helpers/util'
import { getCallbackFns } from './callback'
import { parseParamsByRules } from './rules'

export function showPicker(object) {
  if (!isObject(object)) {
    object = {}
  }

  const { success, fail, complete } = getCallbackFns(object)

  try {
    const propsData = parseParamsByRules(object, 'showPicker')
    propsData.initialMode = propsData.mode
    delete propsData.mode

    const Comp = Vue.extend({
      extends: Picker,
      methods: {
        onCancelClick() {
          success({ cancel: true, confirm: false })

          this.visible2 = false
        },
        onConfirmClick() {
          this.detail = this.$refs.view.getDetail()

          success(
            Object.assign(
              { cancel: false, confirm: true },
              cloneData(this.detail)
            )
          )

          this.visible2 = false
        },
        onMaskClick() {
          success({ cancel: true, maskClick: true, confirm: false })

          this.visible2 = false
        },
        onHidden() {
          complete()
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
