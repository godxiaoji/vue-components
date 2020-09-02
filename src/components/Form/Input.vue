<template>
  <label
    :class="[
      prefix + '-input',
      sizeClassName,
      alignClassName,
      {
        warn: warn,
        'has--prepend': hasPrepend,
        'has--append': hasAppend,
        'no-border': !border,
        [prefix + '-textarea']: type === 'textarea'
      }
    ]"
    :disabled="disabled"
  >
    <div :class="[prefix + '-input_prepend']" v-if="hasPrepend">
      <slot name="prepend"></slot>
    </div>
    <textarea
      v-if="type === 'textarea'"
      :class="[prefix + '-input_input']"
      :name="name"
      :value="formValue"
      :disabled="disabled"
      :placeholder="placeholder"
      :readonly="readonly"
      :maxlength="maxlength"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
    ></textarea>
    <input
      v-else
      :class="[prefix + '-input_input']"
      :name="name"
      :type="realType"
      :value="formValue"
      :disabled="disabled"
      :placeholder="placeholder"
      :readonly="readonly"
      :maxlength="maxlength"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
    />
    <div :class="[prefix + '-input_append']" v-if="hasAppend">
      <slot name="append"></slot>
    </div>
    <p :class="[prefix + '-input_error']" v-if="warn && errMsg">{{ errMsg }}</p>
  </label>
</template>

<script>
import { inArray, isFunction, isString, isNumber } from '../../helpers/util'
import { CustomEvent } from '../../helpers/events'
import { SDKKey } from '../../config'

const SIZE_NAMES = ['default', 'mini', 'large']
const ALIGN_NAMES = ['left', 'center', 'right']
const TYPE_NAMES = ['text', 'number', 'password', 'search', 'textarea']

export default {
  name: SDKKey + '-input',
  components: {},
  props: {
    name: {
      type: String,
      default: ''
    },
    maxlength: {
      validator(value) {
        return isString(value) || isNumber(value)
      },
      default: 140
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    size: {
      type: String,
      default: SIZE_NAMES[0]
    },
    value: {
      validator(value) {
        return isString(value) || isNumber(value)
      },
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    focus: {
      type: Boolean,
      default: false
    },
    showClear: {
      type: Boolean,
      default: true
    },
    readonly: {
      type: Boolean,
      default: false
    },
    valid: {
      type: Function
    },
    align: {
      type: String,
      value: 'left'
    },
    border: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      prefix: SDKKey,

      formValue: '',
      warn: false,
      errMsg: '',

      hasPrepend: false,
      hasAppend: false
    }
  },
  computed: {
    sizeClassName() {
      return (
        'size--' + (inArray(this.size, SIZE_NAMES) ? this.size : SIZE_NAMES[0])
      )
    },
    alignClassName() {
      return (
        'align--' +
        (inArray(this.align, ALIGN_NAMES) ? this.align : ALIGN_NAMES[0])
      )
    },
    realType() {
      return inArray(this.type, TYPE_NAMES) ? this.type : TYPE_NAMES[0]
    }
  },
  model: {
    prop: 'value',
    event: '_change'
  },
  watch: {
    value() {
      this.updateFormValue()
    },
    focus(value) {
      const inputEl = this.getInputEl()

      if (value) {
        inputEl.focus()
      } else {
        inputEl.blur()
      }
    }
  },
  created() {
    this.updateFormValue()
  },
  ready() {},
  mounted() {
    if (this.$scopedSlots.prepend) {
      this.hasPrepend = true
    }
    if (this.$scopedSlots.append) {
      this.hasAppend = true
    }

    const inputEl = this.getInputEl()

    if (this.focus) {
      inputEl.focus()
    }

    inputEl._app_component = this
  },
  updated() {},
  attached() {},
  methods: {
    updateFormValue() {
      if (this.formValue !== this.value) {
        this.formValue = this.value
      }
    },

    onInput(e) {
      // 输入改变时触发
      const value = e.target.value

      this.formValue = value
      this.$emit('_change', value)

      const type = 'input'

      this.$emit(
        type,
        new CustomEvent(
          {
            type,
            currentTarget: this.$el
          },
          {
            value
          }
        )
      )
    },
    onFocus(e) {
      this._prevValue = this.formValue

      this.$emit(e.type, e)
    },
    onBlur(e) {
      this.$emit(e.type, e)

      if (this.formValue != this._prevValue) {
        // 改变且失焦后触发
        this.onChange(e)
      }
    },
    onChange(e) {
      // 改变且失焦后触发
      const type = 'change'

      this.$emit(
        type,
        new CustomEvent(
          {
            type,
            currentTarget: this.$el,
            target: e.target
          },
          {
            value: this.formValue
          }
        )
      )

      if (isFunction(this.valid)) {
        let ret = this.valid(this.formValue)
        if (ret instanceof Error) {
          this.warn = true
          this.errMsg = ret.message
        } else {
          this.warn = false
          this.errMsg = ''
        }
      }
    },

    getInputEl() {
      return (
        (this.$el && this.$el.querySelector('input')) ||
        this.$el.querySelector('textarea')
      )
    },

    reset() {
      if (this.formValue) {
        // 只有原来有数据才会显示
        const inputEl = this.getInputEl()

        inputEl.value = ''
        this.onInput({
          target: inputEl
        })

        this.onChange({
          target: inputEl
        })
      }
    }
  }
}
</script>

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-input {
  --height: 30px;
  --font-size: 14px;
  --icon-size: 20px;
  --padding-left-right: 12px;
  --color: var(--#{$prefix}-main-color);
  --warn-color: var(--#{$prefix}-warn-color);
  --placeholder-color: var(--#{$prefix}-light-color);

  height: calc(var(--height) + 2px);
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;

  border-radius: 4px;
  border: 1px solid $light-color;
  box-sizing: border-box;
  font-size: var(--font-size);
  background-color: #fff;
  color: $semi-color;

  &_prepend,
  &_append {
    padding: 0 var(--padding-left-right);
    .icon {
      display: block;
      width: var(--icon-size);
      height: var(--icon-size);
      box-sizing: border-box;
      cursor: pointer;
    }
  }

  &.warn {
    --color: $warn-color;
  }

  &.size--mini {
    --height: 22px;
    --font-size: 12px;
    --icon-size: 16px;
    --padding-left-right: 8px;
  }

  &.size--large {
    --height: 38px;
    --font-size: 16px;
    --icon-size: 22px;
  }

  &_input {
    flex: 1;
    display: block;
    overflow: hidden;
    margin: 0;
    outline: none;
    border: none;
    width: 100%;
    height: 100%;
    line-height: var(--height);
    width: 100%;
    border-radius: 4px;
    padding: 0 var(--padding-left-right);
    font-size: var(--font-size);
    cursor: pointer;
    color: $semi-color;
    background: #ffffff;
    box-sizing: border-box;
    box-shadow: none;
    resize: none;

    .#{$prefix}-input.has--prepend & {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    .#{$prefix}-input.has--append & {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    .#{$prefix}-input.align--center & {
      text-align: center;
    }

    .#{$prefix}-input.align--right & {
      text-align: right;
    }

    .#{$prefix}-input.warn & {
      border-color: var(--warn-color);
    }

    &[type='search']::-webkit-search-cancel-button {
      display: none;
    }

    &::-webkit-input-placeholder {
      color: var(--placeholder-color);
    }

    .#{$prefix}-input:hover &,
    &:hover {
      border-color: var(--color);
    }

    &:disabled,
    &:disabled:hover {
      background-color: $whitesmoke-color;
      border-color: $light-color;
      cursor: not-allowed;
    }

    &:focus {
      border-color: var(--color);
      box-shadow: 0 0 3px var(--color);
    }
  }

  &.no-border {
    border: none;
    border-radius: 0;
    .#{$prefix}-input_input {
      border: none;
      border-radius: 0;
      padding: 0;

      &:disabled,
      &:disabled:hover {
        background-color: #ffffff;
        border-color: #ffffff;
        color: $light-color;
      }
      &:focus {
        box-shadow: none;
      }
    }
  }

  &_error {
    position: absolute;
    left: var(--padding-left-right);
    top: 100%;
    font-size: 12px;
    height: 14px;
    line-height: 14px;
    padding: 0 5px;
    margin-top: -8px;
    background-color: #fff;
    color: var(--warn-color);
  }
}
</style>
