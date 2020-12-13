import { getDefaultFieldNames, MODE_NAMES } from './'
import { arrayValueValidator } from '../../../helpers/validator'

export default {
  props: {
    value: {
      validator: arrayValueValidator,
      default() {
        return ''
      }
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
      default() {
        return []
      }
    },
    initialMode: {
      type: String,
      default: MODE_NAMES[0]
    },
    fieldNames: {
      type: Object,
      default() {
        return getDefaultFieldNames()
      }
    }
  }
}
