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
      this.appFormItem && this.appFormItem.validateAfterEventTrigger(type, value)
    }
  }
}
