<template>
  <div
    class="ly-cascader"
    :class="[
      { focus: focus, disabled: disabled, 'no-border': !border },
      sizeClassName,
      alignClassName
    ]"
  >
    <div class="ly-cascader_field" @mouseup="onBoxClick">
      <div class="ly-cascader_prepend" v-if="hasPrepend">
        <slot name="prepend"></slot>
      </div>
      <div class="ly-cascader_content">
        <div class="ly-cascader_text">{{ formLabelString }}</div>
        <input
          class="ly-cascader_input"
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
      <icon class="ly-cascader_unfold-icon" type="unfold"></icon>
    </div>
    <div class="ly-cascader_dropdown" ref="dropdown">
      <div class="ly-cascader_groups" @mousedown.prevent="onDropdownTap">
        <ul
          class="ly-cascader_list ly-scroll-bar"
          v-for="(list, listIndex) in dropdown"
          :key="listIndex"
        >
          <li
            class="ly-cascader_item"
            v-for="item in list"
            :key="item.value"
            :selected="item.selected"
            :disabled="item.disabled"
            @click="onItemClick($event, item)"
          >
            <span class="ly-cascader_item-text">{{ item.label }}</span>
            <icon
              class="ly-cascader_item-icon"
              v-if="item.hasChildren"
              type="forward"
            ></icon>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '../Icon/Icon.vue'
import { getHandleEvent } from '../../helpers/events'
import {
  inArray,
  isArray,
  cloneData,
  isStringArray,
  isNumberArray
} from '../../helpers/util'
import {
  parseDateList,
  parseTimeList,
  getDate,
  parseDatetimeList,
  getDateValues,
  getTimeValues,
  getDatetimeValues
} from './cascader-date'
import { parseRegionList } from './cascader-region2'
import { isString, isNumber } from 'util'

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

export default {
  name: 'app-cascader',
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
        return ''
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
        return isArray(value)
      },
      default() {
        return []
      }
    },
    mode: {
      type: String,
      default: ''
    },
    labelKey: {
      type: String,
      default: 'label'
    },
    valueKey: {
      type: String,
      default: 'value'
    },
    childrenKey: {
      type: String,
      default: 'children'
    },
    color: {
      type: String
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
      initMode: MODE_NAMES[0],
      focus: false,
      formValue: [],
      formLabel: [],
      dropdown: [],

      hasPrepend: false,

      separator2: ''
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

      return this.formLabel.join(`${this.separator2}`)
    },
    formValueString() {
      const dateFormat = this.getDateFormat()

      if (dateFormat) {
        return dateFormat
      }

      if (this.formValue.length === 1) {
        return this.formValue[0]
      }

      return this.formValue.join(this.separator2)
    }
  },
  watch: {
    value() {
      if (this.formValue != this.value) {
        !this.setVaildValue(this.value)
      }
    }
  },
  created() {
    // 优先确定模式
    if (inArray(this.mode, MODE_NAMES)) {
      this.initMode = this.mode
    }
    // 初始化分隔符
    this.separator2 = this.separator
    // 初始化value
    if ((isArray(this.value) && this.value.length === 0) || this.value === '') {
      // value没初始设定的情况下
    } else {
      this.setVaildValue(this.getValues(this.value))
    }
  },
  ready() {},
  mounted() {
    if (this.$scopedSlots.prepend) {
      this.hasPrepend = true
    }

    const inputEl = this.getInputEl()

    inputEl._app_component = this
    inputEl._app_type = 'cascader'

    if (this.formValue != this.value) {
      // 说明之前校验没通过
      this.$emit('_change', cloneData(this.formValue))
    }
  },
  updated() {},
  attached() {},
  methods: {
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
        values = value.split(this.separator2)
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

    parseDropdownList(index, parent) {
      if (this.initMode === 'date') {
        return parseDateList(index, parent)
      } else if (this.initMode === 'time') {
        return parseTimeList(index, parent)
      } else if (this.initMode === 'datetime') {
        return parseDatetimeList(index, parent)
      } else if (this.initMode === 'region') {
        return parseRegionList(index, parent)
      }

      // 多项选择
      const getList = options => {
        const list = []

        options.forEach(v => {
          const children = v[this.childrenKey]

          list.push({
            label: v[this.labelKey],
            value: v[this.valueKey],
            hasChildren: children && children.length > 0 ? true : false,
            children
          })
        })

        return list
      }

      if (index === 0) {
        return getList(this.options)
      } else if (parent && parent.hasChildren) {
        return getList(parent.children)
      }

      return []
    },
    onBoxClick() {
      if (!this.disabled) {
        const inputEl = this.getInputEl()

        if (this.focus) {
          inputEl.blur()
        } else {
          this.focus = true
          this.parseDropdown(this.formValue)

          this.$nextTick(() => {
            // 把选择数据展示在选择框内
            if (this.focus) {
              const $selecteds = this.$refs.dropdown.querySelectorAll(
                '[selected]'
              )

              $selecteds.forEach($selected => {
                $selected.scrollIntoView()
              })
            }
          })

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

    getDefaultParseSelected() {
      if (this.initMode === 'date') {
        return getDateValues()
      } else if (this.initMode === 'time') {
        return getTimeValues()
      } else if (this.initMode === 'datetime') {
        return getDatetimeValues()
      }

      return []
    },

    parseDropdown(selecteds) {
      let optionList = this.parseDropdownList(0)

      if (selecteds.length === 0) {
        // 如果没有默认值，尝试获取默认值
        selecteds = this.getDefaultParseSelected()
        // window.console.log(selecteds)
      }

      const menuGroup = []
      const menuLabels = []
      const menuValues = []

      for (let i = 0; i <= selecteds.length; i++) {
        let selected = selecteds[i]
        const menuList = []
        let nextParent = null

        if (optionList) {
          for (let j = 0; j < optionList.length; j++) {
            let optionItem = optionList[j]

            let menuItem = {
              label: optionItem.label,
              value: optionItem.value,
              selected: false,
              hasChildren: optionItem.hasChildren,
              disabled: optionItem.disabled ? true : false
            }

            menuItem.values = menuValues.concat(menuItem.value)
            menuItem.labels = menuLabels.concat(menuItem.label)

            if (selected != null && menuItem.value === selected) {
              // 找到
              menuItem.selected = true

              if (menuItem.hasChildren) {
                nextParent = optionItem
              }
            }

            menuList.push(menuItem)
          }
          menuGroup.push(menuList)
        }

        if (!nextParent) {
          break
        } else {
          optionList = this.parseDropdownList(i + 1, nextParent)
          menuValues.push(nextParent.value)
          menuLabels.push(nextParent.label)
        }
      }

      this.dropdown = menuGroup

      this.$nextTick(() => {
        if (this.$refs.dropdown.lastElementChild.lastElementChild) {
          this.$refs.dropdown.lastElementChild.lastElementChild.scrollIntoView()
        }
      })
    },
    onInputFocus(e) {
      this.$emit(e.type, getHandleEvent(this.$el, e))
    },
    onInputBlur(e) {
      this.focus = false
      const type = 'blur'
      this.$emit(type, getHandleEvent(this.$el, e, {}, type))

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
      return this.$el && this.$el.querySelector('input')
    },

    onChange(e) {
      const detail = {
        value: this.formValueString,
        values: cloneData(this.formValue)
      }

      if (this.initMode === 'date' || this.initMode === 'datetime') {
        detail.date = getDate(detail.value)
      } else if (this.initMode === 'time') {
        detail.date = getDate(new Array(3).concat(detail.value))
      }

      this.$emit('_change', detail.value)

      const type = 'change'
      const handleEvent = getHandleEvent(this.$el, e, detail, type)

      this.$emit(type, handleEvent)
    },

    reset() {
      // 清空为空数组
      if (this.formValue.length !== 0) {
        this.formValue = []
        this.formLabel = []
        this.onChange({})
      }
    },

    /**
     * 选项点击
     */
    onItemClick(e, item) {
      if (item.hasChildren) {
        this.parseDropdown(item.values)
      } else {
        this.formValue = item.values
        this.formLabel = item.labels

        this.getInputEl().blur()
        this.onInputBlur(e)
        this.onChange(e)
      }
    },

    /**
     * 校验value正确性
     */
    setVaildValue(values) {
      const formValue = []
      const formLabel = []

      const deep = (index, parent) => {
        const optionList = this.parseDropdownList(index, parent)
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
          const isVaild = deep(0)

          if (isVaild) {
            this.formValue = formValue
            this.formLabel = formLabel
          } else {
            this.$emit('_change', this.hookFormValue(this.formValue))
            throw new Error('Invalid prop: "value" is not in "options".')
          }

          return isVaild
        }
      }

      return false
    },

    hookFormValue() {
      return this.formValueString
    },

    onDropdownTap() {}
  }
}
</script>

<style>
@import url('../../global.css');

.ly-cascader {
  --height: 30px;
  --font-size: 14px;
  --icon-size: 20px;
  --color: var(--app-main-color);
  --dropdown-color: rgba(9, 187, 7, 0.1);
  --padding-left-right: 12px;

  display: flex;
  height: calc(var(--height) + 2px);
  font-size: var(--font-size);
  position: relative;
  color: var(--app-semi-color);
}

.ly-cascader.size--mini {
  --height: 22px;
  --font-size: 12px;
  --icon-size: 16px;
  --padding-left-right: 8px;
}

.ly-cascader.size--large {
  --height: 38px;
  --font-size: 16px;
  --icon-size: 22px;
}

.ly-cascader_field {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  border: 1px solid var(--app-light-color);
  border-radius: 4px;
  overflow: hidden;
  box-sizing: border-box;
  background-color: #fff;
}

.ly-cascader.no-border .ly-cascader_field {
  border: none;
}

.ly-cascader_field:hover {
  border-color: var(--color);
}

.ly-cascader.disabled .ly-cascader_field,
.ly-cascader.disabled .ly-cascader_field:hover {
  background-color: var(--app-whitesmoke-color);
  border-color: var(--app-light-color);
  cursor: not-allowed;
}

.ly-cascader.focus .ly-cascader_field {
  border-color: var(--color);
  box-shadow: 0 0 3px var(--color);
}

.ly-cascader.no-border.focus .ly-cascader_field {
  box-shadow: none;
}

.ly-cascader_prepend {
  padding: 0 var(--padding-left-right);
}

.ly-cascader_content {
  flex: 1;
  height: 100%;
  position: relative;
}

.ly-cascader_text,
.ly-cascader_input {
  box-sizing: border-box;
  margin: 0;
  height: 100%;
  outline: none;
  height: var(--height);
  line-height: var(--height);
  padding: 0 var(--padding-left-right);
  font-size: var(--font-size);
  border: none;
  cursor: pointer;
  user-select: none;
  color: var(--app-semi-color);
  background: none;
}

.ly-cascader_input {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.ly-cascader.align--center .ly-cascader_text {
  text-align: center;
}

.ly-cascader.align--right .ly-cascader_text {
  text-align: right;
}

.ly-cascader_input::-webkit-input-placeholder {
  color: var(--app-light-color);
}

.ly-cascader_input:disabled {
  cursor: not-allowed;
}

.ly-cascader_unfold-icon {
  display: block;
  width: var(--icon-size);
  height: var(--icon-size);
  margin-right: var(--padding-left-right);
  transition: all 0.2s;
}

.ly-cascader.no-border .ly-cascader_unfold-icon {
  display: none;
}

.ly-cascader.focus .ly-cascader_unfold-icon {
  transform: rotate(180deg);
}

.ly-cascader_dropdown {
  display: none;
  position: absolute;
  left: 0;
  width: 1000%;
  top: calc(100% + 2px);
  z-index: 99999;
}

.ly-cascader_groups {
  position: absolute;
  top: 0;
  left: 0;
  background-color: #fff;
  border: 1px solid var(--app-light-color);
  box-sizing: border-box;
  border-radius: 4px;
  z-index: 100000;
  height: 208px;
  max-width: 600px;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.25);
}

.ly-cascader.focus .ly-cascader_dropdown {
  display: block;
}

.ly-cascader_list {
  float: left;
  min-width: 60px;
  max-width: 200px;
  max-height: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
  user-select: none;
  border-right: 1px solid var(--app-whitesmoke-color);
  flex: 0 0 auto;
  float: none;
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow-x: hidden;
  overflow-y: auto;
}

.ly-cascader_list:last-child {
  border-right: none;
}

.ly-cascader_item {
  display: flex;
  align-items: center;
  height: 32px;
  line-height: 32px;
  font-size: 14px;
  padding: 0 var(--padding-left-right);
  cursor: pointer;
  user-select: none;
  width: 100%;
  box-sizing: border-box;
}

.ly-cascader_item-text {
  text-align: left;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.ly-cascader_item-icon {
  margin-right: calc(var(--padding-left-right) / 2 - var(--padding-left-right));
}

.ly-cascader_item[selected] {
  background-color: var(--app-whitesmoke-color);
}

.ly-cascader_item:hover {
  background-color: var(--dropdown-color);
}

.ly-cascader_item[disabled],
.ly-cascader_item[disabled]:hover {
  background-color: #ffffff;
  color: var(--app-light-color);
  cursor: not-allowed;
}

@media screen and (max-width: 540px) {
  .ly-cascader_dropdown {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
  }

  .ly-cascader_groups {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    top: auto;
    border-radius: 0;
    border: none;
    align-items: center;
    height: 220px;
    box-shadow: 0 -5px 10px rgba(0, 0, 0, 0.25);
  }

  .ly-cascader_item {
    height: 40px;
    line-height: 40px;
    font-size: 16px;
  }
}
</style>
