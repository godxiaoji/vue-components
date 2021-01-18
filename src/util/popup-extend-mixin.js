export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onShow(res) {
      this.$emit('show', res)
    },
    onShown(res) {
      this.$emit('shown', res)
    },
    onHide(res) {
      this.$emit('hide', res)
    },
    onHidden(res) {
      this.$emit('hidden', res)
    },
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
