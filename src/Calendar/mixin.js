import dayjs from 'dayjs'
import { inArray, isInteger } from '../helpers/util'
import { DEFAULT_MONTH_RANGE, TYPE_NAMES } from './util'
import { calendarValueValidator } from '../helpers/validator'

export default {
  props: {
    modelValue: {
      validator: calendarValueValidator,
      default() {
        return []
      }
    },
    minDate: {
      type: Date,
      default() {
        return dayjs()
          .startOf('day')
          .toDate()
      }
    },
    maxDate: {
      type: Date,
      default() {
        return dayjs()
          .startOf('day')
          .add(DEFAULT_MONTH_RANGE, 'month')
          .toDate()
      }
    },
    initialType: {
      validator(val) {
        return inArray(val, TYPE_NAMES)
      },
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
      validator(val) {
        return isInteger(val) && val >= 0 && val <= 6
      },
      default: 0
    }
  },
  model: {
    prop: 'modelValue',
    event: 'update:modelValue'
  }
}
