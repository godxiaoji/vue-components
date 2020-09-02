<template>
  <div
    :class="[
      prefix + '-cascader',
      {
        focus: focus,
        disabled: disabled,
        'no-border': !border,
        picker: picker
      },
      sizeClassName,
      alignClassName
    ]"
  >
    <div :class="[prefix + '-cascader_field']" @mouseup="onBoxClick">
      <div :class="[prefix + '-cascader_prepend']" v-if="hasPrepend">
        <slot name="prepend"></slot>
      </div>
      <div :class="[prefix + '-cascader_content']">
        <div
          :class="[
            prefix + '-cascader_text',
            { placeholder: !formLabelString }
          ]"
        >{{ formLabelString || placeholder }}</div>
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
      <icon :class="[prefix + '-cascader_unfold-icon']" :type="picker ? 'forward' : 'unfold'"></icon>
    </div>
    <div :class="[prefix + '-cascader_dropdown']" ref="dropdown">
      <div :class="[prefix + '-cascader_tools']">
        <a :class="[prefix + '-cascader_cancel-button']" href="javascript:;">取消</a>
        <span :class="[prefix + '-cascader_ok-group']" @mousedown.prevent="onDropdownTap">
          <a
            :class="[prefix + '-cascader_ok-button']"
            href="javascript:;"
            @click="onOkButtonClick"
          >完成</a>
        </span>
      </div>
      <div
        ref="dropdownGroups"
        :class="[prefix + '-cascader_groups']"
        @mousedown.prevent="onDropdownTap"
        @scroll.stop="onDropdownTap"
      >
        <div
          :class="[prefix + '-cascader_group']"
          v-for="(list, listIndex) in dropdown"
          :key="listIndex"
        >
          <ul
            :class="[prefix + '-cascader_list', prefix + '-scroll-bar']"
            :data-index="listIndex"
            @scroll.stop="onDropdownScroll"
          >
            <li
              :class="[prefix + '-cascader_item']"
              v-for="(item, index) in list"
              :key="item.value"
              :selected="item.selected"
              :disabled="item.disabled"
              :data-index="index"
              @click="onItemClick($event, item)"
            >
              <span :class="[prefix + '-cascader_item-text']">
                {{
                item.label
                }}
              </span>
              <icon
                :class="[prefix + '-cascader_item-icon']"
                v-if="item.hasChildren"
                type="forward"
                :size="16"
              ></icon>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '../Icon/Icon.vue'
import { frameTo } from '../../helpers/animation'
import { CustomEvent } from '../../helpers/events'
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
  getDatetimeValues,
  dateString2Array,
  timeString2Array,
  datetimeString2Array
} from './cascader-date'
import { parseRegionList } from './cascader-region2'
import { isString, isNumber } from 'util'
import { SDKKey } from '../../config'

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
  name: SDKKey + '-cascader',
  components: { Icon },
  props: {
    picker: {
      type: Boolean,
      default: false
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
      default: 'select'
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
      prefix: SDKKey,

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
    },
    focus() {
      if (this.focus) {
        document.documentElement.classList.add(SDKKey + '-noscroll')
      } else {
        document.documentElement.classList.remove(SDKKey + '-noscroll')
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

    /**
     * 解析下拉groups
     * @param {Number} index
     * @param {Object} parent
     */
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
          this.parseDropdown(this.formValue)

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
    /**
     * 获取默认选择数据
     * @summary 主要用于一些日期啥的，可以默认当天
     */
    getDefaultParseSelected() {
      if (this.initMode === 'date') {
        return getDateValues()
      } else if (this.initMode === 'time') {
        return getTimeValues()
      } else if (this.initMode === 'datetime') {
        return getDatetimeValues()
      }

      const getFirstSelected = (values = [], parent) => {
        const optionItem = this.parseDropdownList(values.length, parent)[0]

        if (optionItem) {
          values.push(optionItem.value)

          if (optionItem.hasChildren) {
            return getFirstSelected(values, optionItem)
          }
        }

        return values
      }

      return getFirstSelected()
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
      let lastGroupSelected = false

      for (let i = 0; i <= selecteds.length; i++) {
        let selected = selecteds[i]
        const menuList = []
        let nextParent = null
        lastGroupSelected = false

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
              lastGroupSelected = true

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

      if (!lastGroupSelected) {
        let i = selecteds.length + 1

        let lastGroupFirstItem = optionList[0]

        if (lastGroupFirstItem) {
          menuGroup[menuGroup.length - 1][0].selected = true
        }

        while (lastGroupFirstItem) {
          if (lastGroupFirstItem.hasChildren) {
            menuValues.push(lastGroupFirstItem.value)
            menuLabels.push(lastGroupFirstItem.label)

            optionList = this.parseDropdownList(i++, lastGroupFirstItem)

            const menuList = []

            if (optionList) {
              for (let j = 0; j < optionList.length; j++) {
                let optionItem = optionList[j]

                let menuItem = {
                  label: optionItem.label,
                  value: optionItem.value,
                  selected: j === 0,
                  hasChildren: optionItem.hasChildren,
                  disabled: optionItem.disabled ? true : false
                }

                menuItem.values = menuValues.concat(menuItem.value)
                menuItem.labels = menuLabels.concat(menuItem.label)

                menuList.push(menuItem)
              }
              menuGroup.push(menuList)
            }

            lastGroupFirstItem = optionList[0]
          } else {
            break
          }
        }
      }

      this.dropdown = menuGroup

      this.$nextTick(() => {
        if (this.$refs.dropdownGroups) {
          this.$refs.dropdownGroups.scrollLeft = 10000
        }

        // 把选择数据展示在选择框内
        if (this.focus) {
          const $dropdown = this.$refs.dropdown
          const $lists = $dropdown.querySelectorAll(`.${SDKKey}-cascader_list`)
          const $firstList = $lists[0]

          if ($firstList && $firstList.firstElementChild) {
            const listHeight = $firstList.clientHeight
            const itemHeight = $firstList.firstElementChild.clientHeight
            const $selecteds = $dropdown.querySelectorAll('[selected]')
            $selecteds.forEach(($selected, index) => {
              const itemIndex = parseInt($selected.dataset.index)
              if (this.picker) {
                $lists[index].scrollTop = itemHeight * itemIndex
              } else {
                if (itemHeight * (itemIndex + 1) >= listHeight) {
                  // 不在范围内
                  $lists[index].scrollTop =
                    itemHeight * (itemIndex + 1) - listHeight
                }
                // $selected.scrollIntoView(false)
              }
            })
          }
        }
      })
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

    onChange() {
      const detail = {
        value: this.formValueString,
        values: cloneData(this.formValue)
      }

      if (this.initMode === 'date' || this.initMode === 'datetime') {
        detail.date = getDate(detail.values)
      } else if (this.initMode === 'time') {
        detail.date = getDate(new Array(3).concat(detail.values))
      }

      this.$emit('_change', detail.value)

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
     * 选项点击
     */
    onItemClick(e, item) {
      if (!this.picker) {
        if (item.hasChildren) {
          this.parseDropdown(item.values)
        } else {
          this.formValue = item.values
          this.formLabel = item.labels

          this.getInputEl().blur()
          this.onChange()
        }
      }
    },

    /**
     * 完成按钮点击
     */
    onOkButtonClick() {
      const $dropdown = this.$refs.dropdown
      const $lists = $dropdown.querySelectorAll(`.${SDKKey}-cascader_list`)
      const $lastList = $lists[$lists.length - 1]
      if ($lastList && $lastList.firstElementChild) {
        const itemHeight = $lastList.firstElementChild.clientHeight
        const lastScrollTop = $lastList.scrollTop
        const current = Math.round(lastScrollTop / itemHeight)

        if (current != null) {
          const item = this.dropdown[this.dropdown.length - 1][current]

          this.formValue = item.values
          this.formLabel = item.labels

          this.getInputEl().blur()
          this.onChange()
        }
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

    onDropdownTap() {},

    onDropdownScroll(e) {
      if (!this.picker) {
        return
      }

      const target = e.currentTarget
      const itemHeight = target.firstElementChild.clientHeight
      const groupIndex = parseInt(target.dataset.index)
      const current = Math.round(target.scrollTop / itemHeight)
      const item = this.dropdown[groupIndex][current]

      clearTimeout(target.scrollTimer)

      if (
        current * itemHeight === target.scrollTop &&
        target.children[current].getAttribute('selected') === 'selected'
      ) {
        // 如果一致 就不需要修正了
      } else {
        target.scrollTimer = setTimeout(() => {
          // target.scrollTop = current * itemHeight

          frameTo({
            from: target.scrollTop,
            to: current * itemHeight,
            duration: 100,
            progress(res) {
              target.scrollTop = res.current
            },
            complete: () => {}
          })

          this.parseDropdown(item.values)
        }, 300)
      }
    }
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
  --dropdown-color: rgba(9, 187, 7, 0.1);
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

  &_prepend {
    padding: 0 var(--padding-left-right);
  }

  &_content {
    flex: 1;
    height: 100%;
    position: relative;
  }

  &_text,
  &_input {
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
    color: $semi-color;
    background: none;
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
  }

  &_dropdown {
    display: none;
    position: absolute;
    left: 0;
    top: calc(100% + 2px);
    z-index: 99999;
  }

  &_tools {
    display: none;
  }

  &_groups {
    background-color: #fff;
    border: 1px solid $light-color;
    box-sizing: border-box;
    border-radius: 4px;
    z-index: 100000;
    height: 208px;
    max-width: 600px;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.25);
    z-index: 0;
  }

  &_group {
    float: left;
    position: relative;
    height: 100%;
    z-index: 1;
    min-width: 60px;
    max-width: 200px;
    display: inline-flex;
    flex: 0 0 auto;
  }

  &_list {
    width: 100%;
    max-height: 100%;
    list-style: none;
    margin: 0;
    padding: 0;
    user-select: none;
    border-right: 1px solid $whitesmoke-color;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;

    &:last-child {
      border-right: none;
    }
  }

  &_item {
    display: flex;
    align-items: center;
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    padding: 0 var(--padding-left-right);
    cursor: pointer;
    user-select: none;
    box-sizing: border-box;

    &[selected] {
      background-color: $whitesmoke-color;
    }

    &:hover {
      background-color: var(--dropdown-color);
    }

    &[disabled],
    &[disabled]:hover {
      background-color: #ffffff;
      color: $light-color;
      cursor: not-allowed;
    }
  }

  &_item-text {
    text-align: left;
    flex: 1;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  &_item-icon {
    margin-right: calc(
      var(--padding-left-right) / 2 - var(--padding-left-right)
    );
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

      &_dropdown {
        display: block;
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

  &.picker {
    .#{$prefix}-cascader {
      &_dropdown {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.25);
      }

      &_tools {
        position: absolute;
        left: 0;
        bottom: 250px;
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: $whitesmoke-color;
        box-shadow: 0 -5px 10px rgba(0, 0, 0, 0.25);
      }

      &_ok-group {
        flex: 1;
        height: 100%;
        display: flex;
        justify-content: flex-end;
      }

      &_cancel-button,
      &_ok-button {
        display: inline-flex;
        align-items: center;
        height: 100%;
        padding: 0 var(--padding-left-right);
        text-decoration: none;
        color: $grey-color;
      }

      &_ok-button {
        color: $main-color;
      }

      &_groups {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        top: auto;
        border-radius: 0;
        border: none;
        max-width: 100%;
        height: 250px;
        transition: all 0.2s;
        text-align: center;
      }

      &_groups,
      &_list {
        &::before {
          content: '';
          position: absolute;
          top: 100px;
          left: 0;
          height: 0;
          width: 100%;
          box-sizing: border-box;
          border-bottom: 1px solid $whitesmoke-color;
          background-image: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.8),
            rgba(255, 255, 255, 0.2)
          );
        }

        &::after {
          content: '';
          position: absolute;
          bottom: 100px;
          left: 0;
          height: 0;
          width: 100%;
          box-sizing: border-box;
          border-top: 1px solid $whitesmoke-color;
          background-image: linear-gradient(
            to top,
            rgba(255, 255, 255, 0.8),
            rgba(255, 255, 255, 0.2)
          );
        }
      }

      &_group {
        float: none;
        max-width: 300px;
        justify-content: center;
      }

      &_item {
        height: 50px;
        line-height: 50px;
        font-size: 16px;
        color: $light-color;

        &:first-child {
          margin-top: 100px;
        }

        &:last-child {
          margin-bottom: 100px;
        }

        &[selected],
        &:hover {
          background-color: #ffffff;
          color: $semi-color;
        }
      }

      &_item-text {
        text-align: center;
      }

      &_item-icon {
        display: none;
      }
    }

    &.focus {
      .#{$prefix}-cascader {
        &_unfold-icon {
          transform: rotate(0);
        }
      }
    }
  }
}
</style>
