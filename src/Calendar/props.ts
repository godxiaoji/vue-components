import dayjs from 'dayjs'
import { isInNumberRange, isInteger } from '@/helpers/util'
import { DEFAULT_MONTH_RANGE, TYPE_NAMES } from '@/Calendar/util'
import { calendarValueValidator } from '@/helpers/validator'
import { createEnumsValidator } from '@/helpers/validator'

export default {
  modelValue: {
    validator: calendarValueValidator,
    default: () => []
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
    type: String,
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
    type: Function,
    default: null
  },
  firstDayOfWeek: {
    validator: (val: number) => {
      return isInteger(val) && isInNumberRange(val, 0, 6)
    },
    default: 0
  }
}
