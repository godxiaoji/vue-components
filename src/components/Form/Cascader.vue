<template>
  <div
    :class="[
      prefix + '-cascader',
      {
        focus: focus,
        disabled: disabled,
        'no-border': !border
      },
      sizeClassName,
      alignClassName
    ]"
  >
    <div :class="[prefix + '-cascader_field']" @mouseup="onBoxClick">
      <div
        :class="[prefix + '-cascader_text', { placeholder: !formLabelString }]"
      >
        {{ formLabelString || placeholder }}
      </div>
      <icon :class="[prefix + '-cascader_unfold-icon']"  class-name="DownOutlined"></icon>
      <input
        :class="[prefix + '-cascader_input']"
        type="text"
        readonly
        :name="name"
        :disabled="disabled"
        :placeholder="placeholder"
        :value="formValueString"
        @focus="onInputFocus"
        @blur="onInputBlur"
      />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Icon from '../Icon/Icon.vue'
import CascaderPicker from './CascaderPicker.vue'
import { CustomEvent } from '../../helpers/events'
import {
  inArray,
  isArray,
  cloneData,
  isStringArray,
  isNumberArray,
  isString,
  isNumber,
  isObject
} from '../../helpers/util'
import {
  parseDropdownList,
  dateString2Array,
  timeString2Array,
  datetimeString2Array,
  getDate
} from './cascader-util'
import { SDKKey } from '../../config'
import { createPicker, destroyPicker } from '../../helpers/popup'

const SIZE_NAMES = ['default', 'mini', 'large']
const ALIGN_NAMES = ['left', 'center', 'right']
const MODE_NAMES = [
  'multiSelector',
  'selector',
  'date',
  'time',
  'datetime',
  'region'
]

const VISIBILITY_CHANGE_TYPE = 'visibility-change'

function createCascaderPicker(parent) {
  const picker = createPicker(parent.$el, { minWidth: false })

  const Comp = Vue.extend({
    extends: CascaderPicker,
    created() {
      this.$parent = parent
    }
  })

  const app = new Comp({
    propsData: {
      options: parent.options2,
      mode: parent.initMode
    }
  }).$mount(picker.$mount)

  picker.app = app

  return picker
}

function parseOptions(options, fieldNames) {
  const newOptions = []

  if (isArray(options)) {
    options.forEach(option => {
      if (
        isObject(option) &&
        (isNumber(option[fieldNames.value]) ||
          isString(option[fieldNames.value]))
      ) {
        newOptions.push({
          label:
            option[fieldNames.label] == null
              ? option[fieldNames.value]
              : option[fieldNames.label],
          value: option[fieldNames.value],
          children: parseOptions(option[fieldNames.children], fieldNames)
        })
      }
    })
  }

  return newOptions
}

export default {
  name: SDKKey + '-cascader',
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
        return (
          isStringArray(value) ||
          isNumberArray(value) ||
          isString(value) ||
          isNumber(value)
        )
      },
      default() {
        return []
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'default'
    },
    separator: {
      type: String,
      default: '/'
    },
    options: {
      validator(value) {
        if (isArray(value)) {
          for (let i = 0; i < value.length; i++) {
            const val = value[i].value

            if (!(isNumber(val) || isString(val))) {
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
    defaultMode: {
      type: String,
      default: 'select'
    },
    fieldNames: {
      type: Object,
      default() {
        return { label: 'label', value: 'value', children: 'children' }
      }
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
      prefix: SDKKey,

      initMode: MODE_NAMES[0],
      focus: false,
      formValue: [],
      formLabel: [],
      dropdown: [],

      hasPrepend: false,

      fieldNames2: { label: 'label', value: 'value', children: 'children' },
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
    },
    alignClassName() {
      return (
        'align--' +
        (inArray(this.align, ALIGN_NAMES) ? this.align : ALIGN_NAMES[0])
      )
    },
    formLabelString() {
      const dateFormat = this.getDateFormat()

      if (dateFormat) {
        return dateFormat
      }

      return this.formLabel.join(this.separator)
    },
    formValueString() {
      const dateFormat = this.getDateFormat()

      if (dateFormat) {
        return dateFormat
      }

      if (this.formValue.length === 1) {
        return this.formValue[0]
      }

      return this.formValue.join(this.separator)
    }
  },
  watch: {
    value(newVal) {
      if (this.formValue != newVal) {
        !this.setVaildValue(newVal)
      }
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
    // 优先确定模式
    if (inArray(this.defaultMode, MODE_NAMES)) {
      this.initMode = this.defaultMode
    }
    this.updateOptions()
    // 初始化value
    if (!this.setVaildValue(this.getValues(this.value))) {
      this.$emit('_change', cloneData(this.formValue))
    }
  },
  ready() {},
  mounted() {
    const inputEl = this.getInputEl()

    inputEl._app_component = this
    inputEl._app_type = 'cascader'
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
    updateOptions() {
      if (this.initMode !== 'multiSelector') {
        return
      }

      if (isObject(this.fieldNames)) {
        if (isString(this.fieldNames.label)) {
          this.fieldNames2.label = this.fieldNames.label
        }
        if (isString(this.fieldNames.value)) {
          this.fieldNames2.value = this.fieldNames.value
        }
        if (isString(this.fieldNames.children)) {
          this.fieldNames2.children = this.fieldNames.children
        }
      }

      this.options2 = parseOptions(this.options, this.fieldNames2)
    },
    /**
     * 尝试将其他类型的数据转为数组
     */
    getValues(value) {
      // 格式化数据
      let values

      if (value == null) {
        return []
      } else if (isArray(value)) {
        values = value
      } else if (this.initMode === 'date') {
        values = value.split('-')
      } else if (this.initMode === 'time') {
        values = value.split(':')
      } else if (this.initMode === 'datetime') {
        const matched = /^(\d{4})-(\d{2})-(\d{2})\s(\d{2}):(\d{2}):(\d{2})$/.exec(
          value
        )
        if (matched && matched[0]) {
          values = matched.splice(1, 6)
        } else {
          values = []
        }
      } else if (isNumber(value)) {
        values = [value]
      } else {
        values = value.split(this.separator)
      }

      return values
    },

    getDateFormat() {
      if (this.initMode === 'date') {
        return this.formLabel.join('-')
      } else if (this.initMode === 'time') {
        return this.formLabel.join(':')
      } else if (this.initMode === 'datetime' && this.formLabel.length > 0) {
        return [
          this.formLabel.slice(0, 3).join('-'),
          this.formLabel.slice(3, 6).join(':')
        ].join(' ')
      }

      return null
    },

    /**
     * 组件点击
     */
    onBoxClick() {
      if (!this.disabled) {
        const inputEl = this.getInputEl()

        if (this.focus) {
          // 如果组件已经展开，则收起
          inputEl.blur()
        } else {
          if (!this.picker) {
            this.picker = createCascaderPicker(this)
          }

          this.focus = true
          this.picker.app.parseDropdown(this.formValue)

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
      return this.$el && this.$el.querySelector('input')
    },

    onSelect(item) {
      this.formValue = item.values
      this.formLabel = item.labels

      this.getInputEl().blur()
      this.onChange()
    },

    onChange() {
      const detail = {
        valueString: this.formValueString,
        value: this.hookFormValue()
      }

      if (this.initMode === 'date' || this.initMode === 'datetime') {
        detail.date = getDate(detail.value)
      } else if (this.initMode === 'time') {
        detail.date = getDate(new Array(3).concat(detail.value))
      }

      this.$emit('_change', this.hookFormValue())

      const type = 'change'

      this.$emit(
        type,
        new CustomEvent(
          {
            type,
            currentTarget: this.$el,
            target: this.getInputEl()
          },
          detail
        )
      )
    },

    reset() {
      // 清空为空数组
      if (this.formValue.length !== 0) {
        this.formValue = []
        this.formLabel = []
        this.onChange()
      }
    },

    /**
     * 校验value正确性
     */
    setVaildValue(values) {
      if (isString(values)) {
        if (this.initMode === 'date') {
          values = dateString2Array(values)
        } else if (this.initMode === 'time') {
          values = timeString2Array(values)
        } else if (this.initMode === 'datetime') {
          values = datetimeString2Array(values)
        } else {
          values = values.split(this.separator)
        }
      }

      const formValue = []
      const formLabel = []

      const deep = (index, parent) => {
        const optionList = parseDropdownList(this.initMode, index, parent)
        const value = values[index]

        for (let i = 0; i < optionList.length; i++) {
          const optionItem = optionList[i]

          if (optionItem.value === value) {
            formValue.push(optionItem.value)
            formLabel.push(optionItem.label)

            if (optionItem.hasChildren && values[index + 1]) {
              // 都有下一项
              return deep(index + 1, optionItem)
            } else if (!optionItem.hasChildren && index + 1 >= values.length) {
              // 都没有下一项，匹配正确
              return true
            } else {
              return false
            }
          }
        }

        return false
      }

      if (isArray(values)) {
        if (values.length === 0) {
          // 空数组也算符合
          this.formValue = []
          this.formLabel = []

          return true
        } else {
          const isVaild = deep(0, this.options)

          if (isVaild) {
            this.formValue = formValue
            this.formLabel = formLabel
          } else {
            this.$emit('_change', this.hookFormValue())
            throw new Error('Invalid prop: "value" is not in "options".')
          }

          return isVaild
        }
      }

      return false
    },

    hookFormValue() {
      return cloneData(this.formValue)
    },

    onDropdownTap() {}
  }
}
</script>

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-cascader {
  --height: 30px;
  --font-size: 14px;
  --icon-size: 18px;
  --color: var(--#{$prefix}-main-color);
  --dropdown-color: var(--#{$prefix}-light-color);
  --placeholder-color: var(--#{$prefix}-light-color);
  --padding-left-right: 12px;

  display: flex;
  height: calc(var(--height) + 2px);
  font-size: var(--font-size);
  position: relative;
  color: $semi-color;

  &.size--mini {
    --height: 22px;
    --font-size: 12px;
    --icon-size: 16px;
    --padding-left-right: 8px;
  }

  &.size--large {
    --height: 38px;
    --font-size: 16px;
    --icon-size: 20px;
  }

  &_field {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    border: 1px solid $light-color;
    border-radius: 4px;
    overflow: hidden;
    box-sizing: border-box;
    background-color: #fff;

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
      color: var(--placeholder-color);
    }

    &:disabled {
      cursor: not-allowed;
    }
  }

  &_text {
    .#{$prefix}-cascader.align--center & {
      text-align: center;
    }

    .#{$prefix}-cascader.align--right & {
      text-align: right;
    }

    &.placeholder {
      color: var(--placeholder-color);
    }
  }

  &_unfold-icon {
    display: block;
    width: var(--icon-size);
    height: var(--icon-size);
    margin-right: var(--padding-left-right);
    transition: all 0.2s;
    flex-shrink: 1;
    fill: $font3-color;
  }

  &_tools {
    display: none;
  }

  &_groups {
    box-sizing: border-box;
    height: 220px;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    text-align: center;
  }

  &_group {
    position: relative;
    height: 100%;
    z-index: 1;
    min-width: 60px;
    display: inline-flex;
    flex: 0 0 auto;
    border-right: 1px solid $whitesmoke-color;
    vertical-align: top;

    &:last-child {
      border-right: none;
    }
  }

  &_list {
    width: 100%;
    max-height: 100%;
    list-style: none;
    margin: 0;
    padding: 0;
    user-select: none;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  &_item {
    --color: rgba(9, 187, 7, 0.1);
    --height: 32px;
    --font-size: 14px;

    display: flex;
    align-items: center;
    padding: 0 12px;
    height: var(--height);
    font-size: var(--font-size);
    cursor: pointer;
    user-select: none;
    box-sizing: border-box;
    -webkit-tap-highlight-color: var(--color);

    &[selected] {
      background-color: $whitesmoke-color;
    }

    &:hover {
      background-color: var(--color);
    }

    &[disabled],
    &[disabled]:hover {
      background-color: #ffffff;
      color: $light-color;
      cursor: not-allowed;
    }

    &-text {
      text-align: left;
      flex: 1;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    &-icon {
      margin-right: calc(
        var(--padding-left-right) / 2 - var(--padding-left-right)
      );
      fill: $border-color;
    }
  }

  &.disabled {
    .#{$prefix}-cascader {
      &_field,
      &_field:hover {
        background-color: $whitesmoke-color;
        border-color: $light-color;
        cursor: not-allowed;
      }
    }
  }

  &.focus {
    .#{$prefix}-cascader {
      &_field {
        border-color: var(--color);
        box-shadow: 0 0 3px var(--color);
      }

      &_unfold-icon {
        transform: rotate(180deg);
      }
    }
  }

  &.no-border {
    .#{$prefix}-cascader {
      &_field {
        border: none;
      }

      &_text,
      &_input {
        padding: 0;
      }

      &_unfold-icon {
        margin-right: 0;
      }
    }

    &.focus {
      .#{$prefix}-cascader {
        &_field {
          box-shadow: none;
        }
      }
    }

    &.disabled {
      .#{$prefix}-cascader {
        &_field,
        &_field:hover {
          background-color: transparent;
          border-color: transparent;
        }

        &_text,
        &_input {
          color: $light-color;
        }
      }
    }
  }
}

@media screen and (max-width: 575px) {
  .#{$prefix}-cascader {
    &_group {
      &:last-child {
        border-right: 1px solid $whitesmoke-color;
      }

      &:first-child {
        border-left: 1px solid $whitesmoke-color;
      }
    }

    &_item {
      --height: 40px;
      --font-size: 16px;
    }
  }
}
</style>
