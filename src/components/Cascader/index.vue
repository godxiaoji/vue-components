<template>
  <div
    :class="[
      prefix + '-cascader',
      {
        focus: focus,
        disabled: disabled,
        mobile: isMobile
      }
    ]"
  >
    <div :class="[prefix + '-cascader_field']" @mouseup="onBoxClick">
      <div
        :class="[prefix + '-cascader_text', { placeholder: !formLabelString }]"
      >
        {{ formLabelString || placeholder }}
      </div>
      <icon
        :class="[
          prefix + '-cascader_unfold-icon',
          { 'arrow--down': !isMobile }
        ]"
        :class-name="isMobile ? 'RightOutlined' : 'DownOutlined'"
      ></icon>
      <input
        :class="[prefix + '-cascader_input']"
        type="text"
        readonly
        :name="formName"
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
import Icon from '../Icon'
import CascaderDrawer from './Drawer.vue'
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
  getDate,
  array2String
} from './util'
import { SDKKey } from '../../config'
import { createPopup } from '../../helpers/popup'
import formMixin from '../util/form-mixin'
import { isMobile } from '../../helpers/device'

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
  const { $wrapper } = createPopup()

  const Comp = Vue.extend({
    extends: CascaderDrawer,
    created() {
      this.$parent = parent
    }
  })

  return new Comp({
    propsData: {
      options: parent.options2,
      mode: parent.initMode,
      separator: parent.separator
    }
  }).$mount($wrapper)
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
          disabled: option.disabled ? true : false,
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
  mixins: [formMixin],
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
    }
  },
  data() {
    return {
      prefix: SDKKey,
      isMobile,

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
    formLabelString() {
      return array2String(this.formLabel, this.initMode, this.separator)
    },
    formValueString() {
      return array2String(this.formValue, this.initMode, this.separator)
    }
  },
  watch: {
    value(newVal) {
      if (this.formValue != newVal) {
        !this.setVaildValue(newVal)
      }
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
      this.picker.destroy()
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
          this.focus = true

          if (!this.picker) {
            this.picker = createCascaderPicker(this, !!this.appFormItem)
          }
          this.picker.parseDropdown(this.formValue)

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

      this.validateAfterEventTrigger(type, this.formValue)

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
  --height: 48px;
  --font-size: 17px;
  --icon-size: 20px;
  --color: #{$primary-color};
  --placeholder-color: #{$font3-color};

  display: flex;
  height: var(--height);
  font-size: var(--font-size);
  position: relative;
  width: 100%;
  color: $title-color;

  &_field {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    border: 1px solid $border-color;
    overflow: hidden;
    box-sizing: border-box;
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

  &_text {
    &.placeholder {
      color: var(--placeholder-color);
    }
  }

  &_unfold-icon {
    display: block;
    width: var(--icon-size);
    height: var(--icon-size);
    margin-left: 5px;
    transition: all 0.2s;
    flex-shrink: 1;
    fill: $font-color;
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
    min-width: 60px;
    display: inline-flex;
    flex: 0 0 auto;
    vertical-align: top;
    color: $font2-color;

    &::after {
      position: absolute;
      top: 0;
      right: 0;
      content: '';
    }

    &:last-child::after {
      content: none;
    }
  }

  &_group:last-child {
    color: $title-color;
  }

  &_list {
    width: 100%;
    height: 100%;
    list-style: none;
    margin: 0;
    padding: 0;
    user-select: none;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  &_item {
    padding: 0 0 0 12px;
    height: 45px;
    font-size: 15px;
    cursor: pointer;
    overflow: hidden;
    position: relative;

    &.selected {
      color: $primary-color;
    }

    &::after {
      content: '';
      position: absolute;
      left: 12px;
      width: 100%;
      bottom: 0;
    }

    &.disabled {
      background-color: $background2-color;
      color: $font3-color;
      cursor: not-allowed;
    }

    &-text {
      flex: 1;
      display: inline-flex;
      align-items: center;
      box-sizing: border-box;
      padding-right: 12px;
      height: 100%;
      width: 100%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }

  &.disabled {
    .#{$prefix}-cascader {
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

  &.focus {
    .#{$prefix}-cascader {
      &_field {
        border-color: var(--color);
      }

      &_unfold-icon.arrow--down {
        transform: rotate(180deg);
      }
    }
  }
}

.#{$prefix}-cascader_groups.mobile {
  height: 100%;
}
</style>
