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
          vm.$.uid,
          this.appChildren.map(cvm => {
            return cvm.$.uid
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
        .map(cvm => {
          return cvm.$.uid
        })
        .indexOf(vm.$.uid)

      if (index !== -1) {
        this.appChildren.splice(index, 1)
      }
    }
  }
}
