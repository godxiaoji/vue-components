<template>
  <div :class="[prefix + '-rate', { disabled, readonly }]">
    <input
      :name="formName"
      type="hidden"
      :value="formValue"
      :disabled="disabled"
    />
    <div
      :class="[
        prefix + '-rate_item',
        { active: num - 0.5 <= formValue, half: formValue - num === -0.5 }
      ]"
      v-for="num in max"
      :key="num"
      :data-value="num"
    >
      <i :class="[prefix + '-rate_icon']">
        <icon :icon="defaultIcon" />
      </i>
      <i :class="[prefix + '-rate_active-icon']">
        <icon :icon="activeIcon" :style="iconStyles" />
      </i>
    </div>
  </div>
</template>

<script>
import Icon from '../Icon'
import { inArray, capitalize, isInteger, isNumeric } from '../helpers/util'
import { SDKKey } from '../config'
import formMixin from '../util/form-mixin'
import { touchEvent } from '../helpers/events'
import { rangeInteger } from '../helpers/util'

const {
  touchstart,
  touchmove,
  touchend,
  addListeners,
  removeListeners,
  getTouch
} = touchEvent

const ALLOW_ICONS = ['star', 'heart']

function isIntegerOrHalf(val) {
  if (isNumeric(val)) {
    if (isInteger(val) || (parseFloat(val) * 10) % 5 === 0) {
      return true
    }
  }
  return false
}

export default {
  name: SDKKey + '-rate',
  mixins: [formMixin],
  components: { Icon },
  props: {
    pattern: {
      validator(val) {
        return inArray(val, ALLOW_ICONS)
      },
      default: ALLOW_ICONS[0]
    },
    modelValue: {
      validator(val) {
        return isIntegerOrHalf(val)
      },
      default: null
    },
    count: {
      validator(val) {
        return isInteger(parseFloat(val)) && parseFloat(val) > 0
      },
      default: 5
    },
    allowHalf: {
      type: Boolean,
      default: false
    },
    activeColor: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefix: SDKKey,

      formValue: 0,
      defaultValue: 0
    }
  },
  computed: {
    defaultIcon() {
      const icon = inArray(this.pattern, ALLOW_ICONS)
        ? this.pattern
        : ALLOW_ICONS[0]

      return capitalize(icon) + 'Outlined'
    },
    activeIcon() {
      const icon = inArray(this.pattern, ALLOW_ICONS)
        ? this.pattern
        : ALLOW_ICONS[0]

      return capitalize(icon) + 'Filled'
    },
    iconStyles() {
      const styles = {}

      if (this.activeColor && !this.disabled) {
        styles.fill = this.activeColor
      }

      return styles
    },
    max() {
      const count = parseFloat(this.count)
      return isInteger(count) && count > 0 ? count : 5
    }
  },
  watch: {
    modelValue() {
      this.updateValue()
    },
    max(val) {
      if (val < this.defaultValue) {
        this.defaultValue = 0
      }
    }
  },
  created() {
    this.updateValue()

    this.defaultValue = this.formValue
  },
  mounted() {
    const inputEl = this.getInputEl()

    inputEl._app_component = this
    inputEl._app_type = 'rate'

    addListeners(this.$el, this)
  },
  beforeDestroy() {
    removeListeners(this.$el, this)
  },
  methods: {
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
      const { clientX } = getTouch(e)

      let $target = e.target
      while ($target.tagName !== 'DIV') {
        $target = $target.parentNode
      }
      const value = parseInt($target.dataset.value)
      const rects = $target.getClientRects()[0]

      this.coords = {
        size: rects.height,
        offsetX: clientX - rects.left,
        startX: clientX,
        current: value
      }
      this.coords.isHalf = this.coords.offsetX < this.coords.size / 2

      clearTimeout(this.changeTimer)
      this._change(value, this.coords.isHalf)

      e.preventDefault()
    },

    onTouchMove(e) {
      if (!this.coords) {
        return
      }

      const { clientX } = getTouch(e)
      const { startX, size, offsetX, current } = this.coords

      const x = clientX - startX

      let offsetCount = 0

      if (x > 0) {
        offsetCount = Math.floor(x / size) + (x % size > size - offsetX ? 1 : 0)
      } else if (x < 0) {
        offsetCount = -Math.floor(-x / size) + (-x % size > offsetX ? -1 : 0)
      }

      const isHalf = (offsetX + x) % size < size / 2

      clearTimeout(this.changeTimer)
      this.coords.isChange = true

      this._change(rangeInteger(current + offsetCount, 1, this.max), isHalf)

      e.stopPropagation()
    },

    onTouchEnd(e) {
      if (this.coords) {
        delete this.coords
        e.stopPropagation()
      }
    },

    onHalfClick(num) {
      if (this.readonly || this.disabled) {
        return
      }

      if (this.allowHalf) {
        num -= 0.5
      }

      this._change(num)
    },

    onItemClick(num) {
      if (this.readonly || this.disabled) {
        return
      }

      this._change(num)
    },

    _change(value, isHalf = false) {
      if (this.allowHalf && isHalf) {
        value -= 0.5
      }

      if (value !== this.formValue) {
        this.formValue = value

        this.$emit('update:modelValue', value)

        this.eventEmit('change')
      }
    },

    eventEmit(type) {
      const value = this.formValue

      this.$emit(type, {
        value
      })
      this.validateAfterEventTrigger(type, value)
    },

    updateValue() {
      if (!isIntegerOrHalf(this.modelValue)) {
        return
      }

      const value = parseFloat(this.modelValue)

      if (value === this.formValue) {
        return
      }

      if (value < 0 || value > this.max) {
        return
      }

      if (!this.allowHalf && !isInteger(value)) {
        return
      }

      this.formValue = value
    },

    reset() {
      return this._reset(this.defaultValue)
    }
  }
}
</script>
