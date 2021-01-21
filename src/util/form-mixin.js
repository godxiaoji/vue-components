import { cloneData } from '../helpers/util'

export default {
  inject: {
    appFormItem: {
      default: null
    }
  },
  props: {
    name: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
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
  model: {
    prop: 'modelValue',
    event: 'update:modelValue'
  },
  methods: {
    getInputEl() {
      return this.$el && this.$el.querySelector('input')
    },
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
        this.$emit('update:modelValue', this.hookFormValue())
      }

      this.$emit('reset', { name: this.formName, value: this.hookFormValue() })

      return this.hookFormValue()
    }
  }
}
