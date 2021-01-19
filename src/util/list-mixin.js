import { SDKKey } from '../config'

export default {
  methods: {
    update(lazy = 17) {
      if (!this.$.isMounted) {
        return
      }

      clearTimeout(this.updateTimer)
      this.updateTimer = setTimeout(() => {
        this.resetItems()
      }, lazy)
    },
    getItems(name) {
      return this.$refs.list
        ? [].slice.call(
            this.$refs.list.querySelectorAll(`.${SDKKey}-${name}-item`),
            0
          )
        : []
    }
  }
}
