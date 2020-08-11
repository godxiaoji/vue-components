<template>
  <div
    class="ly-select"
    :class="[{ focus: focus, disabled: disabled }, sizeClassName]"
  >
    <div class="ly-select_input-box" @mouseup="onBoxClick">
      <input
        class="ly-select_input"
        type="text"
        readonly
        :disabled="disabled"
        :placeholder="placeholder"
        :value="formValue"
        @focus="onInputFocus"
        @blur="onInputBlur"
      />
      <icon class="ly-select_unfold-icon" type="unfold"></icon>
    </div>
    <div class="ly-select_dropdown">
      <div class="ly-select_option-group ly-scroll-bar">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '../Icon/Icon.vue'
import { CustomEvent, BaseEvent } from '../../helpers/events'
import { isNumber, isString, inArray } from '../../helpers/util'

const SIZE_NAMES = ['default', 'mini', 'large']

const VISIBILITY_CHANGE_TYPE = 'visibility-change'

export default {
  name: 'ly-select',
  components: { Icon },
  props: {
    name: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
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
            new CustomEvent(
              {
                type: VISIBILITY_CHANGE_TYPE,
                currentTarget: this.$el
              },
              {
                visibility: true
              }
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
      this.$emit(
        e.type,
        new BaseEvent(
          {
            type: e.type,
            currentTarget: this.$el,
            target: e.target
          },
          {}
        )
      )
    },
    onInputBlur(e) {
      this.focus = false

      this.$emit(
        e.type,
        new BaseEvent(
          {
            type: e.type,
            currentTarget: this.$el,
            target: e.target
          },
          {}
        )
      )

      this.$emit(
        VISIBILITY_CHANGE_TYPE,
        new CustomEvent(
          {
            type: VISIBILITY_CHANGE_TYPE,
            currentTarget: this.$el
          },
          {
            visibility: false
          }
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
      this.$emit(
        type,
        new CustomEvent(
          {
            type,
            currentTarget: this.$el,
            target: this.getInputEl()
          },
          {
            value
          }
        )
      )
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

.ly-select {
  --height: 30px;
  --font-size: 14px;
  --icon-size: 20px;
  --padding-left-right: 12px;
  --color: var(--ly-main-color);

  display: inline-flex;
  width: 100%;
  height: calc(var(--height) + 2px);
  font-size: var(--font-size);
  position: relative;
}

.ly-select.size--mini {
  --height: 22px;
  --font-size: 12px;
  --icon-size: 16px;
  --padding-left-right: 8px;
}

.ly-select.size--large {
  --height: 38px;
  --font-size: 16px;
  --icon-size: 22px;
}

.ly-select_input-box {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  border: 1px solid var(--ly-light-color);
  border-radius: 4px;
  overflow: hidden;
  box-sizing: border-box;
}

.ly-select_input-box:hover {
  border-color: var(--color);
}

.ly-select.disabled .ly-select_input-box,
.ly-select.disabled .ly-select_input-box:hover {
  background-color: var(--ly-whitesmoke-color);
  border-color: var(--ly-light-color);
  cursor: not-allowed;
}

.ly-select.focus .ly-select_input-box {
  border-color: var(--color);
  box-shadow: 0 0 3px var(--color);
}

.ly-select_input {
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
  color: var(--ly-semi-color);
  background: none;
}

.ly-select_input::-webkit-input-placeholder {
  color: var(--ly-light-color);
}

.ly-select_input:disabled {
  cursor: not-allowed;
}

.ly-select_unfold-icon {
  display: block;
  width: var(--icon-size);
  height: var(--icon-size);
  margin-right: var(--padding-left-right);
  transition: all 0.2s;
}

.ly-select.focus .ly-select_unfold-icon {
  transform: rotate(180deg);
}

.ly-select_dropdown {
  display: none;
  position: absolute;
  left: 0;
  top: calc(100% + 2px);
  min-width: 100%;
  max-width: calc(100% + 100px);
  z-index: 99999;
}

.ly-select_option-group {
  background-color: #fff;
  width: 100%;
  border: 1px solid var(--ly-light-color);
  box-sizing: border-box;
  border-radius: 4px;
  max-height: 208px;
  overflow-x: hidden;
  overflow-y: auto;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.25);
}

.ly-select.focus .ly-select_dropdown {
  display: block;
}

@media screen and (max-width: 540px) {
  .ly-select_dropdown {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
  }

  .ly-select_option-group {
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
