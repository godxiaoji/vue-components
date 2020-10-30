<template>
  <label
    :class="[
      prefix + '-input',
      {
        'has--prepend': hasPrepend,
        'has--append': hasAppend,
        [prefix + '-textarea']: type === 'textarea',
        focus: focus2
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
      :name="formName"
      :disabled="disabled"
      :placeholder="placeholder"
      :readonly="readonly"
      :maxlength="maxlength"
      @input="onInput"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
    ></textarea>
    <input
      v-else
      :class="[prefix + '-input_input']"
      :name="formName"
      :type="realType"
      :disabled="disabled"
      :placeholder="placeholder"
      :readonly="readonly"
      :maxlength="maxlength"
      @input="onInput"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
    />
    <div :class="[prefix + '-input_append']" v-if="hasAppend">
      <slot name="append"></slot>
    </div>
  </label>
</template>

<script>
import { inArray, isString, isNumber } from '../../helpers/util'
import { SDKKey } from '../../config'
import { CustomEvent } from '../../helpers/events'
import formMixin from '../util/form-mixin'

const TYPE_NAMES = ['text', 'number', 'password', 'search', 'textarea']

export default {
  name: SDKKey + '-input',
  components: {},
  mixins: [formMixin],
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
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefix: SDKKey,

      hasPrepend: false,
      hasAppend: false,

      formValue: '',

      focus2: false
    }
  },
  computed: {
    realType() {
      return inArray(this.type, TYPE_NAMES) ? this.type : TYPE_NAMES[0]
    }
  },
  model: {
    prop: 'value',
    event: '_input'
  },
  watch: {
    value() {
      this.updateValue()
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
  created() {},
  ready() {},
  mounted() {
    if (this.$scopedSlots.prepend) {
      this.hasPrepend = true
    }
    if (this.$scopedSlots.append) {
      this.hasAppend = true
    }

    const inputEl = this.getInputEl()

    if (this.value != null) {
      inputEl.defaultValue = this.formValue = this.value.toString()
    }
    if (this.focus) {
      inputEl.focus()
    }

    inputEl._app_component = this
  },
  updated() {},
  attached() {},
  methods: {
    updateValue() {
      this.getInputEl().value = this.formValue = this.value.toString()
    },
    _changing($el, value) {
      this.$emit(
        'changing',
        new CustomEvent(
          {
            type: 'changing',
            target: $el,
            currentTarget: $el
          },
          {
            value
          }
        )
      )
    },
    onInput(e) {
      // 输入改变时触发
      const target = e.target
      const value = target.value

      if (value !== this.formValue) {
        this._changing(target, value)
      }

      this.formValue = value
      this.$emit('_input', value)
      this.$emit(e.type, e)
    },
    onFocus(e) {
      this.focus2 = true
      this.$emit(e.type, e)
    },
    onBlur(e) {
      this.focus2 = false
      this.$emit(e.type, e)

      this.validateAfterEventTrigger(e.type, this.formValue)
    },
    onChange(e) {
      this.$emit(e.type, e)

      this.validateAfterEventTrigger(e.type, this.formValue)
    },
    getInputEl() {
      return (
        (this.$el && this.$el.querySelector('input')) ||
        this.$el.querySelector('textarea')
      )
    },
    reset() {
      const $el = this.getInputEl()
      const defaultValue = $el.defaultValue

      if (defaultValue !== this.formValue) {
        this._changing($el, defaultValue)
      }

      $el.value = $el.defaultValue
      this.formValue = defaultValue
      this.$emit('_input', defaultValue)
    }
  }
}
</script>

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-input {
  --height: 48px;
  --font-size: 17px;
  --icon-size: 20px;

  height: var(--height);
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;

  border: 1px solid $border-color;
  box-sizing: border-box;
  font-size: var(--font-size);
  background-color: #fff;
  color: $title-color;

  &[disabled] {
    background-color: $background2-color;
    color: $font3-color;
    user-select: none;
  }

  &_prepend,
  &_append {
    padding: 0 0 0 16px;
    color: $font2-color;

    .icon {
      display: block;
      width: var(--icon-size);
      height: var(--icon-size);
      box-sizing: border-box;
      cursor: pointer;
    }
  }

  &_append {
    padding: 0 16px 0 0;
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
    line-height: calc(var(--height) - 2px);
    width: 100%;
    padding: 0 16px;
    font-size: var(--font-size);
    cursor: pointer;
    color: $title-color;
    background: #ffffff;
    box-sizing: border-box;
    box-shadow: none;
    resize: none;

    &[type='search']::-webkit-search-cancel-button {
      display: none;
    }

    &::-webkit-input-placeholder {
      color: $font3-color;
    }

    &:disabled,
    &:disabled:hover {
      background-color: $background2-color;
      color: $font3-color;
      cursor: not-allowed;
      user-select: none;
    }

    .#{$prefix}-input.has--prepend & {
      padding-left: 6px;
    }

    .#{$prefix}-input.has--append & {
      padding-right: 6px;
    }
  }

  &.focus {
    border-color: $primary-color;
  }
}
</style>
