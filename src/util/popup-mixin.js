import { getNewZIndex } from '../helpers/popup'
import { popupZIndex } from '../helpers/layer'
import { cloneData, isFunction, isObject } from '../helpers/util'
import {
  addClassName,
  getScrollDom,
  removeClassName,
  removeEl
} from '../helpers/dom'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    showMask: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isShow: false,
      visible2: false,
      forbidScroll: true,

      zIndex: popupZIndex,
      top: null,
      position: null
    }
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        this.show()
      } else {
        this.hide()
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

    afterCancel() {},

    noop() {},

    _doShow(callback) {
      if (this.isShowing) {
        return false
      }
      this.isHiding = false
      this.isShowing = true

      clearTimeout(this.visibleTimer)

      this.forbidScroll &&
        this.showMask &&
        addClassName(document.body, 'fx-overflow-hidden')

      if (!this.showMask) {
        this.position = 'absolute'
        this.top = getScrollDom().scrollTop + 'px'
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
    show() {
      const isSuccess = this._doShow(() => {
        this.emitVisibleState('shown', {})
      })

      if (isSuccess) {
        this.emitVisibleState('show', {})
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
    },
    afterHidden() {}
  }
}
