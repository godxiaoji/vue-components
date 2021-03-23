<template>
  <div
    class="fx-popover fx-popup"
    :class="{ visible: visible2, 'no--mask': !showMask }"
    :style="popupStyles"
    v-show="isShow"
  >
    <div class="fx-mask" @click="onMaskClick"></div>
    <div class="fx-popover_inner" ref="inner" :style="innerStyles">
      <i class="fx-popover_arrow" :style="arrowStyles"></i>
      <div class="fx-popover_content">
        <slot>
          <div class="fx-popover_text">{{ content }}</div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import { cloneData } from '../helpers/util'
import popupMixin from '../util/popup-mixin'
import {
  selectorValidator,
  createEnumsValidator,
  getEnumsValue
} from '../helpers/validator'
import { getElement } from '../helpers/dom'

const DEFAULT_POS = { t: null, l: null, at: null, al: null, show: false }

export default {
  name: 'fx-popover',
  mixins: [popupMixin],
  props: {
    selector: {
      validator: selectorValidator,
      required: true
    },
    content: {
      type: String,
      default: ''
    },
    placement: {
      validator: createEnumsValidator('placement')
    },
    showMask: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      pos: cloneData(DEFAULT_POS),

      padding: 8
    }
  },
  computed: {
    arrowStyles() {
      const pos = this.pos

      if (!pos.show) {
        return { left: '200vw', top: '200vh' }
      }

      const styles = {}

      if (pos.al != null) {
        styles.left = pos.al + 'px'
      }
      if (pos.at != null) {
        styles.top = pos.at + 'px'
      }
      if (pos.ar != null) {
        styles.right = pos.ar + 'px'
      }
      if (pos.ab != null) {
        styles.bottom = pos.ab + 'px'
      }

      return styles
    },
    innerStyles() {
      const pos = this.pos
      const { clientWidth: dw, clientHeight: dh } = document.documentElement

      if (!pos.show) {
        return {
          left: 0,
          top: 0,
          maxWidth: dw - this.padding * 2 + 'px',
          maxHeight: dh - this.padding * 2 + 'px'
        }
      }

      const styles = { maxWidth: pos.mw + 'px', maxHeight: pos.mh + 'px' }

      if (pos.l != null) {
        styles.left = pos.l + 'px'
      }
      if (pos.t != null) {
        styles.top = pos.t + 'px'
      }
      if (pos.r != null) {
        styles.right = pos.r + 'px'
      }
      if (pos.b != null) {
        styles.bottom = pos.b + 'px'
      }

      return styles
    }
  },

  watch: {
    showMask: {
      immediate: true,
      handler(val) {
        this.forbidScroll = !!val
        this.useBlur = !val
      }
    }
  },

  methods: {
    afterShow() {
      this.$nextTick(() => {
        this.updatePos()
      })
    },
    updatePos() {
      const $target = getElement(this.selector)

      if (!$target) {
        return
      }

      const padding = 8
      const placement = getEnumsValue('placement', this.placement)

      const rect = $target.getBoundingClientRect()
      const { clientWidth: iw, clientHeight: ih } = this.$refs.inner
      const { clientWidth: dw, clientHeight: dh } = document.documentElement

      const pos = { mw: dw - 16, mh: dh - 16, show: true }

      if (placement === 'top' || placement === 'bottom') {
        pos.al = rect.left + rect.width / 2 - 5
        pos.l = rect.left + rect.width / 2 - iw / 2

        if (pos.l < padding) {
          pos.l = padding
        } else if (pos.l + iw > dw - padding) {
          pos.l -= pos.l + iw - (dw - padding)
        }
        pos.al = pos.al - pos.l

        if (placement === 'bottom') {
          pos.at = -4
          pos.t = rect.bottom + 7
        } else {
          pos.ab = -4
          pos.b = dh - rect.top + 7
        }
      } else {
        pos.at = rect.top + rect.height / 2 - 5
        pos.t = rect.top + rect.height / 2 - ih / 2

        if (pos.t < padding) {
          pos.t = padding
        } else if (pos.t + ih > dh - padding) {
          pos.t -= pos.t + ih - (dh - padding)
        }
        pos.at = pos.at - pos.t

        if (placement === 'right') {
          pos.al = -4
          pos.l = rect.right + 7
        } else {
          pos.ar = -4
          pos.r = dw - rect.left + 7
        }
      }

      this.pos = pos
    },
    afterHidden() {
      this.pos = cloneData(DEFAULT_POS)
    }
  }
}
</script>
