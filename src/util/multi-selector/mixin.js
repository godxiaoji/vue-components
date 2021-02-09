import { inArray, isArray, cloneData, isSameArray } from '../../helpers/util'
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
      isCascade: true,
      extactData: []
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
  emits: ['change', 'update:modelValue'],
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
          this.cols[colIndex][index].selected = true
        } else {
          this.cols[colIndex][index].selected = false
        }
      })
    },

    addCache(item) {
      this.cacheValue.push(item.value)
      this.cacheLabel.push(item.label)
      this.extactData.push(cloneData(item.extactData))
    },

    /**
     * 更新多列展示效果
     */
    updateCols(selecteds) {
      this.cacheValue = []
      this.cacheLabel = []
      this.extactData = []

      if (this.options2.length === 0) {
        this.cols = []
        return []
      }

      const cols = cloneData(
        isArray(this.options2[0]) ? this.options2 : [this.options2]
      )

      cols.forEach((list, listIndex) => {
        let hasSelected = false

        for (let i = 0; i < list.length; i++) {
          const item = list[i]
          if (item.value == selecteds[listIndex]) {
            hasSelected = true
            item.selected = true
            this.addCache(item)
            break
          }
        }

        if (!hasSelected) {
          if (list[0]) {
            const firstItem = list[0]
            firstItem.selected = true
            this.addCache(firstItem)
          }
        }
      })

      this.cols = cols

      return cols
    },

    /**
     * 级联更新模式
     * @param {Array} selecteds
     */
    updateCascadeCols(selecteds) {
      this.cacheValue = []
      this.cacheLabel = []
      this.extactData = []

      let optionList = this.parseColList(0)

      if (selecteds.length === 0) {
        // 如果没有默认值，尝试获取默认值
        selecteds = this.getDefaultSelecteds()
      }

      const cols = []
      const menuLabels = []
      const menuValues = []
      let lastGroupSelected = false

      for (let i = 0; i <= selecteds.length; i++) {
        let selected = selecteds[i]
        const colList = []
        let nextParent = null
        lastGroupSelected = false

        if (optionList) {
          for (let j = 0; j < optionList.length; j++) {
            let optionItem = optionList[j]

            const colItem = {
              label: optionItem.label,
              value: optionItem.value,
              selected: false,
              disabled: optionItem.disabled,
              hasChildren: optionItem.hasChildren
            }

            colItem.values = menuValues.concat(colItem.value)
            colItem.labels = menuLabels.concat(colItem.label)

            if (selected != null && colItem.value === selected) {
              // 找到
              colItem.selected = true
              lastGroupSelected = true

              if (colItem.hasChildren) {
                nextParent = optionItem
              }

              this.addCache(optionItem)
            }

            colList.push(colItem)
          }
          cols.push(colList)
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
          cols[cols.length - 1][0].selected = true
          this.addCache(lastGroupFirstItem)
        }

        while (lastGroupFirstItem) {
          if (lastGroupFirstItem.hasChildren) {
            menuValues.push(lastGroupFirstItem.value)
            menuLabels.push(lastGroupFirstItem.label)

            optionList = this.parseColList(i++, lastGroupFirstItem)

            const colList = []

            if (optionList) {
              for (let j = 0; j < optionList.length; j++) {
                const optionItem = optionList[j]
                const colItem = {
                  label: optionItem.label,
                  value: optionItem.value,
                  selected: j === 0,
                  disabled: optionItem.disabled,
                  hasChildren: optionItem.hasChildren
                }

                colItem.values = menuValues.concat(colItem.value)
                colItem.labels = menuLabels.concat(colItem.label)

                if (colItem.selected) {
                  this.addCache(optionItem)
                }

                colList.push(colItem)
              }
              cols.push(colList)
            }

            lastGroupFirstItem = optionList[0]
          } else {
            break
          }
        }
      }

      this.cols = cols

      return cols
    },

    update(selecteds) {
      const cols = !this.isCascade
        ? this.updateCols(selecteds)
        : this.updateCascadeCols(selecteds)

      this.afterUpdate(cols)
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
        label: cloneData(this.formLabel),
        extactData: cloneData(this.extactData)
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
