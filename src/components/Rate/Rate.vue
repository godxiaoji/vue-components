<template>
  <div :class="[prefix + '-rate', { disabled, readonly }]">
    <input :name="formName" type="hidden" :value="formValue" :disabled="disabled" />
    <div
      :class="[prefix + '-rate_item', { active: num - 0.5 <= formValue, half: formValue - num === -0.5 }]"
      v-for="num in max"
      :key="num"
      @click="onItemClick(num)"
    >
      <div :class="[prefix + '-rate_icon']">
        <icon :class-name="defaultIcon" />
      </div>
      <div :class="[prefix + '-rate_active-icon']">
        <icon :class-name="activeIcon" :style="iconStyles" />
      </div>
      <i :class="[prefix + '-rate_half']" @click.stop="onHalfClick(num)"></i>
    </div>
  </div>
</template>

<script>
import Icon from '../Icon'
import { inArray, capitalize, isInteger, isNumeric } from '../../helpers/util'
import { SDKKey } from '../../config'
import formMixin from '../util/form-mixin'

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
    name: {
      type: String,
      default: ''
    },
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
      const icon = inArray(this.pattern, ALLOW_ICONS) ? this.pattern : ALLOW_ICONS[0]

      return capitalize(icon) + 'Outlined'
    },
    activeIcon() {
      const icon = inArray(this.pattern, ALLOW_ICONS) ? this.pattern : ALLOW_ICONS[0]

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
  },
  methods: {
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

    getInputEl() {
      return this.$el.firstElementChild
    },

    _change(value) {
      if (value !== this.formValue) {
        this.formValue = value

        this.$emit('_change', value)

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
