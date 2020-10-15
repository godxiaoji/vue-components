<template>
  <div
    :class="[
      prefix + '-select',
      { focus: focus, disabled: disabled },
      sizeClassName
    ]"
  >
    <div :class="[prefix + '-select_field']" @mouseup="onBoxClick">
      <div :class="[prefix + '-select_text', { placeholder: !formLabel }]">
        {{ formLabel || placeholder }}
      </div>
      <icon :class="[prefix + '-select_unfold-icon']" type="unfold"></icon>
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
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import SelectPicker from './SelectPicker.vue'
import Icon from '../Icon/Icon.vue'
import { CustomEvent } from '../../helpers/events'
import {
  isNumber,
  isString,
  inArray,
  isArray,
  isObject
} from '../../helpers/util'
import { SDKKey } from '../../config'
import { createPicker, destroyPicker } from '../../helpers/popup'

const SIZE_NAMES = ['default', 'mini', 'large']

const VISIBILITY_CHANGE_TYPE = 'visibility-change'

function createSelectPicker(parent) {
  const picker = createPicker(parent.$el, { minWidth: true })

  const Comp = Vue.extend({
    extends: SelectPicker,
    created() {
      this.$parent = parent
    }
  })

  const app = new Comp({
    propsData: {
      options: parent.options2
    }
  }).$mount(picker.$mount)

  picker.app = app

  return picker
}

export default {
  name: SDKKey + '-select',
  components: { Icon },
  props: {
    options: {
      validator(value) {
        if (isArray(value)) {
          for (let i = 0; i < value.length; i++) {
            const option = value[i]

            if (!(isNumber(option) || isString(option) || isObject(option))) {
              return false
            }
          }
        } else {
          return false
        }

        return true
      },
      type: Array,
      default() {
        return []
      }
    },
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
    },
    fieldNames: {
      type: Object,
      default() {
        return { label: 'label', value: 'value' }
      }
    }
  },
  data() {
    return {
      prefix: SDKKey,

      focus: false,
      formValue: '',
      formLabel: '',

      fieldNames2: { label: 'label', value: 'value' },
      options2: []
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
    value() {
      this.updateValue()
    },
    focus(newVal) {
      if (newVal) {
        this.picker.show()
      } else {
        this.picker.hide()
      }
    },
    options() {
      this.updateOptions()
    },
    fieldNames() {
      this.updateOptions()
    }
  },
  created() {
    this.updateOptions()
    this.updateValue()
  },
  ready() {},
  mounted() {
    const inputEl = this.getInputEl()

    inputEl._app_component = this
    inputEl._app_type = 'select'
  },
  updated() {},
  attached() {},
  destroyed() {
    if (this.picker) {
      this.picker.app.$destroy()
      destroyPicker(this.picker.id)
    }
  },
  methods: {
    updateValue() {
      if (!this.updateSelected(this.value)) {
        if (this.value !== '') {
          this.$emit('_change', this.formValue)
          console.error('Invalid prop: "value" is not in "options".')
        }
      }
    },

    updateOptions() {
      if (isObject(this.fieldNames)) {
        if (isString(this.fieldNames.label)) {
          this.fieldNames2.label = this.fieldNames.label
        }
        if (isString(this.fieldNames.value)) {
          this.fieldNames2.value = this.fieldNames.value
        }
      }

      const options = []
      const { label: labelName, value: valueName } = this.fieldNames2

      if (isArray(this.options)) {
        this.options.forEach(item => {
          let option

          if (isNumber(item)) {
            option = {
              label: item.toString(),
              value: item
            }
          } else if (isString(item)) {
            option = {
              label: item,
              value: item
            }
          } else if (
            isObject(item) &&
            (isString(item[valueName]) || isNumber(item[valueName]))
          ) {
            option = {
              label:
                item[labelName] == null ? item[valueName] : item[labelName],
              value: item[valueName]
            }
          }

          if (option) {
            if (option.value === this.formValue) {
              option.selected = true
            }

            options.push(option)
          }
        })
      }

      this.options2 = options
    },

    onBoxClick() {
      if (!this.disabled) {
        const inputEl = this.getInputEl()

        if (this.focus) {
          inputEl.blur()
        } else {
          if (!this.picker) {
            this.picker = createSelectPicker(this)
          }

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

      this.options2.forEach(option => {
        if (option.value === value) {
          this.formLabel = option.label
          this.formValue = option.value
          hasValue = true
          option.selected = true
        } else {
          option.selected = false
        }
      })

      return hasValue
    },

    onChange(value) {
      this.updateSelected(value)

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
        this.onChange(value)
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

  &_field {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    border: 1px solid $light-color;
    border-radius: 4px;
    overflow: hidden;
    box-sizing: border-box;
    position: relative;

    &:hover {
      border-color: var(--color);
    }
  }

  &_text,
  &_input {
    flex-grow: 1;
    box-sizing: border-box;
    padding: 0 calc(var(--padding-left-right) / 2) 0 var(--padding-left-right);
    font-size: var(--font-size);
    color: $semi-color;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    height: 100%;
    line-height: var(--height);
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    margin: 0;
    border: none;
    width: 0;

    &.placeholder {
      color: $light-color;
    }
  }

  &_input {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;

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
    flex-shrink: 0;
  }

  &_option-group {
    width: 100%;
    box-sizing: border-box;
    max-height: 220px;
    overflow-x: hidden;
    overflow-y: auto;
  }

  &.focus {
    .#{$prefix}-select {
      &_field {
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
      &_field,
      &_field:hover {
        background-color: $whitesmoke-color;
        border-color: $light-color;
        cursor: not-allowed;
      }
    }
  }

  &_option {
    --color: rgba(9, 187, 7, 0.1);
    --height: 32px;
    --font-size: 14px;

    width: 100%;
    box-sizing: border-box;
    padding: 0 12px;
    height: var(--height);
    line-height: var(--height);
    color: $semi-color;
    text-align: left;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-tap-highlight-color: var(--color);
    white-space: nowrap;
    text-overflow: ellipsis;

    &.selected {
      background-color: $whitesmoke-color;
    }

    &:hover {
      background-color: var(--color);
    }

    &[disabled],
    &[disabled]:hover {
      background-color: $light-color;
      cursor: not-allowed;
    }
  }
}

@media screen and (max-width: 575px) {
  .#{$prefix}-select-option {
    height: 40px;
    line-height: 40px;
    font-size: 16px;
  }
}
</style>
