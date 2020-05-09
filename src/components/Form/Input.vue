<template>
  <label
    class="ly-input"
    :class="[
      sizeClassName,
      alignClassName,
      {
        warn: warn,
        'has--prepend': hasPrepend,
        'has--append': hasAppend,
        'no-border': !border,
        'ly-textarea': type === 'textarea'
      }
    ]"
    :disabled="disabled"
  >
    <div class="ly-input_prepend" v-if="hasPrepend">
      <slot name="prepend"></slot>
    </div>
    <textarea
      v-if="type === 'textarea'"
      class="ly-input_input"
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
      class="ly-input_input"
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
    <div class="ly-input_append" v-if="hasAppend">
      <slot name="append"></slot>
    </div>
    <p class="ly-input_error" v-if="warn && errMsg">{{ errMsg }}</p>
  </label>
</template>

<script>
import { inArray, isFunction, isString, isNumber } from '../../helpers/util'
import { getHandleEvent } from '../../helpers/events'

const SIZE_NAMES = ['default', 'mini', 'large']
const ALIGN_NAMES = ['left', 'center', 'right']
const TYPE_NAMES = ['text', 'number', 'password', 'search', 'textarea']

export default {
  name: 'ly-input',
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
        getHandleEvent(
          this.$el,
          e,
          {
            value
          },
          type
        )
      )
    },
    onFocus(e) {
      this._prevValue = this.formValue

      this.$emit(e.type, getHandleEvent(this.$el, e))
    },
    onBlur(e) {
      this.$emit(e.type, getHandleEvent(this.$el, e))

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
        getHandleEvent(
          this.$el,
          e,
          {
            value: this.formValue
          },
          type
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

<style>
@import url('../../global.css');

.ly-input {
  --height: 30px;
  --font-size: 14px;
  --icon-size: 20px;
  --padding-left-right: 12px;
  --color: var(--ly-main-color);
  --warn-color: var(--ly-warn-color);
  --placeholder-color: var(--ly-light-color);
  

  height: calc(var(--height) + 2px);
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;

  border-radius: 4px;
  border: 1px solid var(--ly-light-color);
  box-sizing: border-box;
  font-size: var(--font-size);
  background-color: #fff;
  color: var(--ly-semi-color);
}

.ly-input.no-border {
  border: none;
  border-radius: 0;
}

.ly-input_prepend,
.ly-input_append {
  padding: 0 var(--padding-left-right);
}

.ly-input_prepend .icon,
.ly-input_append .icon {
  display: block;
  width: var(--icon-size);
  height: var(--icon-size);
  box-sizing: border-box;
  cursor: pointer;
}

.ly-input.warn {
  --color: var(--ly-warn-color);
}

.ly-input.size--mini {
  --height: 22px;
  --font-size: 12px;
  --icon-size: 16px;
  --padding-left-right: 8px;
}

.ly-input.size--large {
  --height: 38px;
  --font-size: 16px;
  --icon-size: 22px;
}

.ly-input_input {
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
  color: var(--ly-semi-color);
  background: #ffffff;
  box-sizing: border-box;
  box-shadow: none;
}

.ly-textarea .ly-input_input {
  resize: none;
}

.ly-input.no-border .ly-input_input {
  border: none;
  border-radius: 0;
  padding: 0;
}

.ly-input.has--prepend .ly-input_input {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.ly-input.has--append .ly-input_input {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.ly-input.align--center .ly-input_input {
  text-align: center;
}

.ly-input.align--right .ly-input_input {
  text-align: right;
}

.ly-input_input[type='search']::-webkit-search-cancel-button {
  display: none;
}

.ly-input.warn .ly-input_input {
  border-color: var(--warn-color);
}

.ly-input_input::-webkit-input-placeholder {
  color: var(--placeholder-color);
}

.ly-input:hover .ly-input_input,
.ly-input_input:hover {
  border-color: var(--color);
}

.ly-input_input:disabled,
.ly-input_input:disabled:hover {
  background-color: var(--ly-whitesmoke-color);
  border-color: var(--ly-light-color);
  cursor: not-allowed;
}

.ly-input_input:focus {
  border-color: var(--color);
  box-shadow: 0 0 3px var(--color);
}

.ly-input.no-border .ly-input_input:focus {
  box-shadow: none;
}

.ly-input_error {
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
</style>
