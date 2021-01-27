export default {
  methods: {
    update(lazy = 17) {
      if (!this._isMounted) {
        return
      }

      clearTimeout(this.updateTimer)
      this.updateTimer = setTimeout(() => {
        this.resetItems()
      }, lazy)
    },
    getItems(name) {
      return this.$refs.list
        ? [].slice.call(this.$refs.list.querySelectorAll(`.fx-${name}-item`), 0)
        : []
    }
  }
}
