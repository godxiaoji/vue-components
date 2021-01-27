<template>
  <div
    class="fx-checkbox-group"
    :class="{ vertical: !inline, disabled: !!disabled }"
  >
    <slot></slot>
  </div>
</template>

<script>
import {
  isStringNumberMixArray,
  cloneData,
  isSameArray,
  isArray,
  inArray,
  isStringNumberMix
} from '../helpers/util'
import formMixin from '../util/form-mixin'
import groupMixin from '../util/group-mixin'

export default {
  name: 'fx-checkbox-group',
  mixins: [formMixin, groupMixin],
  provide() {
    return {
      appCheckboxGroup: this
    }
  },
  props: {
    modelValue: {
      validator(val) {
        return isStringNumberMix(val) || isStringNumberMixArray(val)
      },
      default() {
        return []
      }
    },
    inline: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formValue: []
    }
  },
  watch: {
    modelValue: {
      handler(val) {
        if (isStringNumberMix(val)) {
          val = [val]
        }

        if (isArray(val) && !isSameArray(val, this.formValue)) {
          let formValue = []

          this.childrenForEach(child => {
            const checked = inArray(child.value, val)
            child.setChecked(checked)

            checked && formValue.push(child.value)
          })

          this.formValue = formValue
        }
      }
    }
  },
  mounted() {
    this.updateValue(false)
  },
  methods: {
    updateValue(isChange = true) {
      const value = this.formValue.slice(0, 0)

      this.childrenForEach(child => {
        if (child.getInputChecked()) {
          value.push(cloneData(child.value))
        }
      })

      this.formValue = value

      if (isChange && !isSameArray(value, this.modelValue)) {
        this.$emit('update:modelValue', this.hookFormValue())
      }
    },

    onChange() {
      this.updateValue()

      const type = 'change'

      this.$emit(type, {
        value: this.hookFormValue()
      })

      this.validateAfterEventTrigger(type, this.hookFormValue())
    },

    hookFormValue() {
      return cloneData(this.formValue)
    },

    reset() {
      this.updateValue()

      this.$emit('reset', { name: this.formName, value: this.hookFormValue() })

      return this.hookFormValue()
    }
  }
}
</script>
