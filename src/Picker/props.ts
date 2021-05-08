import { PropType } from 'vue'
import { getDefaultFieldNames } from '@/Picker/util'
import { UserFieldNames, UserOptionItem } from './types'
import { stringNumberArrayMixValidator } from '@/helpers/validator'

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
    type: [String, Function],
    default: '/'
  },
  options: {
    type: Array,
    default: () => [] as UserOptionItem[]
  },
  fieldNames: {
    type: Object as PropType<UserFieldNames>,
    default: getDefaultFieldNames
  },
  handlers: {
    type: Object,
    default: null
  }
}
