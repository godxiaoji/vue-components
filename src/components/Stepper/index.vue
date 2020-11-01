<template>
  <div :class="[prefix + '-stepper']">
    <fx-button
      icon="MinusOutlined"
      shape="square"
      size="small"
      :disabled="disabled || disabledMinus || formValue <= min"
      @click="doStep($event, false)"
    />
    <input
      :class="[prefix + '-stepper_input']"
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
import { CustomEvent } from '../../helpers/events'
import { SDKKey } from '../../config'
import formMixin from '../util/form-mixin'
import {
  rangeInteger,
  rangeNumber,
  isString,
  isNumber
} from '../../helpers/util'
import { formatInputNumber } from '../../helpers/input'

export default {
  name: SDKKey + '-stepper',
  mixins: [formMixin],
  components: { FxButton },
  props: {
    value: {
      validator(value) {
        return isString(value) || isNumber(value)
      },
      default: ''
    },
    color: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    // 是否禁用步进器
    disabled: {
      type: Boolean,
      default: false
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
  model: {
    prop: 'value',
    event: '_change'
  },
  data() {
    return {
      prefix: SDKKey,

      defaultValue: '1',
      formValue: '1'
    }
  },
  computed: {},
  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (val != parseFloat(this.formValue)) {
          this.updateValue(val)
        }
      }
    }
  },
  created() {
    this.defaultValue = this.formValue
  },
  ready() {},
  mounted() {
    const $input = this.getInputEl()

    $input._app_component = this
    $input._app_type = 'stepper'
    $input.value = this.formValue
    $input.defaultValue = this.formValue
  },
  updated() {},
  attached() {},
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

      this.$emit(
        type,
        new CustomEvent({ type, target: e.target, currentTarget: this.$el }, {})
      )
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

    updateValue(value) {
      value = this.getRangeNumber(value)

      if (value !== this.formValue) {
        this.formValue = value
        this._change(value)
      }

      const $input = this.getInputEl()

      if ($input && $input.value != parseFloat(value)) {
        $input.value = value
      }

      if (value !== this.value) {
        this.$emit('_change', value)
      }

      return value
    },
    getInputEl() {
      return this.$el && this.$el.querySelector('input')
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

      this.$emit(
        e.type,
        new CustomEvent(
          { type: e.type, target: e.target, currentTarget: this.$el },
          {
            value
          }
        )
      )
    },
    reset() {
      this.updateValue(this.defaultValue)
    },
    _change(value) {
      const type = 'change'

      this.$emit(
        type,
        new CustomEvent(
          { type, target: this.getInputEl(), currentTarget: this.$el },
          {
            value
          }
        )
      )

      this.validateAfterEventTrigger(type, value)
    }
  }
}
</script>

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-stepper {
  flex: 1 0 0%;
  display: flex;
  height: 32px;
  align-items: center;
  justify-content: flex-end;

  &_button {
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    width: 28px;
    height: 28px;
    border: 1px solid $border-color;
    border-radius: 2px;
    background-color: #fff;
    padding: 0;
    outline: 0;
    cursor: pointer;

    .#{$prefix}-icon {
      --size: 20px;
      --color: #{$font-color};
    }

    &:not(:disabled):active {
      background-color: $background-color;
    }

    &:disabled {
      cursor: not-allowed;

      .#{$prefix}-icon {
        --color: #{$font3-color};
      }
    }
  }

  &_input {
    height: 28px;
    width: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border: none;
    margin: 0 4px;
    padding: 0;
    box-sizing: border-box;
    background: none;
    color: $title-color;
    outline: 0;
    font-size: 17px;

    &:disabled {
      color: $font3-color;
      -webkit-text-fill-color: $font3-color;
      opacity: 1;
      cursor: not-allowed;
    }

    &:read-only {
      cursor: default;
    }
  }
}
</style>
