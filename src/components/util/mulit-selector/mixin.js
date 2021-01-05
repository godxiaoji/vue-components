import { inArray, isArray, cloneData, isSameArray } from '../../../helpers/util'
import {
  getDefaultSelecteds,
  parseDropdownList,
  array2String,
  getDefaultFieldNames,
  MODE_NAMES,
  validateValues,
  getFormatOptions
} from './'
import propsMixin from './props-mixin'

export default {
  mixins: [propsMixin],
  data() {
    return {
      mode: MODE_NAMES[0],
      formValue: [],
      formLabel: [],
      cacheValue: [],
      cacheLabel: [],
      cols: [],

      fieldNames2: getDefaultFieldNames(),
      separator: '',
      options2: [],
      isCascade: true
    }
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
    modelValue(val) {
      this.updateValue(val)
    },
    options() {
      this.updateOptions(this.formValue)
    },
    fieldNames() {
      this.updateOptions(this.formValue)
    }
  },
  model: {
    prop: 'modelValue',
    event: '_change'
  },
  created() {
    // 优先确定模式
    if (inArray(this.initialMode, MODE_NAMES)) {
      this.mode = this.initialMode
    }
    // 初始化分隔符
    this.separator = this.initialSeparator
    // 初始化value
    this.updateOptions(this.modelValue)
  },
  methods: {
    updateValue(val, forceUpdate = false) {
      const { vaild, value } = this.validateValues(val)

      if ((vaild && !isSameArray(value, this.formValue)) || forceUpdate) {
        this.update(value)

        if (value.length > 0 || this.picker) {
          this.formValue = this.cacheValue
          this.formLabel = this.cacheLabel
        } else {
          this.formValue = []
          this.formLabel = []
        }
      }

      return this.getDetail()
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
        this.cacheValue = []
        this.cacheLabel = []
        return []
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
          if (item.value == selecteds[listIndex]) {
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

      this.cacheValue = values
      this.cacheLabel = labels

      return cols
    },

    /**
     * 级联更新模式
     * @param {Array} selecteds
     */
    updateCascadeCols(selecteds) {
      //
      let optionList = this.parseColList(0)

      if (selecteds.length === 0) {
        // 如果没有默认值，尝试获取默认值
        selecteds = this.getDefaultSelecteds()
      }

      const menuGroup = []
      const menuLabels = []
      const menuValues = []
      const labels = []
      const values = []
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

              labels.push(menuItem.label)
              values.push(menuItem.value)
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

      if (!this.cascader && !lastGroupSelected) {
        let i = selecteds.length + 1

        let lastGroupFirstItem = optionList[0]

        if (lastGroupFirstItem) {
          const menuItem = menuGroup[menuGroup.length - 1][0]
          menuItem.selected = true
          labels.push(menuItem.label)
          values.push(menuItem.value)
        }

        while (lastGroupFirstItem) {
          if (lastGroupFirstItem.hasChildren) {
            menuValues.push(lastGroupFirstItem.value)
            menuLabels.push(lastGroupFirstItem.label)

            optionList = this.parseColList(i++, lastGroupFirstItem)

            const menuList = []

            if (optionList) {
              for (let j = 0; j < optionList.length; j++) {
                const optionItem = optionList[j]
                const menuItem = {
                  label: optionItem.label,
                  value: optionItem.value,
                  selected: j === 0,
                  disabled: optionItem.disabled,
                  hasChildren: optionItem.hasChildren
                }

                menuItem.values = menuValues.concat(menuItem.value)
                menuItem.labels = menuLabels.concat(menuItem.label)

                if (menuItem.selected) {
                  labels.push(menuItem.label)
                  values.push(menuItem.value)
                }

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

      this.cacheValue = values
      this.cacheLabel = labels

      this.cols = menuGroup

      return menuGroup
    },

    update(selecteds) {
      const menuGroup = !this.isCascade
        ? this.updateCols(selecteds)
        : this.updateCascadeCols(selecteds)

      this.afterUpdate(menuGroup)
    },

    updateOptions(val) {
      const { options, fieldNames, isCascade } = getFormatOptions(
        this.options,
        this.fieldNames,
        this.mode,
        !!this.cascader
      )

      this.options2 = options
      this.fieldNames2 = fieldNames
      this.isCascade = isCascade

      // 顺便更新一下values
      this.updateValue(val, true)
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

      return this.cascader ? [] : getFirstSelected()
    },

    getDetail() {
      const detail = {
        valueString: array2String(this.formValue, this.mode, this.separator),
        labelString: array2String(this.formLabel, this.mode, this.separator),
        value: cloneData(this.formValue),
        label: cloneData(this.formLabel)
      }

      return detail
    },
    /**
     * 校验value正确性
     */
    validateValues(values) {
      return validateValues(
        values,
        this.options2,
        this.mode,
        this.separator,
        this.isCascade
      )
    }
  }
}
