<template>
  <div
    class="fx-radio-group"
    :class="{ vertical: !inline, disabled: !!disabled }"
  >
    <slot></slot>
  </div>
</template>

<script>
import { cloneData, isStringNumberMix } from '../helpers/util'
import formMixin from '../util/form-mixin'
import groupMixin from '../util/group-mixin'

export default {
  name: 'fx-radio-group',
  mixins: [formMixin, groupMixin],
  provide() {
    return {
      appRadioGroup: this
    }
  },
  props: {
    modelValue: {
      validator: isStringNumberMix,
      default: null
    },
    inline: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formValue: ''
    }
  },
  watch: {
    modelValue: {
      handler(val) {
        if (val != this.formValue) {
          let formValue = ''
          let hasChecked = false

          this.childrenForEach(child => {
            const checked = child.value == val

            if (checked && !hasChecked) {
              hasChecked = true
              formValue = child.value
              child.setChecked(true)
            } else {
              child.setChecked(false)
            }
          })

          this.formValue = formValue
        }
      }
    }
  },
  mounted() {
    for (let i = 0; i < this.appChildren.length; i++) {
      const child = this.appChildren[i]

      if (child.getInputChecked()) {
        this.formValue = child.value
        break
      }
    }
  },
  methods: {
    updateValue(vm) {
      let value = ''

      for (let i = 0; i < this.appChildren.length; i++) {
        const child = this.appChildren[i]

        if (child._uid === vm._uid) {
          value = cloneData(vm.value)
        } else if (child.getInputChecked()) {
          child.setChecked(false)
        }
      }

      this.formValue = value

      if (value !== this.modelValue) {
        this.$emit('update:modelValue', value)
      }
    },

    onChange(vm) {
      this.updateValue(vm)

      const type = 'change'

      this.$emit(type, {
        value: this.hookFormValue()
      })

      this.validateAfterEventTrigger(type, this.hookFormValue())
    },

    reset() {
      let value = ''

      for (let i = 0; i < this.appChildren.length; i++) {
        const child = this.appChildren[i]

        if (child.getInputChecked()) {
          value = cloneData(child.value)
          break
        }
      }

      return this._reset(value)
    }
  }
}
</script>
