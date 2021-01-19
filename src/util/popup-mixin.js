import { defaultZIndex, getNewZIndex } from '../helpers/popup'
import { cloneData, isFunction } from '../helpers/util'
import { addClassName, getScrollDom, removeClassName } from '../helpers/dom'
import { SDKKey } from '../config'

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

      zIndex: defaultZIndex,
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
  emits: ['cancel', 'show', 'shown', 'hide', 'hidden', 'update:visible'],
  mounted() {
    if (this.visible) {
      this.show()
    }
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
        addClassName(document.body, SDKKey + '-overflow-hidden')

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
        this.$emit('shown', {})
      })

      if (isSuccess) {
        this.$emit('show', {})
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
      removeClassName(document.body, SDKKey + '-overflow-hidden')
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
    hide(res, beforeHideFn) {
      const isSuccess = this._doHide(() => {
        this.$emit('hidden', res)
        this.afterHidden()
      })

      if (isSuccess) {
        if (beforeHideFn) beforeHideFn(cloneData(res))
        this.$emit('hide', res)
      }
    },
    afterHidden() {}
  }
}
