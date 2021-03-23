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

      if (e.state === 'shown') {
        this.afterShown()
      } else if (e.state === 'hidden') {
        this.afterHidden()
      }
    },
    afterShown() {},
    afterHidden() {},
    onCancelClick() {
      this.$refs.popup.onCancelClick()
    },
    customCancel(key, focus) {
      this.$refs.popup.customCancel(key, focus)
    },
    customConfirm(res, key) {
      this.$refs.popup.customConfirm(res, key)
    },
    onCancel(res) {
      this.$emit('cancel', res)

      this.afterCancel(Object.assign({ cancel: true }, res))
    },
    onConfirm(res) {
      this.$emit('confirm', res)

      this.afterConfirm(Object.assign({ confirm: true }, res))
    },
    onUpdateVisible(value) {
      this.$emit('update:visible', value)
    },
    afterConfirm() {},
    afterCancel() {}
  }
}
