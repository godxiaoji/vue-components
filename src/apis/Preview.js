import Vue from 'vue'
import ImagePreview from '../components/ImagePreview'
import { createPopup } from '../helpers/popup'
import { isObject } from '../helpers/util'
import { getCallbackFns } from './callback'
import { parseParamsByRules } from './rules'

let $ref

export function previewImage(object) {
  if (!isObject(object)) {
    object = {}
  }

  const { success, fail, complete } = getCallbackFns(object)

  try {
    const propsData = parseParamsByRules(object, 'previewImage')

    if ($ref) {
      $ref.activeIndex = 0
      for (const k in propsData) {
        $ref[k] = propsData[k]
      }
      $ref.show()
    } else {
      const Comp = Vue.extend({
        extends: ImagePreview,
        methods: {}
      })

      const { $wrapper } = createPopup()

      $ref = new Comp({
        propsData: Object.assign(propsData, {
          visible: true
        })
      }).$mount($wrapper)
    }

    success({})

    return $ref
  } catch (e) {
    fail(e)
  }

  complete()
}
