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
      :type="inputType"
      :inputmode="inputMode"
      :disabled="disabled"
      :placeholder="placeholder"
      :readonly="readonly"
      :maxlength="maxlength"
      @input="onInput"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
      @compositionstart="onCompositionStart"
      @compositionend="onCompositionEnd"
    />
    <icon
      v-if="showClear"
      v-show="formValue"
      :class="[prefix + '-input_clear']"
      class-name="CloseCircleFilled"
      @click.native.prevent="onClear"
    ></icon>
    <div :class="[prefix + '-input_append']" v-if="hasAppend">
      <slot name="append"></slot>
    </div>
  </label>
</template>

<script>
import Icon from '../Icon'
import { inArray, isString, isNumber } from '../../helpers/util'
import { SDKKey } from '../../config'
import { CustomEvent } from '../../helpers/events'
import formMixin from '../util/form-mixin'
import { formatInputDigit, formatInputNumber } from '../../helpers/input'

const TYPE_NAMES = [
  'text',
  'number',
  'digit',
  'tel',
  'password',
  'search',
  'textarea'
]

export default {
  name: SDKKey + '-input',
  components: { Icon },
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
      default: null
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
    },
    showClear: {
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
    inputType() {
      if (this.type === 'number') {
        return 'text'
      }

      if (this.type === 'digit') {
        return 'tel'
      }

      return inArray(this.type, TYPE_NAMES) ? this.type : TYPE_NAMES[0]
    },
    inputMode() {
      let mode = ''

      switch (this.type) {
        case 'search':
          mode = 'search'
          break

        case 'digit':
          mode = 'numeric'
          break

        case 'number':
          mode = 'decimal'
          break

        case 'tel':
          mode = 'tel'
          break

        case 'text':
          mode = 'text'
          break

        default:
          break
      }

      return mode
    }
  },
  model: {
    prop: 'value',
    event: '_input'
  },
  watch: {
    value(val) {
      if (val != this.formValue) {
        this.updateValue(val)
      }
    },
    focus(val) {
      const $input = this.getInputEl()

      if (val) {
        $input.focus()
      } else {
        $input.blur()
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

    this.updateValue(this.value == null ? '' : this.value)

    const $input = this.getInputEl()

    $input.defaultValue = $input.value

    if (this.focus) {
      $input.focus()
    }

    $input._app_component = this
  },
  updated() {},
  attached() {},
  methods: {
    onCompositionStart() {
      this.isComposition = true
    },
    onCompositionEnd(e) {
      this.isComposition = false
      this._input(e.target.value)
    },
    updateValue(value) {
      switch (this.type) {
        case 'digit':
          value = formatInputDigit(value)
          break

        case 'number':
          value = formatInputNumber(value)
          break

        default:
          break
      }

      const $input = this.getInputEl()
      let isChange = false

      if ($input.value != value) {
        $input.value = value.toString()
      }

      value = $input.value

      if (value !== this.formValue) {
        this.formValue = value
        isChange = true
      }

      if (value != this.value) {
        this.$emit('_input', this.formValue)
      }

      return { value, isChange }
    },
    /**
     * 输入改变时触发
     */
    onInput(e) {
      if (!this.isComposition) {
        this._input(e.target.value)
      }
    },
    _input(newVal) {
      const { value, isChange } = this.updateValue(newVal)

      if (isChange) {
        const type = 'input'

        this.$emit(
          type,
          new CustomEvent(
            { type, target: this.getInputEl(), currentTarget: this.$el },
            {
              value
            }
          )
        )
      }
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
      this.$emit(
        e.type,
        new CustomEvent(
          { type: e.type, target: e.target, currentTarget: this.$el },
          {
            value: this.formValue
          }
        )
      )

      this.validateAfterEventTrigger(e.type, this.formValue)
    },
    getInputEl() {
      return (
        (this.$el && this.$el.querySelector('input')) ||
        this.$el.querySelector('textarea')
      )
    },
    reset() {
      this._input(this.getInputEl().defaultValue)
    },
    onClear() {
      this._input('')
    }
  }
}
</script>

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-input {
  --height: 48px;
  --font-size: 17px;
  --icon-size: 18px;

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
    -webkit-text-fill-color: $font3-color;
    opacity: 1;
  }

  .#{$prefix}-icon {
    --size: var(--icon-size);
  }

  &_clear {
    --color: #{$font3-color};
    margin: 0 16px 0 0;
  }

  &_prepend,
  &_append {
    padding: 0 0 0 16px;
    color: $font2-color;
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
    background: none;
    box-sizing: border-box;
    box-shadow: none;
    resize: none;

    &:read-only {
      cursor: auto;
    }

    &[type='search']::-webkit-search-cancel-button {
      display: none;
    }

    &::-webkit-input-placeholder {
      color: $font3-color;
    }

    &:disabled,
    &:disabled:hover {
      color: $font3-color;
      -webkit-text-fill-color: $font3-color;
      opacity: 1;
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
