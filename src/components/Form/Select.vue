<template>
  <div
    class="select"
    :class="[{ focus: focus, disabled: disabled }, sizeClassName]"
  >
    <div class="select-input-box" @mouseup="onBoxClick">
      <input
        class="select-input"
        type="text"
        readonly
        :disabled="disabled"
        :placeholder="placeholder"
        :value="formValue"
        @focus="onInputFocus"
        @blur="onInputBlur"
      />
      <icon class="select-unfold-icon" type="unfold"></icon>
    </div>
    <div class="select-dropdown">
      <div class="select-option-group app-scroll-bar">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '../Icon/Icon.vue'
import { getHandleEvent } from '../../helpers/events'
import {
  isNumber,
  isString,
  inArray,
  getRandomNumber
} from '../../helpers/util'

const SIZE_NAMES = ['default', 'mini', 'large']

const VISIBILITY_CHANGE_TYPE = 'visibility-change'

export default {
  name: 'app-select',
  components: { Icon },
  props: {
    name: {
      type: String,
      default() {
        return 'select-' + getRandomNumber()
      }
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    value: {
      validator(value) {
        // 这个值必须匹配下列字符串中的一个
        return isNumber(value) || isString(value)
      },
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'default'
    }
  },
  data() {
    return {
      focus: false,
      formValue: ''
    }
  },
  model: {
    prop: 'value',
    event: '_change'
  },
  computed: {
    sizeClassName() {
      return (
        'size--' + (inArray(this.size, SIZE_NAMES) ? this.size : SIZE_NAMES[0])
      )
    }
  },
  watch: {
    size() {
      this.$children.forEach(vm => {
        vm.updateSize && vm.updateSize(this.size)
      })
    },
    value() {
      let value = this.value

      this.updateSelected(value)

      this.formValue = value
    }
  },
  created() {
    // 初始化value
    if (this.formValue !== this.value) {
      this.formValue = this.value
    }

    this._select_group = true
  },
  ready() {},
  mounted() {
    this.getInputEl()._app_component = this
  },
  updated() {},
  attached() {},
  methods: {
    onBoxClick() {
      if (!this.disabled) {
        const inputEl = this.getInputEl()

        if (this.focus) {
          inputEl.blur()
        } else {
          this.focus = true

          this.$emit(
            VISIBILITY_CHANGE_TYPE,
            getHandleEvent(
              this.$el,
              {},
              {
                visibility: true
              },
              VISIBILITY_CHANGE_TYPE
            )
          )
        }
      }
    },
    onInputFocus(e) {
      // window.console.log(this.focus)
      // if (this.focus) {
      //   e.target.blur()
      // } else {
      //   this.focus = true
      // }
      this.$emit(e.type, getHandleEvent(this.$el, e))
    },
    onInputBlur(e) {
      this.focus = false

      this.$emit(e.type, getHandleEvent(this.$el, e))

      this.$emit(
        VISIBILITY_CHANGE_TYPE,
        getHandleEvent(
          this.$el,
          e,
          {
            visibility: false
          },
          VISIBILITY_CHANGE_TYPE
        )
      )
    },
    getInputEl() {
      return this.$el && this.$el.firstElementChild.firstElementChild
    },

    updateSelected(value) {
      let hasValue = false

      this.$children.forEach(vm => {
        if (vm._select_option) {
          if (vm.updateSelected(value)) {
            hasValue = true
          }
        }
      })

      return hasValue
    },

    onChange(e) {
      const value = e.value

      this.updateSelected(value)

      this.formValue = value
      this.$emit('_change', value)

      const type = 'change'
      const handleEvent = getHandleEvent(
        this.$el,
        e,
        {
          value
        },
        type
      )

      this.$emit(type, handleEvent)
    },

    reset() {
      const value = ''

      if (this.formValue !== value) {
        this.onChange({
          value
        })
      }
    }
  }
}
</script>

<style scoped>
@import url('../../global.css');

.select {
  --height: 30px;
  --font-size: 14px;
  --icon-size: 20px;
  --padding-left-right: 12px;
  --color: var(--app-main-color);

  display: inline-flex;
  width: 100%;
  height: calc(var(--height) + 2px);
  font-size: var(--font-size);
  position: relative;
}

.select.size--mini {
  --height: 22px;
  --font-size: 12px;
  --icon-size: 16px;
  --padding-left-right: 8px;
}

.select.size--large {
  --height: 38px;
  --font-size: 16px;
  --icon-size: 22px;
}

.select-input-box {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  border: 1px solid var(--app-light-color);
  border-radius: 4px;
  overflow: hidden;
  box-sizing: border-box;
}

.select-input-box:hover {
  border-color: var(--color);
}

.select.disabled .select-input-box,
.select.disabled .select-input-box:hover {
  background-color: var(--app-whitesmoke-color);
  border-color: var(--app-light-color);
  cursor: not-allowed;
}

.select.focus .select-input-box {
  border-color: var(--color);
  box-shadow: 0 0 3px var(--color);
}

.select-input {
  flex: 1;
  box-sizing: border-box;
  margin: 0;
  height: 100%;
  outline: none;
  height: var(--height);
  line-height: var(--height);
  padding: 0 calc(var(--padding-left-right) / 2) 0 var(--padding-left-right);
  font-size: var(--font-size);
  border: none;
  cursor: pointer;
  user-select: none;
  color: var(--app-semi-color);
  background: none;
}

.select-input::-webkit-input-placeholder {
  color: var(--app-light-color);
}

.select-input:disabled {
  cursor: not-allowed;
}

.select-unfold-icon {
  display: block;
  width: var(--icon-size);
  height: var(--icon-size);
  margin-right: var(--padding-left-right);
  transition: all 0.2s;
}

.select.focus .select-unfold-icon {
  transform: rotate(180deg);
}

.select-dropdown {
  display: none;
  position: absolute;
  left: 0;
  top: calc(100% + 2px);
  min-width: 100%;
  max-width: calc(100% + 100px);
  z-index: 99999;
}

.select-option-group {
  background-color: #fff;
  width: 100%;
  border: 1px solid var(--app-light-color);
  box-sizing: border-box;
  border-radius: 4px;
  max-height: 208px;
  overflow-x: hidden;
  overflow-y: auto;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.25);
}

.select.focus .select-dropdown {
  display: block;
}

@media screen and (max-width: 540px) {
  .select-dropdown {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
  }

  .select-option-group {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    top: auto;
    border-radius: 0;
    border: none;
    align-items: center;
    max-height: 220px;
    box-shadow: 0 -5px 10px rgba(0, 0, 0, 0.25);
  }
}
</style>
