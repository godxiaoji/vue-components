import { PropType } from 'vue'
import dayjs from '@/helpers/day'
import { isInNumberRange, isInteger } from '@/helpers/util'
import { DEFAULT_MONTH_RANGE, MODE_NAMES } from '@/Calendar/util'
import {
  calendarValueValidator,
  createEnumsValidator
} from '@/helpers/validator'
import { DayHandler, CalendarMode } from './types'

export default {
  modelValue: {
    type: [String, Number, Date, Array],
    validator: calendarValueValidator,
    default: () => [] as Date[]
  },
  minDate: {
    type: Date,
    default: () => dayjs().startOf('day').toDate()
  },
  maxDate: {
    type: Date,
    default: () =>
      dayjs().startOf('day').add(DEFAULT_MONTH_RANGE, 'month').toDate()
  },
  initialMode: {
    type: String as PropType<CalendarMode>,
    validator: createEnumsValidator(MODE_NAMES),
    default: MODE_NAMES[0]
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
