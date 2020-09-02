<template>
  <div
    :class="[
      prefix + '-select',
      { focus: focus, disabled: disabled },
      sizeClassName
    ]"
  >
    <div :class="[prefix + '-select_input-box']" @mouseup="onBoxClick">
      <input
        :class="[prefix + '-select_input']"
        type="text"
        readonly
        :disabled="disabled"
        :placeholder="placeholder"
        :value="formValue"
        @focus="onInputFocus"
        @blur="onInputBlur"
      />
      <icon :class="[prefix + '-select_unfold-icon']" type="unfold"></icon>
    </div>
    <div :class="[prefix + '-select_dropdown']">
      <div :class="[prefix + '-select_option-group', prefix + '-scroll-bar']">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '../Icon/Icon.vue'
import { CustomEvent } from '../../helpers/events'
import { isNumber, isString, inArray } from '../../helpers/util'
import { SDKKey } from '../../config'

const SIZE_NAMES = ['default', 'mini', 'large']

const VISIBILITY_CHANGE_TYPE = 'visibility-change'

export default {
  name: SDKKey + '-select',
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
      prefix: SDKKey,

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
      this.$emit(e.type, e)
    },
    onInputBlur(e) {
      this.focus = false

      this.$emit(e.type, e)

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

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-select {
  --height: 30px;
  --font-size: 14px;
  --icon-size: 20px;
  --padding-left-right: 12px;
  --color: var(--#{$prefix}-main-color);

  display: inline-flex;
  width: 100%;
  height: calc(var(--height) + 2px);
  font-size: var(--font-size);
  position: relative;

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

  &_input-box {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    border: 1px solid $light-color;
    border-radius: 4px;
    overflow: hidden;
    box-sizing: border-box;

    &:hover {
      border-color: var(--color);
    }
  }

  &_input {
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
    color: $semi-color;
    background: none;

    &::-webkit-input-placeholder {
      color: $light-color;
    }

    &:disabled {
      cursor: not-allowed;
    }
  }

  &_unfold-icon {
    display: block;
    width: var(--icon-size);
    height: var(--icon-size);
    margin-right: var(--padding-left-right);
    transition: all 0.2s;
  }

  &_dropdown {
    display: none;
    position: absolute;
    left: 0;
    top: calc(100% + 2px);
    min-width: 100%;
    max-width: calc(100% + 100px);
    z-index: 99999;
  }

  &_option-group {
    background-color: #fff;
    width: 100%;
    border: 1px solid $light-color;
    box-sizing: border-box;
    border-radius: 4px;
    max-height: 208px;
    overflow-x: hidden;
    overflow-y: auto;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.25);
  }

  &.focus {
    .#{$prefix}-select {
      &_input-box {
        border-color: var(--color);
        box-shadow: 0 0 3px var(--color);
      }
      &_unfold-icon {
        transform: rotate(180deg);
      }
      &_dropdown {
        display: block;
      }
    }
  }

  &.disabled {
    .#{$prefix}-select {
      &_input-box,
      &_input-box:hover {
        background-color: $whitesmoke-color;
        border-color: $light-color;
        cursor: not-allowed;
      }
    }
  }
}

@media screen and (max-width: 540px) {
  .#{$prefix}-select {
    &_dropdown {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.1);
    }

    &_option-group {
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
}
</style>
