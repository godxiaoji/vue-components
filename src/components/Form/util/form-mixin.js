export default {
  watch: {
    name() {
      // 如果由form-item包裹，忽略自身name
      if (!this.parentIsFormItem()) {
        this.formName = this.name
      }
    }
  },
  created() {
    this._app_form_component = true

    if (this.parentIsFormItem()) {
      this.formName = this.$parent.name
    } else {
      this.formName = this.name
    }
  },
  methods: {
    parentIsFormItem() {
      const $parent = this.$parent

      return $parent && $parent._form_item
    }
  }
}
