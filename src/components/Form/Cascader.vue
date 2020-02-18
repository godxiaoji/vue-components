<template>
  <div
    class="cascader"
    :class="[{ focus: focus, disabled: disabled }, sizeClassName]"
  >
    <div class="cascader-input-box" @mouseup="onBoxClick">
      <input
        class="cascader-input"
        type="text"
        readonly
        :disabled="disabled"
        :placeholder="placeholder"
        :value="formLabelString"
        @focus="onInputFocus"
        @blur="onInputBlur"
      />
      <icon class="cascader-unfold-icon" type="unfold"></icon>
    </div>
    <div class="cascader-dropdown" ref="dropdown">
      <div class="cascader-list-group" @mousedown.prevent="onDropdownTap">
        <ul
          class="cascader-list"
          v-for="(list, listIndex) in dropdown"
          :key="listIndex"
        >
          <li
            class="cascader-item"
            v-for="item in list"
            :key="item.value"
            :selected="item.selected"
            :disabled="item.disabled"
            @click="onItemClick($event, item)"
          >
            <span class="cascader-item-text">{{ item.label }}</span>
            <icon
              class="cascader-item-icon"
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
  getRandomNumber,
  cloneData,
  isStringArray
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
// import { parseRegionList } from './cascader-region'

const SIZE_NAMES = ['default', 'mini', 'large']
const MODE_NAMES = [
  'multiSelector',
  'selector',
  'date',
  'time',
  'datetime'
  // 'region'
]

const VISIBILITY_CHANGE_TYPE = 'visibility-change'

export default {
  name: 'app-cascader',
  components: { Icon },
  props: {
    name: {
      type: String,
      default() {
        return 'cascader-' + getRandomNumber()
      }
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    value: {
      validator(value) {
        return isStringArray(value)
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
    }
  },
  data() {
    return {
      initMode: MODE_NAMES[0],
      focus: false,
      formValue: [],
      formLabel: [],
      dropdown: []
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
    formLabelString() {
      const dateFormat = this.getDateFormat()

      if (dateFormat) {
        return dateFormat
      }

      return this.formLabel.join(` ${this.separator} `)
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
    // 初始化value
    if (this.formValue != this.value) {
      this.setVaildValue(this.value)
    } else {
      // value没初始设定的情况下
    }
  },
  ready() {},
  mounted() {
    this.getInputEl()._app_component = this

    if (this.formValue != this.value) {
      // 说明之前校验没通过
      this.$emit('_change', cloneData(this.formValue))
    }
  },
  updated() {},
  attached() {},
  methods: {
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
    },

    parseDropdownList(index, parent) {
      if (this.initMode === 'date') {
        return parseDateList(index, parent)
      } else if (this.initMode === 'time') {
        return parseTimeList(index, parent)
      } else if (this.initMode === 'datetime') {
        return parseDatetimeList(index, parent)
      }
      // else if (this.initMode === 'region') {
      //   return parseRegionList(index, parent)
      // }

      // 多项选择
      const getList = options => {
        const list = []

        options.forEach(v => {
          const children = v[this.childrenKey]

          list.push({
            label: v[this.labelKey],
            value: v[this.valueKey],
            hasChildren: children && children.length > 0,
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
          this.parseDropdown(this.value)

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

            if (selected && menuItem.value === selected) {
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
        this.$refs.dropdown.lastElementChild.lastElementChild.scrollIntoView()
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
      return this.$el && this.$el.firstElementChild.firstElementChild
    },

    onChange(e) {
      this.$emit('_change', cloneData(this.formValue))

      const detail = {
        value: cloneData(this.formValue)
      }

      if (this.initMode === 'date' || this.initMode === 'datetime') {
        detail.date = getDate(detail.value)
        detail.dataFormat = this.getDateFormat()
      } else if (this.initMode === 'time') {
        detail.date = getDate(new Array(3).concat(detail.value))
        detail.dataFormat = this.getDateFormat()
      }

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
      return cloneData(this.formValue)
    },

    onDropdownTap() {}
  }
}
</script>

<style scoped>
@import url('../../global.css');

.cascader {
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

.cascader.size--mini {
  --height: 22px;
  --font-size: 12px;
  --icon-size: 16px;
  --padding-left-right: 8px;
}

.cascader.size--large {
  --height: 38px;
  --font-size: 16px;
  --icon-size: 22px;
}

.cascader-input-box {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  border: 1px solid var(--app-light-color);
  border-radius: 4px;
  overflow: hidden;
  box-sizing: border-box;
}

.cascader-input-box:hover {
  border-color: var(--color);
}

.cascader.disabled .cascader-input-box,
.cascader.disabled .cascader-input-box:hover {
  background-color: var(--app-whitesmoke-color);
  border-color: var(--app-light-color);
  cursor: not-allowed;
}

.cascader.focus .cascader-input-box {
  border-color: var(--color);
  box-shadow: 0 0 3px var(--color);
}

.cascader-input {
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

.cascader-input::-webkit-input-placeholder {
  color: var(--app-light-color);
}

.cascader-input:disabled {
  cursor: not-allowed;
}

.cascader-unfold-icon {
  display: block;
  width: var(--icon-size);
  height: var(--icon-size);
  margin-right: var(--padding-left-right);
  transition: all 0.2s;
}

.cascader.focus .cascader-unfold-icon {
  transform: rotate(180deg);
}

.cascader-dropdown {
  display: none;
  position: absolute;
  left: 0;
  width: 1000%;
  top: calc(100% + 2px);
  z-index: 99999;
}

.cascader-list-group {
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
}

.cascader.focus .cascader-dropdown {
  display: block;
}

.cascader-list {
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

.cascader-list:last-child {
  border-right: none;
}

.cascader-item {
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

.cascader-item-text {
  text-align: left;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.cascader-item-icon {
  margin-right: calc(var(--padding-left-right) / 2 - var(--padding-left-right));
}

.cascader-item[selected] {
  background-color: var(--app-whitesmoke-color);
}

.cascader-item:hover {
  background-color: var(--dropdown-color);
}

.cascader-item[disabled],
.cascader-item[disabled]:hover {
  background-color: #ffffff;
  color: var(--app-light-color);
  cursor: not-allowed;
}

@media screen and (max-width: 540px) {
  .cascader-dropdown {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
  }

  .cascader-list-group {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    top: auto;
    border-radius: 0;
    border: none;
    align-items: center;
  }

  .cascader-item {
    height: 48px;
    line-height: 48px;
    font-size: 16px;
  }
}
</style>
