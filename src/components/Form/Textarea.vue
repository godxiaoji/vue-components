<template>
  <div class="textarea" :class="[sizeClassName]" :disabled="disabled">
    <textarea
      class="input-text"
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
  </div>
</template>

<script>
import {
  inArray,
  getRandomNumber,
  isString,
  isNumber
} from '../../helpers/util'
import { getHandleEvent } from '../../helpers/events'

const SIZE_NAMES = ['default', 'mini', 'large']

export default {
  name: 'ly-textarea',
  props: {
    name: {
      type: String,
      default() {
        return 'textarea-' + getRandomNumber()
      }
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
    size: {
      type: String,
      default: SIZE_NAMES[0]
    },
    value: {
      type: String,
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
      formValue: ''
    }
  },
  computed: {
    sizeClassName() {
      return (
        'size--' + (inArray(this.size, SIZE_NAMES) ? this.size : SIZE_NAMES[0])
      )
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
    },

    getInputEl() {
      return this.$el && this.$el.firstElementChild
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

<style scoped>
@import url('../../global.css');

.textarea {
  --line-height: 22px;
  --padding-top-bottom: 4px;
  --font-size: 14px;
  --padding-left-right: 12px;
  --color: var(--ly-main-color);

  height: calc(var(--line-height) * 3 + var(--padding-top-bottom) * 2 + 2px);
  width: 100%;
  position: relative;
}

.textarea.size--mini {
  --line-height: 18px;
  --padding-top-bottom: 2px;
  --font-size: 12px;
  --padding-left-right: 8px;
}

.textarea.size--large {
  --line-height: 26px;
  --padding-top-bottom: 6px;
  --font-size: 16px;
}

.input-text {
  display: block;
  border: 1px solid var(--ly-light-color);
  border-radius: 4px;
  overflow: hidden;
  margin: 0;
  outline: none;
  width: 100%;
  height: 100%;
  line-height: var(--line-height);
  width: 100%;
  padding: var(--padding-top-bottom) var(--padding-left-right);
  font-size: var(--font-size);
  cursor: pointer;
  color: var(--ly-semi-color);
  background: #ffffff;
  box-sizing: border-box;
  resize: none;
  box-shadow: none;
}

.input-text::-webkit-input-placeholder {
  color: var(--ly-light-color);
}

.input:hover .input-text,
.input-text:hover {
  border-color: var(--color);
}

.input-text:disabled,
.input-text:disabled:hover {
  background-color: var(--ly-whitesmoke-color);
  border-color: var(--ly-light-color);
  cursor: not-allowed;
}

.input-text:focus {
  border-color: var(--color);
  box-shadow: 0 0 3px var(--color);
}
</style>
