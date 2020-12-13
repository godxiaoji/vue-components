import { defaultZIndex, getNewZIndex } from '../../helpers/popup'
import { cloneData, isFunction } from '../../helpers/util'
import { addClassName, removeClassName, removeEl } from '../../helpers/dom'
import { SDKKey } from '../../config'

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
  computed: {},
  data() {
    return {
      isShow: false,
      visible2: false,
      zIndex: defaultZIndex,
      forbidScroll: true,
      top: 0
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
        addClassName(document.body, SDKKey + '-overflow-hidden')

      if (!this.showMask) {
        this.$el.style.position = 'absolute'
        this.$el.style.top = document.documentElement.scrollTop + 'px'
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
        this.$el.style.position = ''
        this.$el.style.top = ''

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
