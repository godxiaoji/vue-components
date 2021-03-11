import { getDefaultFieldNames, MODE_NAMES } from './util'
import { stringNumberArrayMixValidator } from '../utils/validator'

export default {
  modelValue: {
    type: [String, Number, Array],
    validator: stringNumberArrayMixValidator,
    default: () => ''
  },
  formatString: {
    type: Boolean,
    default: false
  },
  initialSeparator: {
    type: String,
    default: '/'
  },
  options: {
    type: Array,
    default: () => []
  },
  initialMode: {
    type: String,
    default: MODE_NAMES[0]
  },
  fieldNames: {
    type: Object,
    default: getDefaultFieldNames
  }
}
