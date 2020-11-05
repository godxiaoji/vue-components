<template>
  <div
    :class="[
      prefix + '-select',
      { focus: focus, disabled: disabled, mobile: isMobile }
    ]"
  >
    <div :class="[prefix + '-select_field']" @mouseup="onBoxClick">
      <div :class="[prefix + '-select_text', { placeholder: !formLabel }]">
        {{ formLabel || placeholder }}
      </div>
      <icon
        :class="[prefix + '-select_unfold-icon', { 'arrow--down': !isMobile }]"
        :class-name="isMobile ? 'RightOutlined' : 'DownOutlined'"
      ></icon>
      <input
        :class="[prefix + '-select_input']"
        type="text"
        readonly
        :name="formName"
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
import SelectDrawer from './Drawer.vue'
import Icon from '../Icon'
import { CustomEvent } from '../../helpers/events'
import { isNumber, isString, isArray, isObject } from '../../helpers/util'
import { SDKKey } from '../../config'
import { createPopup } from '../../helpers/popup'
import formMixin from '../util/form-mixin'
import { isMobile } from '../../helpers/device'

const VISIBILITY_CHANGE_TYPE = 'visibility-change'

// function createSelectPicker(parent, alignRight = false) {
//   let picker

//   if (isMobile) {
//     picker = createDrawer()
//   } else {
//     picker = createPicker(parent.$el, {
//       minWidth: false,
//       align: alignRight ? 'right' : 'left'
//     })
//   }

//   const Comp = Vue.extend({
//     extends: SelectDrawer,
//     created() {
//       this.$parent = parent
//     }
//   })

//   const app = new Comp({
//     propsData: {
//       options: parent.options2
//     }
//   }).$mount(picker.$mount)

//   picker.app = app

//   return picker
// }

function createSelectPicker(parent) {
  const { $wrapper } = createPopup()

  const Comp = Vue.extend({
    extends: SelectDrawer,
    created() {
      this.$parent = parent
    }
  })

  return new Comp({
    propsData: {
      options: parent.options2
    }
  }).$mount($wrapper)
}

export default {
  name: SDKKey + '-select',
  components: { Icon },
  mixins: [formMixin],
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
      isMobile,

      focus: false,
      formValue: '',
      formLabel: '',
      defaultValue: '',

      fieldNames2: { label: 'label', value: 'value' },
      options2: []
    }
  },
  model: {
    prop: 'value',
    event: '_change'
  },
  computed: {},
  watch: {
    value() {
      this.updateValue()
    },
    focus(newVal) {
      if (this.picker) {
        if (newVal) {
          this.picker.show()
        } else {
          this.picker.hide()
        }
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

    this.defaultValue = this.formValue
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
      this.picker.destroy()
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
              value: item[valueName],
              disabled: !!item.disabled
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
          this.focus = true

          if (!this.picker) {
            this.picker = createSelectPicker(this, !!this.appFormItem)
          }

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
      return this.$el && this.$el.firstElementChild.lastElementChild
    },

    updateSelected(value) {
      let hasValue = false

      this.options2.forEach((option, index) => {
        if (option.value === value) {
          this.formLabel = option.label
          this.formValue = option.value
          hasValue = true
          this.$set(this.options2[index], 'selected', true)
        } else {
          this.$set(this.options2[index], 'selected', false)
        }
      })

      if (!hasValue) {
        this.formValue = ''
        this.formLabel = ''
      }

      return hasValue
    },

    onSelect(value) {
      this.getInputEl().blur()

      this.onChange(value)
    },

    onChange(value) {
      this.updateSelected(value)

      this.$emit('_change', value)

      const type = 'change'

      this.validateAfterEventTrigger(type, this.formValue)

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
      if (this.formValue !== this.defaultValue) {
        this.onChange(this.defaultValue)
      }
    }
  }
}
</script>

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-select {
  --height: 48px;
  --font-size: 17px;
  --icon-size: 20px;
  --padding-left-right: 16px;
  --color: #{$primary-color};
  --placeholder-color: #{$font3-color};

  display: inline-flex;
  width: 100%;
  height: var(--height);
  font-size: var(--font-size);
  position: relative;

  &_field {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    border: 1px solid $border-color;
    overflow: hidden;
    box-sizing: border-box;
    position: relative;
    padding: 0 16px;
    background-color: #fff;

    &:hover {
      border-color: var(--color);
    }
  }

  &_text,
  &_input {
    flex-grow: 1;
    box-sizing: border-box;
    padding: 0;
    font-size: var(--font-size);
    color: $title-color;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
    height: 100%;
    line-height: calc(var(--height) - 2px);
    display: block;
    margin: 0;
    border: none;
    width: 0;

    &.placeholder {
      color: var(--placeholder-color);
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
      color: var(--placeholder-color);
    }

    &:disabled {
      cursor: not-allowed;
    }
  }

  &_unfold-icon {
    display: block;
    --size: var(--icon-size);
    --color: #{$font-color};
    transition: all 0.2s;
    flex-shrink: 0;
    margin-left: 5px;
  }

  &.focus {
    .#{$prefix}-select {
      &_field {
        border-color: var(--color);
      }
      &_unfold-icon.arrow--down {
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
        background-color: $background2-color;
        border-color: $border-color;
        cursor: not-allowed;
      }

      &_text,
      &_text.placeholder {
        color: $font3-color;
      }
    }
  }

  &_options {
    width: 100%;
    box-sizing: border-box;
    height: 100%;
    padding: 10px 0;
    overflow-x: hidden;
    overflow-y: auto;
  }

  &_option {
    width: 100%;
    box-sizing: border-box;
    padding: 0 12px;
    height: 41px;
    line-height: 41px;
    font-size: 15px;
    color: $title-color;
    text-align: left;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    &.selected {
      color: $primary-color;
    }

    &:hover {
      background-color: $background-color;
    }

    &[disabled],
    &[disabled]:hover {
      background-color: $background2-color;
      color: $font3-color;
      cursor: not-allowed;
    }
  }
}

.#{$prefix}-select_options.mobile {
  height: 100%;
}
</style>
