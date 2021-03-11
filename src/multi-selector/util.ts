import { isStringNumberMixArray } from './../helpers/util'
import {
  OptionItem,
  Labels,
  ModeNames,
  UserOptionItem,
  UserFieldNames,
  DetailObject,
  Values,
  ExtraData,
  ColRow,
  FieldNames
} from './types'
import {
  getDateValues,
  getTimeValues,
  getDatetimeValues,
  dateString2Array,
  timeString2Array,
  datetimeString2Array,
  parseDateList,
  parseTimeList,
  parseDatetimeList
} from './date'
import {
  cloneData,
  isArray,
  isNumber,
  isObject,
  isString,
  isStringNumberMix
} from '../helpers/util'
import Exception from '../helpers/exception'

export { dateString2Array, timeString2Array, datetimeString2Array }

export function getDateTimeRows(
  mode: ModeNames,
  index: number,
  parent?: ColRow
): ColRow[] {
  if (mode === 'date') {
    return parseDateList(index, parent)
  }
  if (mode === 'time') {
    return parseTimeList(index, parent)
  }
  if (mode === 'datetime') {
    return parseDatetimeList(index, parent)
  }

  return []
}

export function getColRows(options: OptionItem[], indexes: number[]) {
  const rows: ColRow[] = []

  options.forEach((item, index) => {
    rows.push({
      label: item.label,
      value: item.value,
      hasChildren: item.children && item.children.length > 0,
      indexes: [...indexes, index]
    })
  })

  return rows
}

export function array2String(values: Values, mode: ModeNames, separator = '/') {
  if (mode === 'date') {
    return values.join('-')
  } else if (mode === 'time') {
    return values.join(':')
  } else if (mode === 'datetime' && values.length > 0) {
    return [values.slice(0, 3).join('-'), values.slice(3, 6).join(':')].join(
      ' '
    )
  }

  return values.join(separator)
}

export function string2Array(value: any, mode: ModeNames, separator = '/') {
  try {
    let values: Values = []

    if (value == null) {
      // return []
    } else if (isNumber(value)) {
      values = [value]
    } else if (!value) {
      values = []
    } else if (isStringNumberMixArray(value)) {
      values = value as Values
    } else if (mode === 'date') {
      values = dateString2Array(value)
    } else if (mode === 'time') {
      values = timeString2Array(value)
    } else if (mode === 'datetime') {
      values = datetimeString2Array(value)
    } else if (isString(value)) {
      values = (value as string).split(separator)
    } else {
      throw new Error('Invalid prop: invalid "value".')
    }

    return values
  } catch (e) {
    return new Error(e.message)
  }
}

export function getDefaultSelecteds(mode: ModeNames) {
  if (mode === 'date') {
    return getDateValues()
  } else if (mode === 'time') {
    return getTimeValues()
  } else if (mode === 'datetime') {
    return getDatetimeValues()
  }

  return []
}

export function parseOptions(options: any[], fieldNames: FieldNames) {
  const newOptions: OptionItem[] | OptionItem[][] = []

  if (isArray(options)) {
    options.forEach(
      (option: string | number | UserOptionItem | UserOptionItem[]) => {
        if (isArray(option)) {
          // 二维数组
          const subOptions = parseOptions(
            option as UserOptionItem[],
            fieldNames
          ) as OptionItem[]

          if (subOptions.length > 0) {
            ;(newOptions as OptionItem[][]).push(subOptions)
          }
        } else if (isNumber(option) || isString(option)) {
          // 纯数值或者字符串
          ;(newOptions as OptionItem[]).push({
            label: option.toString(),
            value: option as string,
            children: [],
            disabled: false,
            extraData: {}
          })
        } else if (isObject(option)) {
          option = option as UserOptionItem

          if (isStringNumberMix(option[fieldNames.value])) {
            const extraData = cloneData(option)
            delete extraData[fieldNames.label]
            delete extraData[fieldNames.value]
            delete extraData[fieldNames.children]
            ;(newOptions as OptionItem[]).push({
              label:
                option[fieldNames.label] == null
                  ? option[fieldNames.value]
                  : option[fieldNames.label],
              value: option[fieldNames.value],
              disabled: option.disabled ? true : false,
              children: parseOptions(
                option[fieldNames.children],
                fieldNames
              ) as OptionItem[],
              extraData
            })
          }
        }
      }
    )
  }

  return newOptions
}

export const getDefaultFieldNames: () => FieldNames = () => {
  return { label: 'label', value: 'value', children: 'children' }
}

export const getDefaultDetail: () => DetailObject = () => {
  return {
    valueString: '',
    value: [],
    labelString: '',
    label: [],
    extraData: []
  }
}

export const MODE_NAMES: ModeNames[] = [
  'multiSelector',
  'date',
  'time',
  'datetime'
]

/**
 * 非级联检查
 * @param values
 * @param options
 */
function validateCols(values: Values, options: OptionItem[] | OptionItem[][]) {
  const optionList = isArray(options[0])
    ? (options as OptionItem[][])
    : [options as OptionItem[]]
  let selectCount = 0
  const value: Values = []
  const label: string[] = []
  const extraData: ExtraData[] = []

  optionList.forEach((subOptionList, colIndex) => {
    for (let i = 0; i < subOptionList.length; i++) {
      const optionItem = subOptionList[i]

      if (optionItem.value == values[colIndex]) {
        selectCount++
        value.push(optionItem.value)
        label.push(optionItem.label)
        extraData.push(cloneData(optionItem.extraData))
        break
      }
    }
  })

  return selectCount === optionList.length
    ? {
        valid: true,
        value,
        label,
        extraData
      }
    : {
        valid: false,
        value: [],
        label: [],
        extraData: []
      }
}

/**
 * 级联检查
 * @param values
 * @param options
 */
function validateCascadeCols(
  values: Values,
  options: OptionItem[],
  mode: ModeNames
) {
  const value: Values = []
  const label: string[] = []
  const extraData: ExtraData[] = []

  function addData(optionItem: OptionItem) {
    value.push(optionItem.value)
    label.push(optionItem.label)
    extraData.push(cloneData(optionItem.extraData))
  }

  function deep(
    optionList: OptionItem[],
    valueIndex: number,
    indexes: number[]
  ): boolean {
    const rows = getColRows(optionList, indexes)

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i]
      const optionItem = optionList[i]

      if (row.value === values[valueIndex]) {
        if (row.hasChildren && values[valueIndex + 1]) {
          // 都有下一项
          addData(optionItem)
          return deep(optionItem.children, valueIndex + 1, [...indexes, i])
        } else if (!row.hasChildren && valueIndex + 1 >= values.length) {
          // 都没有下一项，匹配正确
          addData(optionItem)
          return true
        } else {
          return false
        }
      }
    }

    return false
  }

  function virtualOptionsDeep(
    index: number,
    valueIndex: number,
    parent?: ColRow
  ): boolean {
    function row2OptionItem(row: ColRow) {
      return {
        label: row.label,
        value: row.label,
        children: [],
        disabled: false,
        extraData: {}
      }
    }

    const rows = getDateTimeRows(mode, index, parent)

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i]
      const optionItem = row2OptionItem(row)

      if (row.value === values[valueIndex]) {
        if (row.hasChildren && values[valueIndex + 1]) {
          // 都有下一项
          addData(optionItem)
          return virtualOptionsDeep(index + 1, valueIndex + 1, row)
        } else if (!row.hasChildren && valueIndex + 1 >= values.length) {
          // 都没有下一项，匹配正确
          addData(optionItem)
          return true
        } else {
          return false
        }
      }
    }

    return false
  }

  return (mode === MODE_NAMES[0]
  ? deep(options, 0, [])
  : virtualOptionsDeep(0, 0))
    ? {
        valid: true,
        value,
        label,
        extraData
      }
    : {
        valid: false,
        value: [],
        label: [],
        extraData: []
      }
}

function printError(message: string) {
  console.error(
    new Exception(message, Exception.TYPE.PROP_ERROR, 'MulitSelector')
  )
}

/**
 * 校验值
 * @param values 值
 * @param options
 * @param mode
 * @param separator
 * @param isCascade
 * @returns { valid, detail }
 */
export function validateValues(
  values: unknown,
  options: any[],
  mode: ModeNames,
  separator: string,
  isCascade: boolean
) {
  const newValues = string2Array(values, mode, separator)

  let valid: boolean
  let detail = getDefaultDetail()

  if (newValues instanceof Error) {
    console.error(newValues.message)
    printError
    valid = false
    detail = getDefaultDetail()
  } else if (newValues.length === 0) {
    // 空数组也算符合
    valid = true
    detail = getDefaultDetail()
  } else {
    const ret = isCascade
      ? validateCascadeCols(newValues, options, mode)
      : validateCols(newValues, options)

    if (!ret.valid) {
      console.error(
        new Exception(
          '"value" is not in "options".',
          Exception.TYPE.PROP_ERROR,
          'MulitSelector'
        )
      )
    } else {
      detail = {
        value: ret.value,
        label: ret.label,
        valueString:
          ret.value.length > 0 ? array2String(ret.value, mode, separator) : '',
        labelString:
          ret.label.length > 0 ? array2String(ret.label, mode, separator) : '',
        extraData: ret.extraData
      }
    }

    valid = ret.valid
  }

  return {
    valid,
    detail
  }
}

export function getFormatOptions(
  options: UserOptionItem[],
  fieldNames: UserFieldNames,
  mode: ModeNames,
  cascader = false
) {
  const newFieldNames = getDefaultFieldNames()

  let newOptions: OptionItem[] | OptionItem[][] = []
  let isCascade = false

  if (mode === MODE_NAMES[0]) {
    if (isObject(fieldNames)) {
      isString(fieldNames.label) &&
        fieldNames.label &&
        (newFieldNames.label = fieldNames.label as string)
      isString(fieldNames.value) &&
        fieldNames.value &&
        (newFieldNames.value = fieldNames.value as string)
      isString(fieldNames.children) &&
        fieldNames.children &&
        (newFieldNames.children = fieldNames.children as string)
    }

    newOptions = parseOptions(options, newFieldNames)

    // 判断是否级联模式
    if (cascader) {
      // 级联选择器下强制级联模式
      isCascade = true
    } else {
      for (let i = 0; i < newOptions.length; i++) {
        const newOption = newOptions[i] as OptionItem

        if (newOption.children && newOption.children[0]) {
          isCascade = true
          break
        }
      }
    }
  } else {
    isCascade = true
  }

  // console.log({
  //   options: newOptions,
  //   isCascade,
  //   fieldNames: newFieldNames,
  //   mode
  // })

  return {
    options: newOptions,
    isCascade,
    fieldNames: newFieldNames
  }
}

export function updateArray(array: any[], newArray: any[]) {
  array.splice(0, Infinity, ...newArray)
}
