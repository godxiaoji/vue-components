import Vue from 'vue'
import Dialog from '../components/Dialog'
import { createPopup } from '../helpers/popup'
import { htmlEscape, isObject } from '../helpers/util'
import { getCallbackFns } from './callback'
import { parseParamsByRules } from './rules'
import { removeEl } from '../helpers/dom'

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
        onCancelClick(e) {
          const res = {
            confirm: false,
            cancel: true
          }

          success(res)
          complete()

          this.close(e)
        },
        onConfirmClick(e) {
          const res = {
            confirm: true,
            cancel: false
          }

          success(res)
          complete()

          this.close(e)
        },
        close() {
          this.visible = false
          const $el = this.$el

          setTimeout(() => {
            this.$destroy()

            removeEl($el)
          }, 200)
        }
      }
    })

    const { $wrapper, zIndex } = createPopup()

    const app = new Comp({
      propsData: Object.assign(propsData, {
        zIndex,
        visible: true
      })
    }).$mount($wrapper)

    return app
  } catch (e) {
    fail(e)
    complete()
  }
}
