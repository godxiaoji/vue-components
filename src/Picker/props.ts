import { PropType } from 'vue'
import { getDefaultFieldNames, MODE_NAMES } from '@/Picker/util'
import type { UserFieldNames, ModeNames, UserOptionItem } from './types'
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
    type: String,
    default: '/'
  },
  options: {
    type: Array,
    default: () => [] as UserOptionItem[]
  },
  initialMode: {
    type: String as PropType<ModeNames>,
    default: MODE_NAMES[0]
  },
  fieldNames: {
    type: Object as PropType<UserFieldNames>,
    default: getDefaultFieldNames
  }
}
