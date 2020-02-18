<template>
  <div class="checkbox-group">
    <slot></slot>
  </div>
</template>

<script>
import { getHandleEvent } from '../../helpers/events'
import { getRandomNumber, cloneData } from '../../helpers/util'

export default {
  name: 'app-checkbox-group',
  props: {
    name: {
      type: String,
      default() {
        return 'checkbox-' + getRandomNumber()
      }
    }
  },
  data() {
    return {
      formValue: []
    }
  },
  computed: {},
  watch: {},
  created() {
    this._checkbox_group = true
  },
  ready() {},
  mounted() {},
  updated() {},
  attached() {},
  methods: {
    updateValue() {
      const value = this.formValue.slice(0, 0)

      this.$children.forEach(vm => {
        if (vm._checkbox_item && vm.getInputChecked() === true) {
          value.push(vm.value)
        }
      })

      this.formValue = value
    },

    onChange(e) {
      this.updateValue()

      const value = cloneData(this.formValue)
      const type = 'change'
      const handleEvent = getHandleEvent(
        this.$el,
        e,
        {
          value
        },
        type
      )

      this.$emit(type, handleEvent)
    },

    hookFormValue() {
      return cloneData(this.formValue)
    },

    reset() {
      this.$children.forEach(vm => {
        if (vm._checkbox_item) {
          vm.reset()
        }
      })
    }
  }
}
</script>

<style scoped>
.checkbox-group {
  display: inline-flex;
  align-items: center;
}
</style>
