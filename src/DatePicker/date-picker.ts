import dayjs from '@/helpers/day'
import { PropType, SetupContext } from 'vue'
import { getEnumsValue } from '@/helpers/validator'
import {
  DefaultValueHandler,
  DetailHook,
  OptionsHandler,
  ValueFormatter,
  ValueHook,
  ValueParser,
  Values
} from '../Picker/types'
import { UseProps } from '../helpers/types'
import {
  array2Date,
  day2Array,
  getFormatTemplate,
  MODE_NAMES,
  parseRows
} from '@/DatePicker/date'
import { cloneData, isDate, isString, rangeNumber } from '@/helpers/util'
import { DateDetailObject, ModeName, OptionFilter } from './types'
import { Dayjs } from 'dayjs'

export const datePickerProps = {
  modelValue: {
    type: [Date, String],
    default: null
  },
  // 格式化模板
  formatTemplate: {
    type: String,
    default: null
  },
  // 初始模式
  initialMode: {
    type: String as PropType<ModeName>,
    default: MODE_NAMES[0]
  },
  // 最小日期
  minDate: {
    type: Date,
    default: () =>
      dayjs()
        .startOf('day')
        .subtract(9, 'year')
        .toDate()
  },
  // 最大日期
  maxDate: {
    type: Date,
    default: () =>
      dayjs()
        .add(1, 'day')
        .startOf('day')
        .subtract(1, 'second')
        .toDate()
  },
  // 过滤器
  filter: {
    type: Function as PropType<OptionFilter>,
    default: () => true
  }
}

export function useDatePicker(props: UseProps, { emit }: SetupContext<any>) {
  const mode = getEnumsValue(MODE_NAMES, props.initialMode)

  const optionsHandler: OptionsHandler = (index, parent) => {
    let minDate = props.minDate as Date
    let maxDate = props.maxDate as Date
    if (minDate.getTime() > maxDate.getTime()) {
      // 兼容min max搞反的问题
      maxDate = [minDate, (minDate = maxDate)][0]
    }

    return parseRows(index, parent || null, {
      filter: props.filter,
      minDate,
      maxDate,
      mode
    })
  }

  const valueParser: ValueParser = (value: any) => {
    let djs: Dayjs | null = null

    if (isDate(value)) {
      djs = dayjs(value as Date)
    } else if (
      props.formatTemplate &&
      value != null &&
      value !== '' &&
      isString(value)
    ) {
      djs = dayjs(value, props.formatTemplate, true)
    }

    return day2Array(djs, mode)
  }

  const valueFormatter: ValueFormatter = array => {
    if (array.length === 0) {
      return ''
    }

    const d = array2Date(array, mode)

    return dayjs(d).format(getFormatTemplate(props.formatTemplate, mode))
  }

  const defaultValueHandler: DefaultValueHandler = () => {
    let min = (props.minDate as Date).getTime()
    let max = (props.maxDate as Date).getTime()

    if (min > max) {
      // 兼容min max搞反的问题
      max = [min, (min = max)][0]
    }

    return valueParser(
      new Date(rangeNumber(Date.now(), min, max)),
      'value'
    ) as Values
  }

  const valueHook: ValueHook = value => {
    const d = array2Date(value, mode)

    if (props.formatTemplate) {
      return dayjs(d).format(props.formatTemplate)
    }

    return d
  }

  const detailHook: DetailHook = detail => {
    const value = detail.value

    if (value.length === 0) {
      return {
        value: null,
        valueArray: [],
        formatted: ''
      }
    }

    return {
      value: array2Date(value, mode),
      valueArray: cloneData(value),
      formatted: detail.valueString
    } as DateDetailObject
  }

  const handlers = {
    optionsHandler,
    valueParser,
    valueFormatter,
    defaultValueHandler,
    valueHook,
    detailHook
  }

  return {
    handlers
  }
}
