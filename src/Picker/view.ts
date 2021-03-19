import { computed, reactive, ref, watch } from 'vue'
import { isArray, cloneData, isSameArray } from '@/helpers/util'
import {
  getDefaultSelecteds,
  array2String,
  MODE_NAMES,
  validateValues,
  getFormatOptions,
  getColRows,
  getDateTimeRows,
  updateArray
} from '@/Picker/util'
import { getEnumsValue } from '@/helpers/validator'
import type {
  ColRow,
  Labels,
  ModeNames,
  OptionItem,
  Values,
  ExtraData
} from './types'
import type { UseProps } from '../helpers/types'

export const viewEmits = ['change', 'update:modelValue']

export function useView(
  props: UseProps,
  name: string,
  afterUpdate: () => void
) {
  const mode = getEnumsValue<ModeNames>(MODE_NAMES, props.initialMode)
  const separator: string = props.initialSeparator

  const cols = reactive<ColRow[][]>([])
  const formLabel = reactive<Labels>([])
  const formValue = reactive<Values>([])
  const options2 = reactive<OptionItem[] | OptionItem[][]>([])
  const isCascade = ref(false)

  const cacheLabel = reactive<Labels>([])
  const cacheValue = reactive<Values>([])

  let extraData: any = []

  function updateOptions(val: Values) {
    const { options, isCascade: isCascade2 } = getFormatOptions(
      props.options,
      props.fieldNames,
      mode,
      name === 'cascader'
    )

    updateArray(options2, options)

    isCascade.value = isCascade2

    // 顺便更新一下values
    updateValue(val, true)
  }

  function updateValue(val: unknown, forceUpdate = false) {
    const { valid, detail } = validateValues(
      val,
      options2,
      mode,
      separator,
      isCascade.value
    )

    if ((valid && !isSameArray(detail.value, formValue)) || forceUpdate) {
      update(detail.value)

      updateArray(
        formLabel,
        detail.value.length > 0 || name === 'picker' ? cacheLabel : []
      )
      updateArray(
        formValue,
        detail.value.length > 0 || name === 'picker' ? cacheValue : []
      )
    }

    return getDetail()
  }

  function getDetail() {
    const detail = {
      valueString: format2String(formValue),
      labelString: format2String(formLabel),
      value: cloneData(formValue),
      label: cloneData(formLabel),
      extraData: cloneData(extraData)
    }

    return detail
  }

  function addCache(item: {
    value: string | number
    label: string
    extraData: ExtraData
  }) {
    cacheValue.push(item.value)
    cacheLabel.push(item.label)
    extraData.push(cloneData(item.extraData))
  }

  function update(selecteds: Values) {
    !isCascade.value ? updateCols(selecteds) : updateCascadeCols(selecteds)

    if (name === 'picker') {
      updateArray(formLabel, cacheLabel)
      updateArray(formValue, cacheValue)
    }

    afterUpdate()
  }

  function clearCache() {
    updateArray(cacheLabel, [])
    updateArray(cacheValue, [])
    extraData = []
  }

  /**
   * 更新多列展示效果
   */
  function updateCols(selecteds: Values) {
    clearCache()

    if (options2.length === 0) {
      updateArray(cols, [])
      return []
    }

    cols.length = 0

    const options = (isArray(options2[0])
      ? options2
      : [options2]) as OptionItem[][]

    options.forEach((subOptions, index) => {
      let hasSelected = false

      const rows: ColRow[] = []

      for (let i = 0; i < subOptions.length; i++) {
        const optionItem = subOptions[i]
        const row: ColRow = {
          value: optionItem.value,
          label: optionItem.label,
          hasChildren: false,
          indexes: [i],
          selected: false
        }

        if (optionItem.value == selecteds[index]) {
          hasSelected = true
          row.selected = true
          addCache(optionItem)
        }

        rows.push(row)
      }

      if (!hasSelected) {
        if (subOptions[0]) {
          rows[0].selected = true
          addCache(subOptions[0])
        }
      }

      cols.push(rows)
    })
  }

  /**
   * 日期等更新模式
   * @param selecteds 选择值
   */
  function updateVirtualOptionsCols(selecteds: Values) {
    clearCache()

    if (selecteds.length === 0) {
      // 如果没有默认值，尝试获取默认值
      selecteds = getCascadeDefaultSelecteds()
    }

    cols.length = 0

    let colIndex = 0
    let rows = getDateTimeRows(mode, colIndex)
    let lastGroupSelected = false

    for (let i = 0; i <= selecteds.length; i++) {
      const selected = selecteds[i]

      let nextParent: ColRow | null = null
      lastGroupSelected = false

      if (rows) {
        for (let j = 0; j < rows.length; j++) {
          const row = rows[j]

          if (selected != null && row.value === selected) {
            // 找到
            row.selected = true
            lastGroupSelected = true

            if (row.hasChildren) {
              nextParent = row
              colIndex++
            }

            addCache({
              label: row.label,
              value: row.value,
              extraData: {}
            })
          }
        }

        cols.push(rows)
      }

      if (!nextParent) {
        break
      } else {
        rows = getDateTimeRows(mode, colIndex, nextParent)
      }
    }

    if (!(name === 'cascader') && !lastGroupSelected) {
      const index = 0

      let lastColFirstRow: ColRow | null = rows[index]

      while (lastColFirstRow) {
        lastColFirstRow.selected = true
        addCache({
          label: lastColFirstRow.label,
          value: lastColFirstRow.value,
          extraData: {}
        })

        if (lastColFirstRow.hasChildren) {
          colIndex++
          rows = getDateTimeRows(mode, colIndex, lastColFirstRow)
          cols.push(rows)

          lastColFirstRow = rows[0]
        } else {
          lastColFirstRow = null
        }
      }
    }
  }

  /**
   * 级联更新模式
   * @param selecteds 选择值
   */
  function updateCascadeCols(selecteds: Values) {
    if (mode !== MODE_NAMES[0]) {
      updateVirtualOptionsCols(selecteds)
      return
    }

    clearCache()

    cols.length = 0

    let optionList: OptionItem[] = options2 as OptionItem[]
    let rows = getColRows(optionList, [])

    if (selecteds.length === 0) {
      // 如果没有默认值，尝试获取默认值
      selecteds = getCascadeDefaultSelecteds()
    }

    let lastGroupSelected = false

    for (let i = 0; i <= selecteds.length; i++) {
      const selected = selecteds[i]

      let nextParent: OptionItem | null = null
      let nextParentIndexes: number[] = []
      lastGroupSelected = false

      if (rows) {
        for (let j = 0; j < rows.length; j++) {
          const optionItem = optionList[j]
          const row = rows[j]

          if (selected != null && row.value === selected) {
            // 找到
            row.selected = true
            lastGroupSelected = true

            if (row.hasChildren) {
              nextParent = optionItem
              nextParentIndexes = row.indexes
            }

            addCache(optionItem)
          }
        }

        cols.push(rows)
      }

      if (!nextParent) {
        break
      } else {
        optionList = nextParent.children
        rows = getColRows(optionList, [...nextParentIndexes])
      }
    }

    if (!(name === 'cascader') && !lastGroupSelected) {
      const index = 0

      let lastGroupFirstItem: OptionItem | null = optionList[index]

      while (lastGroupFirstItem) {
        const lastColFirstRow = rows[index]
        lastColFirstRow.selected = true
        addCache(lastGroupFirstItem)

        if (lastColFirstRow.hasChildren) {
          optionList = lastGroupFirstItem.children
          rows = getColRows(optionList, [...lastColFirstRow.indexes])

          cols.push(rows)

          lastGroupFirstItem = optionList[0]
        } else {
          lastGroupFirstItem = null
        }
      }
    }
  }

  /**
   * 非级联更新选择项
   */
  function updateColSelected(colIndex: number, current: number) {
    ;(cols as ColRow[][])[colIndex].forEach((row, index) => {
      if (index === current) {
        formValue[colIndex] = row.value
        formLabel[colIndex] = row.label
        row.selected = true
      } else {
        row.selected = false
      }
    })
  }

  /**
   * 获取默认选择数据
   * @summary 主要用于一些日期啥的，可以默认当天
   */
  function getCascadeDefaultSelecteds() {
    const selecteds = getDefaultSelecteds(mode)

    if (selecteds.length > 0) {
      return selecteds
    }

    function getFirstSelected(
      values: Values,
      optionList: OptionItem[]
    ): Values {
      const optionItem = optionList[0]

      if (optionItem) {
        values.push(optionItem.value)

        if (optionItem.children.length > 0) {
          return getFirstSelected(values, optionItem.children)
        }
      }

      return values
    }

    return name === 'cascader'
      ? []
      : getFirstSelected([], options2 as OptionItem[])
  }

  function getValuesByRow(row: ColRow) {
    if (row.values) {
      return row.values as Values
    }

    const values: Values = []
    const indexes = row.indexes
    let i = 0
    let options = options2 as OptionItem[]
    let optionItem = options[indexes[i]]

    while (options.length > 0 && i < indexes.length && optionItem) {
      values.push(optionItem.value)
      options = optionItem.children
      i++
      optionItem = options[indexes[i]]
    }

    return values
  }

  function format2String(values: Values) {
    return array2String(values, mode, separator)
  }

  const formLabelString = computed(() => format2String(formLabel))

  const formValueString = computed(() => format2String(formValue))

  watch(
    [() => props.options, () => props.fieldNames],
    () => updateOptions(formValue),
    {
      deep: true
    }
  )

  watch(
    () => props.modelValue,
    val => updateValue(val),
    {
      deep: true
    }
  )

  updateOptions(props.modelValue)

  return {
    format2String,
    cols,
    cacheLabel,
    cacheValue,
    formLabel,
    formValue,
    formLabelString,
    formValueString,
    isCascade,
    getDetail,
    update,
    updateColSelected,
    getValuesByRow,
    updateValue
  }
}
