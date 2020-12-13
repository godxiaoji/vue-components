export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {},
  data() {
    return {
      visible2: false
    }
  },
  watch: {
    visible: {
      immediate: true,
      handler(val) {
        val = !!val
        if (this.visible2 !== val) {
          this.visible2 = val
        }
      }
    },
    visible2: {
      handler(val) {
        if (this.visible != val) {
          this.$emit('update:visible', val)
        }
      }
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
    afterConfirm() {},
    afterCancel() {}
  }
}
