<template>
  <div class="fx-swipe-cell fx-horizontal-hairline">
    <div
      class="fx-swipe-cell_inner"
      :style="{
        transform: 'translate3d(-' + translateX + 'px, 0px, 0px)',
        transitionDuration: duration + 's'
      }"
    >
      <slot></slot>
      <div class="fx-swipe-cell_buttons" ref="buttons">
        <button
          class="fx-swipe-cell_button"
          :class="['type--' + item.type]"
          v-for="(item, index) in buttons2"
          :key="index"
          :style="{
            transform:
              'translate3d(-' +
              (buttonTranslateXs[index] || 0) +
              'px, 0px, 0px)',
            transitionDuration: duration + 's'
          }"
          @click="onButtonClick(item, index)"
          @mousedown.stop="noop"
          @touchstart.stop="noop"
        >
          {{ item.text }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { getEnumsValue } from '../helpers/validator'
import {
  cloneData,
  isArray,
  isObject,
  isString,
  rangeNumber
} from '../helpers/util'
import { addEvent, removeEvent, touchEvent } from '../helpers/events'

const {
  touchstart,
  touchmove,
  touchend,
  addListeners,
  removeListeners,
  getTouch,
  getStretchOffset
} = touchEvent

export default {
  name: 'fx-swipe-cell',
  components: {},
  props: {
    buttons: {
      validator(val) {
        if (isArray(val)) {
          for (let i = 0; i < val.length; i++) {
            if (!(isObject(val[i]) && isString(val[i].text))) return false
          }
          return true
        } else {
          return false
        }
      },
      default() {
        return []
      }
    }
  },
  data() {
    return {
      translateX: 0,
      duration: 0,

      buttonTranslateXs: []
    }
  },
  computed: {
    buttons2() {
      const buttons = []

      if (isArray(this.buttons)) {
        this.buttons.forEach(v => {
          if (isObject(v) && isString(v.text)) {
            buttons.push(
              Object.assign(cloneData(v), {
                text: v.text,
                type: getEnumsValue('type', v.type)
              })
            )
          }
        })
      }

      return buttons
    }
  },
  mounted() {
    addListeners(this.$el, this)
  },
  beforeDestroy() {
    removeListeners(this.$el, this)
  },
  methods: {
    noop() {},
    /**
     * 事件
     * @param {Event} e
     */
    handleEvent(e) {
      switch (e.type) {
        case touchstart:
          this.onTouchStart(e)
          break
        case touchmove:
          this.onTouchMove(e)
          break
        case touchend:
          this.onTouchEnd(e)
          break
        case 'mouseleave':
          this.onTouchEnd(e)
          break
        default:
          break
      }
    },
    onTouchStart(e) {
      if (this.buttons.length === 0) {
        return
      }

      const { clientX } = getTouch(e)
      const $buttons = this.$refs.buttons

      this.coords = {
        startX: clientX,
        buttonsW: $buttons.clientWidth,
        isShow: this.translateX > 0
      }

      if (this.coords.isShow) {
        e.stopPropagation()
      }
    },

    onTouchMove(e) {
      if (!this.coords) {
        return
      }

      const { clientX } = getTouch(e)
      const { startX, buttonsW, isSwipe, isShow } = this.coords

      let x = startX - clientX

      if (!isShow && !isSwipe && x < 0) {
        delete this.coords
        return
      }
      this.coords.isSwipe = true

      if (isShow) {
        x += buttonsW
      }

      const max = rangeNumber(x, 0, buttonsW)

      this.$refs.buttons.children.forEach(($child, index) => {
        this.buttonTranslateXs[index] =
          ($child.offsetLeft * (buttonsW - max)) / buttonsW
      })

      this.translateX =
        max + (x > buttonsW ? getStretchOffset(x - buttonsW) : 0)
      this.duration = 0

      e.stopPropagation()
    },

    onTouchEnd(e) {
      if (this.coords) {
        const { isSwipe, buttonsW } = this.coords

        if (isSwipe && this.translateX > buttonsW / 2) {
          // 展示
          this.show(buttonsW)
        } else {
          this.hide()
        }

        delete this.coords
        e.stopPropagation()
      }
    },
    show(x) {
      this.translateX = x
      this.duration = 0.6
      this.buttonTranslateXs = this.buttonTranslateXs.map(() => {
        return 0
      })

      addEvent(touchstart, this.hide, document)
    },
    hide() {
      this.translateX = 0
      this.duration = 0.6
      this.buttonTranslateXs = this.buttonTranslateXs.map(() => {
        return 0
      })

      removeEvent(touchstart, this.hide, document)
    },
    onButtonClick(item, index) {
      this.$emit('button-click', {
        item: cloneData(item),
        index
      })
      this.hide()
    }
  }
}
</script>
