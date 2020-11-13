import { defaultZIndex, getNewZIndex } from '../../helpers/popup'
import { isFunction } from '../../helpers/util'
import { addClassName, removeClassName, removeEl } from '../../helpers/dom'
import { SDKKey } from '../../config'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {},
  data() {
    return {
      isShow: false,
      visible2: false,
      zIndex: defaultZIndex,
      forbidScroll: true
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
    if (this.visible) {
      this.show()
    }
  },
  methods: {
    onMaskClick() {
      if (this.isShowing) {
        return
      }

      this.hide()
    },

    noop() {},

    _doShow(callback) {
      if (this.isShowing) {
        return false
      }
      this.isHiding = false
      this.isShowing = true

      clearTimeout(this.visibleTimer)

      this.forbidScroll &&
        addClassName(document.body, SDKKey + '-overflow-hidden')

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
      }
    },
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

        if (isFunction(callback)) {
          callback()
        }
      }, 210)

      if (this.visible) {
        this.$emit('update:visible', false)
      }

      return true
    },
    hide(source = 'active') {
      const isSuccess = this._doHide(() => {
        this.$emit('hidden', { source })
      })

      if (isSuccess) {
        this.$emit('hide', { source })
      }
    },
    close(source = 'active') {
      if (this.isClosing) {
        return
      }
      this.isClosing = true

      const isSuccess = this._doHide(() => {
        this.destroy()
        this.$emit('closed', { source })
      })

      if (isSuccess) {
        this.$emit('close', { source })
      }
    },
    destroy() {
      this.$destroy()

      removeEl(this.$el)
    }
  }
}
