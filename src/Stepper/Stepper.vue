<template>
  <div class="fx-stepper" :class="{ disabled: !!disabled }">
    <fx-button
      icon="MinusOutlined"
      shape="square"
      size="small"
      :disabled="disabled || disabledMinus || formValue <= min"
      @click="doStep($event, false)"
    />
    <input
      class="fx-stepper_input"
      :type="allowDecimal ? 'text' : 'tel'"
      :inputmode="allowDecimal ? 'decimal' : 'numeric'"
      :name="formName"
      :disabled="disabled"
      :readonly="disabledInput"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
      @change="onChange"
    />
    <fx-button
      icon="PlusOutlined"
      shape="square"
      size="small"
      :disabled="disabled || disabledPlus || formValue >= max"
      @click="doStep($event, true)"
    />
  </div>
</template>

<script>
import FxButton from '../Button'
import formMixin from '../util/form-mixin'
import { isStringNumberMix, rangeInteger, rangeNumber } from '../helpers/util'
import { formatInputNumber } from '../helpers/input'

export default {
  name: 'fx-stepper',
  mixins: [formMixin],
  components: { FxButton },
  props: {
    modelValue: {
      validator: isStringNumberMix,
      default: null
    },
    color: {
      type: String,
      default: ''
    },
    // 是否禁用减少按钮
    disabledMinus: {
      type: Boolean,
      default: false
    },
    // 是否禁用增加按钮
    disabledPlus: {
      type: Boolean,
      default: false
    },
    // 是否禁用输入框
    disabledInput: {
      type: Boolean,
      default: false
    },
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: Infinity
    },
    allowDecimal: {
      type: Boolean,
      default: true
    },
    step: {
      type: Number,
      default: 1
    },
    decimalLength: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      defaultValue: '1',
      formValue: '1'
    }
  },
  watch: {
    modelValue: {
      immediate: true,
      handler(val) {
        if (parseFloat(val) !== parseFloat(this.formValue)) {
          this.updateValue(val, false)
        }
      }
    }
  },
  created() {
    this.defaultValue = this.formValue
  },
  mounted() {
    const $input = this.getInputEl()

    $input._app_component = this
    $input._app_type = 'stepper'
    $input.value = this.formValue
    $input.defaultValue = this.formValue
  },
  emits: ['plus-click', 'minus-click', 'input', 'focus', 'blur'],
  methods: {
    doStep(e, isPlus = true) {
      const step = parseFloat(this.step)
      let type = 'plus-click'

      if (isPlus) {
        this.updateValue(parseFloat(this.formValue) + step)
      } else {
        this.updateValue(parseFloat(this.formValue) - step)
        type = 'minus-click'
      }

      this.$emit(type, {})
    },
    getRangeNumber(value) {
      value = this.formateNumber(value)

      if (value === '') {
        value = this.min
      }

      if (this.allowDecimal) {
        value = rangeNumber(value, this.min, this.max)

        if (this.decimalLength > 0) {
          value = value.toFixed(this.decimalLength)
        }
      } else {
        value = rangeInteger(Math.floor(value), this.min, this.max)
      }

      return value.toString()
    },

    updateValue(value, eventChange = true) {
      value = this.getRangeNumber(value)

      if (value !== this.formValue) {
        this.formValue = value
        if (eventChange) {
          this.afterChange(value)
        }
      }

      const $input = this.getInputEl()
      if ($input) {
        $input.value = value
      }

      if (value !== this.modelValue) {
        this.$emit('update:modelValue', value)
      }

      return value
    },
    onFocus(e) {
      this.$emit(e.type, e)
    },
    onBlur(e) {
      this.$emit(e.type, e)
    },
    onChange(e) {
      this.updateValue(e.target.value)
    },
    formateNumber(value) {
      return formatInputNumber(
        value,
        !this.allowDecimal ? 0 : this.decimalLength
      )
    },
    onInput(e) {
      const value = this.formateNumber(e.target.value)

      e.target.value = value

      this.$emit(e.type, {
        value
      })
    },
    reset() {
      return this._reset(this.getInputEl().value)
    },
    afterChange(value) {
      const type = 'change'

      this.$emit(type, {
        value
      })

      this.validateAfterEventTrigger(type, value)
    }
  }
}
</script>
