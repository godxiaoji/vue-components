<template>
  <div :class="[prefix + '-picker-view', { disabled }]" ref="picker">
    <div :class="[prefix + '-picker-view_cols']">
      <div
        :class="[prefix + '-picker-view_col']"
        v-for="(list, listIndex) in cols"
        :key="listIndex"
      >
        <ul
          :class="[prefix + '-picker-view_list']"
          :data-index="listIndex"
          @scroll.stop="onListScroll"
        >
          <li
            :class="[
              prefix + '-picker-view_item',
              { selected: item.selected, disabled: item.disabled }
            ]"
            v-for="(item, index) in list"
            :key="item.value"
            :selected="item.selected"
            :disabled="item.disabled"
            :data-index="index"
          >
            {{ item.label }}
          </li>
        </ul>
      </div>
    </div>
    <input
      type="hidden"
      :name="formName"
      :value="formValueString"
      :disabled="disabled"
    />
    <div :class="[prefix + '-picker-view_disabled']" v-if="disabled"></div>
  </div>
</template>

<script>
import { frameTo } from '../../helpers/animation'
import {
  inArray,
  isArray,
  cloneData,
  isStringNumberMixArray,
  isSameArray,
  isString,
  isNumber,
  isObject
} from '../../helpers/util'
import {
  getDate,
  dateString2Array,
  timeString2Array,
  datetimeString2Array,
  getDefaultSelecteds,
  parseDropdownList,
  array2String,
  string2Array,
  parseOptions,
  getDefaultFieldNames,
  MODE_NAMES
} from '../Cascader/util'
import { SDKKey } from '../../config'
import formMixin from '../util/form-mixin'

export default {
  name: SDKKey + '-picker-view',
  components: {},
  mixins: [formMixin],
  props: {
    name: {
      type: String,
      default: ''
    },
    value: {
      validator(value) {
        return (
          isStringNumberMixArray(value) || isString(value) || isNumber(value)
        )
      },
      default() {
        return ''
      }
    },
    formatString: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    initialSeparator: {
      type: String,
      default: '/'
    },
    options: {
      type: Array,
      default() {
        return []
      }
    },
    initialMode: {
      type: String,
      default: MODE_NAMES[0]
    },
    fieldNames: {
      type: Object,
      default() {
        return getDefaultFieldNames()
      }
    }
  },
  data() {
    return {
      prefix: SDKKey,

      mode: MODE_NAMES[0],
      formValue: [],
      formLabel: [],
      defaultValue: [],
      cols: [],

      fieldNames2: getDefaultFieldNames(),
      separator: '',
      options2: [],
      isCascade: true,
      isMultiSelector: false
    }
  },
  model: {
    prop: 'value',
    event: '_change'
  },
  computed: {
    formLabelString() {
      return array2String(this.formLabel, this.mode, this.separator)
    },
    formValueString() {
      return array2String(this.formValue, this.mode, this.separator)
    }
  },
  watch: {
    value(val) {
      const values = this.getValues(val)

      if (this.validateValues(values)) {
        this.update(values)
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
    if (inArray(this.initialMode, MODE_NAMES)) {
      this.mode = this.initialMode
    }
    if (this.mode === MODE_NAMES[0]) {
      this.isMultiSelector = true
    }
    // 初始化分隔符
    this.separator = this.initialSeparator
    // 初始化value
    this.updateOptions()

    this.defaultValue = cloneData(this.formValue)
  },
  ready() {},
  mounted() {
    const $input = this.getInputEl()

    $input._app_component = this
    $input._app_type = 'picker'
    $input.defaultValue = this.formValueString
  },
  updated() {},
  attached() {},
  methods: {
    getInputEl() {
      return this.$el && this.$el.lastElementChild
    },
    /**
     * 尝试将其他类型的数据转为数组
     */
    getValues(value) {
      return string2Array(value, this.mode, this.separator)
    },

    /**
     * 解析列list
     * @param {Number} index
     * @param {Object} parent
     */
    parseColList(index, parent) {
      if (index === 0) {
        parent = this.options2
      }
      return parseDropdownList(this.mode, index, parent)
    },
    /**
     * 获取默认选择数据
     * @summary 主要用于一些日期啥的，可以默认当天
     */
    getDefaultSelecteds() {
      const selecteds = getDefaultSelecteds(this.mode)

      if (selecteds.length > 0) {
        return selecteds
      }

      const getFirstSelected = (values = [], parent) => {
        const optionItem = this.parseColList(values.length, parent)[0]

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

    updateOptions() {
      if (this.isMultiSelector) {
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

        // 判断是否级联模式
        let isCascade = false
        for (let i = 0; i < this.options2.length; i++) {
          if (this.options2[i].children && this.options2[i].children[0]) {
            isCascade = true
            break
          }
        }

        this.isCascade = isCascade
      }

      // 顺便更新一下values
      let values
      if (
        (isArray(this.value) && this.value.length === 0) ||
        this.value === ''
      ) {
        // value没初始设定的情况下
        values = []
      } else {
        values = this.getValues(this.value)
        if (!this.validateValues(values)) {
          values = []
        }
      }

      this.update(values)

      // if (!isSameArray(values, this.formValue)) {
      //   this.$emit('reset', this.getDetail())
      //   this.defaultValue = this.formValue
      // }
    },

    /**
     * 非级联更新选择项
     */
    updateColSelected(colIndex, current) {
      this.cols[colIndex].forEach((item, index) => {
        if (index === current) {
          this.formValue[colIndex] = item.value
          this.formLabel[colIndex] = item.label
          this.$set(this.cols[colIndex][index], 'selected', true)
        } else {
          this.$set(this.cols[colIndex][index], 'selected', false)
        }
      })
    },

    /**
     * 更新多列展示效果
     */
    updateCols(selecteds) {
      if (this.options2.length === 0) {
        this.cols = []
        this.formLabel = []
        this.formValue = []
        return
      }

      const cols = cloneData(
        isArray(this.options2[0]) ? this.options2 : [this.options2]
      )

      const values = []
      const labels = []

      cols.forEach((list, listIndex) => {
        let hasSelected = false

        for (let i = 0; i < list.length; i++) {
          const item = list[i]
          if (item.value === selecteds[listIndex]) {
            hasSelected = true
            item.selected = true
            values.push(item.value)
            labels.push(item.label)
            break
          }
        }

        if (!hasSelected) {
          if (list[0]) {
            const firstItem = list[0]
            firstItem.selected = true
            values.push(firstItem.value)
            labels.push(firstItem.label)
          }
        }
      })

      this.cols = cols
      this.formValue = values
      this.formLabel = labels
    },

    update(selecteds) {
      if (!this.isCascade) {
        this.updateCols(selecteds)
        return
      }

      // 级联更新模式
      let optionList = this.parseColList(0)

      if (selecteds.length === 0) {
        // 如果没有默认值，尝试获取默认值
        selecteds = this.getDefaultSelecteds()
        // console.log(selecteds)
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
              disabled: optionItem.disabled,
              hasChildren: optionItem.hasChildren
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
          optionList = this.parseColList(i + 1, nextParent)
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

            optionList = this.parseColList(i++, lastGroupFirstItem)

            const menuList = []

            if (optionList) {
              for (let j = 0; j < optionList.length; j++) {
                let optionItem = optionList[j]

                let menuItem = {
                  label: optionItem.label,
                  value: optionItem.value,
                  selected: j === 0,
                  disabled: optionItem.disabled,
                  hasChildren: optionItem.hasChildren
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

      this.cols = menuGroup

      // 设置默认值
      const lastGroup = menuGroup[menuGroup.length - 1]
      for (let i = 0; i < lastGroup.length; i++) {
        if (lastGroup[i].selected) {
          this.formValue = lastGroup[i].values
          this.formLabel = lastGroup[i].labels
          break
        }
      }

      this.$nextTick(() => {
        // 把选择数据展示在选择框内
        const $picker = this.$refs.picker

        if ($picker) {
          const $lists = $picker.querySelectorAll(`.${SDKKey}-picker-view_list`)
          const $firstList = $lists[0]

          if ($firstList && $firstList.firstElementChild) {
            const itemHeight = $firstList.firstElementChild.clientHeight
            const $selecteds = $picker.querySelectorAll('[selected]')
            $selecteds.forEach(($selected, index) => {
              const itemIndex = parseInt($selected.dataset.index)
              $lists[index].scrollTop = itemHeight * itemIndex
            })
          }
        }
      })
    },

    onChange() {
      this.$emit('_change', this.hookFormValue())
      this.$emit('change', this.getDetail())

      this.validateAfterEventTrigger('change', this.hookFormValue())
    },

    getDetail() {
      const detail = {
        valueString: array2String(this.formValue, this.mode, this.separator),
        labelString: array2String(this.formLabel, this.mode, this.separator),
        value: cloneData(this.formValue),
        label: cloneData(this.formLabel)
      }

      if (this.mode === 'date' || this.mode === 'datetime') {
        detail.date = getDate(detail.value)
      } else if (this.mode === 'time') {
        detail.date = getDate(new Array(3).concat(detail.value))
      }

      return detail
    },

    reset() {
      this.update(this.defaultValue)

      if (!isSameArray(this.defaultValue, this.formValue)) {
        this.$emit('reset', this.getDetail())
        this.defaultValue = this.getDetail().valueString
      }
    },

    /**
     * 校验value正确性
     */
    validateValues(values) {
      if (isString(values)) {
        if (this.mode === 'date') {
          values = dateString2Array(values)
        } else if (this.mode === 'time') {
          values = timeString2Array(values)
        } else if (this.mode === 'datetime') {
          values = datetimeString2Array(values)
        } else if (!values) {
          values = []
        } else {
          values = values.split(this.separator)
        }
      }

      if (!isArray(values)) {
        return false
      }

      if (values.length === 0) {
        // 空数组也算符合
        return true
      }

      /**
       * 非级联检查
       */
      const validateCols = () => {
        const cols = isArray(this.options2[0]) ? this.options2 : [this.options2]
        let selectCount = 0

        cols.forEach((list, colIndex) => {
          for (let i = 0; i < list.length; i++) {
            const item = list[i]
            if (item.value == values[colIndex]) {
              selectCount++
              break
            }
          }
        })

        return selectCount === cols.length
      }

      const deep = (index, parent) => {
        const optionList = this.parseColList(index, parent)
        const value = values[index]

        for (let i = 0; i < optionList.length; i++) {
          const optionItem = optionList[i]

          if (optionItem.value === value) {
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

      const isVaild = this.isCascade ? deep(0) : validateCols()

      if (!isVaild) {
        throw new Error('Invalid prop: "value" is not in "options".')
      }

      return isVaild
    },

    hookFormValue() {
      const { value, valueString } = this.getDetail()

      return this.formatString ? valueString : value
    },

    onListScroll(e) {
      const $list = e.currentTarget

      if ($list.scrolling) {
        return
      }

      clearTimeout($list.scrollTimer)

      const $items = $list.children
      const itemHeight = $list.firstElementChild.clientHeight
      const groupIndex = parseInt($list.dataset.index)
      let current = Math.round($list.scrollTop / itemHeight)
      let oldSelectIndex = 0

      for (let i = 0; i < $items.length; i++) {
        if ($items[i].getAttribute('selected') === 'selected') {
          oldSelectIndex = i
          break
        }
      }

      let isChange = current !== oldSelectIndex

      if (isChange) {
        while (
          $items[current].getAttribute('disabled') === 'disabled' &&
          current !== oldSelectIndex
        ) {
          // 处理disabled 不能选的问题
          if (current > oldSelectIndex) {
            current--
          } else {
            current++
          }
        }
      }

      isChange = current !== oldSelectIndex

      const item = this.cols[groupIndex][current]

      if (current * itemHeight === $list.scrollTop && !isChange) {
        // 如果一致 就不需要修正了
      } else {
        $list.scrollTimer = setTimeout(() => {
          // $list.scrollTop = current * itemHeight
          $list.scrolling = true

          frameTo({
            from: $list.scrollTop,
            to: current * itemHeight,
            duration: 100,
            progress(res) {
              $list.scrollTop = res.current
            },
            complete() {
              $list.scrolling = false
            }
          })

          if (isChange) {
            if (this.isCascade) {
              this.update(item.values)
            } else {
              this.updateColSelected(groupIndex, current)
            }

            this.onChange()
          }
        }, 400)
      }
    }
  }
}
</script>

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-picker-view {
  position: relative;
  background: #fff;
  color: $title-color;

  &.disabled {
    opacity: 0.2;
  }

  &_disabled {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    cursor: not-allowed;
  }

  &_cols {
    width: 100%;
    height: 250px;
    display: flex;
    flex-wrap: nowrap;
  }

  &_col {
    position: relative;
    height: 100%;
    flex: 1;

    &::before {
      content: '';
      position: absolute;
      top: 100px;
      left: 0;
      height: 0;
      width: 100%;
      box-sizing: border-box;
      border-bottom: 1px solid $border-color;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: 100px;
      left: 0;
      height: 0;
      width: 100%;
      box-sizing: border-box;
      border-top: 1px solid $border-color;
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
    cursor: grab;
  }

  &_item {
    padding: 0 12px;
    cursor: pointer;
    user-select: none;
    box-sizing: border-box;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    color: $font3-color;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-align: center;

    &:first-child {
      margin-top: 100px;
    }

    &:last-child {
      margin-bottom: 100px;
    }

    &.selected {
      color: $title-color;
    }

    &.disabled {
      color: $divider-color;
    }
  }
}
</style>
