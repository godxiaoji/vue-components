export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onVisibleStateChange(e) {
      this.$emit('visible-state-change', e)

      if (e.type === 'hidden') {
        this.afterHidden()
      }
    },
    afterHidden() {},
    onCancelClick() {
      this.$refs.popup.onCancelClick()
    },
    onCancel(res) {
      this.$emit('cancel', res)

      this.afterCancel(Object.assign({ cancel: true }, res))
    },
    onUpdateVisible(value) {
      this.$emit('update:visible', value)
    },
    afterConfirm() {},
    afterCancel() {}
  }
}
