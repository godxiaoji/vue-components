import { PropType } from 'vue'
import dayjs from '@/helpers/day'
import { isInNumberRange, isInteger } from '@/helpers/util'
import { DEFAULT_MONTH_RANGE, TYPE_NAMES } from '@/Calendar/util'
import { calendarValueValidator, createEnumsValidator } from '@/helpers/validator'
import type { DayHandler, CalendarType } from './types'

export default {
  modelValue: {
    type: [String, Number, Date, Array],
    validator: calendarValueValidator,
    default: () => [] as Date[]
  },
  minDate: {
    type: Date,
    default: () =>
      dayjs()
        .startOf('day')
        .toDate()
  },
  maxDate: {
    type: Date,
    default: () =>
      dayjs()
        .startOf('day')
        .add(DEFAULT_MONTH_RANGE, 'month')
        .toDate()
  },
  initialType: {
    type: String as PropType<CalendarType>,
    validator: createEnumsValidator(TYPE_NAMES),
    default: TYPE_NAMES[0]
  },
  allowSameDay: {
    type: Boolean,
    default: false
  },
  maxRange: {
    type: Number,
    default: Infinity
  },
  dayHandler: {
    type: Function as PropType<DayHandler>,
    default: null
  },
  firstDayOfWeek: {
    validator: (val: number) => {
      return isInteger(val) && isInNumberRange(val, 0, 6)
    },
    default: 0
  }
}
