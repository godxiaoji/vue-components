import { getNewZIndex } from '../helpers/popup'
import { popupZIndex } from '../helpers/layer'
import { cloneData, isFunction, isObject } from '../helpers/util'
import {
  addClassName,
  getScrollDom,
  removeClassName,
  removeEl
} from '../helpers/dom'
import { addBlurEvent } from '../helpers/events'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    maskClosable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isShow: false,
      visible2: false,
      forbidScroll: true,
      useBlur: false,

      zIndex: popupZIndex,
      top: null,
      position: null
    }
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        this.show({
          visible: true
        })
      } else {
        this.hide({
          visible: false
        })
      }
    }
  },
  computed: {
    popupStyles() {
      const styles = {
        zIndex: this.zIndex,
        top: this.top,
        position: this.position
      }

      return styles
    }
  },
  mounted() {
    document.body.append(this.$el)

    if (this.visible) {
      this.show()
    }
  },
  beforeDestroy() {
    if (this.removeBlurEvent) {
      this.removeBlurEvent()
      delete this.removeBlurEvent
    }
  },
  destroyed() {
    removeEl(this.$el)
  },
  methods: {
    onMaskClick() {
      if (!this.maskClosable) {
        return
      }
      this.customCancel('maskClick')
    },

    onCloseClick() {
      this.customCancel('closeClick')
    },

    onCancelClick() {
      this.customCancel('cancelClick')
    },

    customCancel(key, focus = false) {
      if (this.isShowing && !focus) {
        return
      }

      this.$emit('cancel', { [key]: true })
      this.hide({ cancel: true, [key]: true }, this.afterCancel)
    },

    customConfirm(res, key) {
      this.$emit('confirm', res)

      const afterRes = { confirm: true, detail: res }
      key && (afterRes[key] = true)

      this.hide(afterRes, this.afterConfirm)
    },

    onBlur() {
      this.customCancel('blur')
    },

    afterCancel() {},
    afterConfirm() {},

    noop() {},

    _doShow(callback) {
      if (this.isShowing) {
        return false
      }
      this.isHiding = false
      this.isShowing = true

      clearTimeout(this.visibleTimer)

      // 如果禁止滚动
      if (this.forbidScroll) {
        addClassName(document.body, 'fx-overflow-hidden')
      } else {
        this.position = 'absolute'
        this.top = getScrollDom().scrollTop + 'px'
      }
      if (this.useBlur) {
        this.removeBlurEvent = addBlurEvent(this.onBlur)
      }

      this.zIndex = getNewZIndex()
      this.isShow = true

      this.visibleTimer = setTimeout(() => {
        this.visible2 = true

        this.visibleTimer = setTimeout(() => {
          this.isShowing = false
          if (isFunction(callback)) {
            callback()
          }
        }, 210)
      }, 17)

      if (!this.visible) {
        this.$emit('update:visible', true)
      }

      return true
    },
    show(res = {}) {
      const isSuccess = this._doShow(() => {
        this.emitVisibleState('shown', res)
      })

      if (isSuccess) {
        this.emitVisibleState('show', res)
        this.afterShow()
      }
    },
    afterShow() {},
    _doHide(callback) {
      if (this.isHiding) {
        return false
      }
      this.isHiding = true
      this.isShowing = false
      removeClassName(document.body, 'fx-overflow-hidden')
      this.visible2 = false

      clearTimeout(this.visibleTimer)
      this.visibleTimer = setTimeout(() => {
        this.isShow = false
        this.isHiding = false

        this.position = null
        this.top = null

        if (isFunction(callback)) {
          callback()
        }
      }, 210)

      if (this.visible) {
        this.$emit('update:visible', false)
      }

      return true
    },
    emitVisibleState(state, res) {
      this.$emit(
        'visible-state-change',
        Object.assign(
          {
            type: 'visible-state-change',
            state
          },
          res
        )
      )
    },
    hide(res, beforeHideFn) {
      if (!isObject(res)) {
        res = {}
      }

      const isSuccess = this._doHide(() => {
        this.emitVisibleState('hidden', res)
        this.afterHidden()
      })

      if (isSuccess) {
        if (beforeHideFn) beforeHideFn(cloneData(res))
        this.emitVisibleState('hide', res)
      }

      if (this.removeBlurEvent) {
        this.removeBlurEvent()
        delete this.removeBlurEvent
      }
    },
    afterHidden() {}
  }
}
