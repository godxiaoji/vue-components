import { cloneData } from '../../helpers/util'

export default {
  inject: {
    appFormItem: {
      default: null
    }
  },
  computed: {
    formName() {
      if (this.appFormItem) {
        return this.appFormItem.name || ''
      }
      return this.name || ''
    }
  },
  methods: {
    validateAfterEventTrigger(type, value) {
      this.appFormItem &&
        this.appFormItem.validateAfterEventTrigger(type, value)
    },
    hookFormValue() {
      return cloneData(this.formValue)
    },
    _reset(value) {
      this.formValue = value

      if (value != this.value) {
        this.$emit(this.inputField ? '_input' : '_change', this.hookFormValue())
      }

      this.$emit('reset', { name: this.formName, value: this.hookFormValue() })

      return this.hookFormValue()
    }
  }
}
