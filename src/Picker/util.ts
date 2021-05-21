import {
  OptionItem,
  UserOptionItem,
  UserFieldNames,
  DetailObject,
  Values,
  ExtraData,
  ColRow,
  FieldNames,
  OptionsHandler,
  ValueHook
} from '../Picker/types'
import {
  cloneData,
  isArray,
  isNumber,
  isObject,
  isString,
  isStringNumberMix,
  isStringNumberMixArray
} from '@/helpers/util'
import Exception from '@/helpers/exception'
import { DataObject } from '../helpers/types'

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

// export function string2Array(value: any, valueParser?: ValueParser) {
//   try {
//     let values: Values = []

//     if (isFunction(valueParser)) {
//       values = (valueParser as ValueParser)(value, 'value')
//     } else if (value == null) {
//       // return []
//     } else if (isNumber(value)) {
//       values = [value]
//     } else if (!value) {
//       values = []
//     } else if (isStringNumberMixArray(value)) {
//       values = value as Values
//     } else {
//       throw new Error('Invalid prop: invalid "value".')
//     }

//     return values
//   } catch (e) {
//     return new Error(e.message)
//   }
// }

export function defaultValueParser(value: any, separator: string) {
  let values: Values = []

  try {
    if (value == null) {
      values = []
    } else if (isNumber(value)) {
      values = [value]
    } else if (isString(value) && value) {
      values = value.split(separator)
    } else if (!value) {
      values = []
    } else if (isStringNumberMixArray(value)) {
      values = value as Values
    } else {
      throw new Error('Invalid prop: invalid "value".')
    }

    return values
  } catch (e) {
    return new Error(e.message)
  }
}

export function parseOptions(options: any[], fieldNames: FieldNames) {
  const newOptions: OptionItem[] | OptionItem[][] = []

  if (isArray(options)) {
    options.forEach((option: UserOptionItem | UserOptionItem[]) => {
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
        option = option as DataObject

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
    })
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
    extraData: [],
    modelValue: []
  }
}

interface ValidateReturn {
  valid: boolean
  value: Values
  label: string[]
  extraData: ExtraData[]
}

/**
 * 非级联检查
 * @param values
 * @param options
 */
function validateCols(
  values: Values,
  options: OptionItem[] | OptionItem[][]
): ValidateReturn {
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
  virtualHandler?: OptionsHandler | null
): ValidateReturn {
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
        value: row.value,
        children: [],
        disabled: false,
        extraData: {}
      }
    }

    const rows = (virtualHandler as OptionsHandler)(index, parent)

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

  return (virtualHandler
  ? virtualOptionsDeep(0, 0)
  : deep(options, 0, []))
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
 * @param separator
 * @param isCascade
 * @param virtualHandler
 * @returns { valid, detail }
 */
export function validateValues(
  values: Values | Error,
  options: any[],
  isCascade: boolean,
  virtualHandler?: OptionsHandler | null
): ValidateReturn {
  let valid = false

  if (values instanceof Error) {
    printError(values.message)
  } else if (values.length === 0) {
    // 空数组也算符合
    valid = true
  } else {
    const ret = isCascade
      ? validateCascadeCols(values, options, virtualHandler)
      : validateCols(values, options)

    if (!ret.valid) {
      printError('"value" is not in "options".')
    } else {
      return ret
    }
  }

  return {
    valid,
    value: [],
    label: [],
    extraData: []
  }
}

export function getFormatOptions(
  options: UserOptionItem[],
  fieldNames: UserFieldNames,
  virtualHandler: OptionsHandler | null,
  cascader = false
) {
  const newFieldNames = getDefaultFieldNames()

  let newOptions: OptionItem[] | OptionItem[][] = []
  let isCascade = false

  if (virtualHandler === null) {
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

  return {
    options: newOptions,
    isCascade,
    fieldNames: newFieldNames
  }
}

export function updateArray(array: any[], newArray: any[]) {
  array.splice(0, Infinity, ...newArray)
}

export function getHookValue(
  detail: DetailObject,
  formatString: boolean,
  hook?: ValueHook
) {
  const value = cloneData(detail.value)

  return hook
    ? hook(value)
    : formatString
    ? detail.valueString
    : cloneData(value)
}

export function cloneDetail(detail: DetailObject) {
  const newDetail = cloneData(detail)

  newDetail.extraData.forEach((v, k) => {
    newDetail.extraData[k] = detail.extraData[k]
  })

  return newDetail
}
