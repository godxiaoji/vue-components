<template>
  <div
    class="input"
    :class="[sizeClassName, { warn: warn, 'has-icon': type === 'search' }]"
    :disabled="disabled"
  >
    <icon
      v-if="type === 'search'"
      type="search"
      class="input-label-icon"
    ></icon>
    <input
      class="input-input"
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
    <icon
      type="clear"
      v-show="showClearIcon"
      class="input-clear-icon"
      @click.native="onClearClick"
    ></icon>
    <p class="input-error" v-show="warn && errMsg">{{ errMsg }}</p>
  </div>
</template>

<script>
import Icon from '../Icon/Icon.vue'
import {
  inArray,
  getRandomNumber,
  isFunction,
  isString,
  isNumber
} from '../../helpers/util'
import { getHandleEvent } from '../../helpers/events'

const SIZE_NAMES = ['default', 'mini', 'large']
const TYPE_NAMES = ['text', 'number', 'password', 'search']

export default {
  name: 'app-input',
  components: { Icon },
  props: {
    name: {
      type: String,
      default() {
        return 'input-' + getRandomNumber()
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
    }
  },
  data() {
    return {
      formValue: '',
      warn: false,
      errMsg: ''
    }
  },
  computed: {
    sizeClassName() {
      return (
        'size--' + (inArray(this.size, SIZE_NAMES) ? this.size : SIZE_NAMES[0])
      )
    },
    showClearIcon() {
      return this.showClear &&
        this.formValue &&
        !this.disabled &&
        !this.readonly
        ? true
        : false
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
    },

    /**
     * 清除点击
     */
    onClearClick() {
      this.reset()
    }
  }
}
</script>

<style scoped>
@import url('../../global.css');

.input {
  --height: 30px;
  --font-size: 14px;
  --icon-size: 20px;
  --padding-left-right: 12px;
  --color: var(--app-main-color);
  --warn-color: var(--app-warn-color);

  height: calc(var(--height) + 2px);
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
}

.input.warn {
  --color: var(--app-warn-color);
}

.input.size--mini {
  --height: 22px;
  --font-size: 12px;
  --icon-size: 16px;
  --padding-left-right: 8px;
}

.input.size--large {
  --height: 38px;
  --font-size: 16px;
  --icon-size: 22px;
}

.input-input {
  display: block;
  border: 1px solid var(--app-light-color);
  border-radius: 4px;
  overflow: hidden;
  margin: 0;
  outline: none;
  width: 100%;
  height: 100%;
  line-height: var(--height);
  width: 100%;
  padding: 0 calc(var(--icon-size) + var(--padding-left-right) * 1.5) 0
    var(--padding-left-right);
  font-size: var(--font-size);
  cursor: pointer;
  color: var(--app-semi-color);
  background: #ffffff;
  box-sizing: border-box;
  box-shadow: none;
}

.input-input[type='search']::-webkit-search-cancel-button {
  display: none;
}

.input.has-icon .input-input {
  padding-left: calc(var(--icon-size) + var(--padding-left-right) * 1.5);
}

.input.warn .input-input {
  border-color: var(--warn-color);
}

.input-input::-webkit-input-placeholder {
  color: var(--app-light-color);
}

.input:hover .input-input,
.input-input:hover {
  border-color: var(--color);
}

.input-input:disabled,
.input-input:disabled:hover {
  background-color: var(--app-whitesmoke-color);
  border-color: var(--app-light-color);
  cursor: not-allowed;
}

.input-input:focus {
  border-color: var(--color);
  box-shadow: 0 0 3px var(--color);
}

.input-label-icon,
.input-clear-icon {
  position: absolute;
  right: var(--padding-left-right);
  /* right: calc((var(--height) - var(--icon-size)) / 2); */
  top: 50%;
  margin-top: calc((var(--icon-size) / 2) - var(--icon-size));
  width: var(--icon-size);
  height: var(--icon-size);
  box-sizing: border-box;
  cursor: pointer;
}

.input-label-icon {
  left: var(--padding-left-right);
  right: auto;
}

.input-error {
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
