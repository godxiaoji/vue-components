import { inArray } from '../helpers/util'

export default {
  data() {
    return {
      appChildren: []
    }
  },
  methods: {
    addChild(vm) {
      if (
        !inArray(
          vm._uid,
          this.appChildren.map(({ _uid }) => {
            return _uid
          })
        )
      ) {
        this.appChildren.push(vm)
      }
    },

    childrenForEach(fn) {
      this.appChildren.forEach(fn)
    },

    removeChild(vm) {
      const index = this.appChildren
        .map(({ _uid }) => {
          return _uid
        })
        .indexOf(vm._uid)

      if (index !== -1) {
        this.appChildren.splice(index, 1)
      }
    }
  }
}
