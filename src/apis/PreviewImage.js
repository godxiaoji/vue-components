import Vue from 'vue'
import PreviewImage from '../components/PreviewImage'
import { createPopup, getNewZIndex } from '../helpers/popup'
import { isObject } from '../helpers/util'
import { getCallbackFns } from './callback'
import { parseParamsByRules } from './rules'
// import { removeEl } from '../helpers/dom'

let app

export function previewImage(object) {
  if (!isObject(object)) {
    object = {}
  }

  const { success, fail, complete } = getCallbackFns(object)

  try {
    const propsData = parseParamsByRules(object, 'previewImage')

    if (app) {
      app.activeIndex = 0
      for (const k in propsData) {
        app[k] = propsData[k]
      }
      app.zIndex = getNewZIndex()
      app.visible = true
    } else {
      const Comp = Vue.extend({
        extends: PreviewImage,
        methods: {
          close() {
            if (this.isClosing) {
              return
            }
            this.isClosing = true

            this.visible2 = false
            setTimeout(() => {
              this.isClosing = false
              this.visible = false
            }, 500)
            // const $el = this.$el

            // setTimeout(() => {
            //   this.$destroy()

            //   removeEl($el)
            // }, 200)
          }
        },
        destroyed() {
          app = null
        }
      })

      const { $wrapper, zIndex } = createPopup()

      app = new Comp({
        propsData: Object.assign(propsData, {
          zIndex,
          visible: true
        })
      }).$mount($wrapper)
    }

    success({})
  } catch (e) {
    fail(e)
  }

  complete()
}
