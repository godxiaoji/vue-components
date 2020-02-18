<template>
  <div class="radio-group">
    <slot></slot>
  </div>
</template>

<script>
import { getHandleEvent } from '../../helpers/events'
import { getRandomNumber } from '../../helpers/util'

export default {
  name: 'app-radio-group',
  props: {
    name: {
      type: String,
      default() {
        return 'radio-' + getRandomNumber()
      }
    }
  },
  data() {
    return {
      formValue: ''
    }
  },
  computed: {},
  watch: {},
  created() {
    this._radio_group = true
  },
  ready() {},
  mounted() {},
  updated() {},
  attached() {},
  methods: {
    updateValue() {
      let value = ''

      for (let i = 0; i < this.$children.length; i++) {
        const vm = this.$children[i]

        if (vm._radio_item) {
          if (vm.getInputChecked()) {
            value = vm.value
            break
          }
        }
      }

      this.formValue = value
    },

    onChange(e) {
      this.updateValue(e.target)

      const value = this.formValue
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

    reset() {
      this.$children.forEach(vm => {
        if (vm._radio_item) {
          vm.reset()
        }
      })
    }
  }
}
</script>

<style scoped>
.radio-group {
  display: inline-flex;
  align-items: center;
}
</style>
