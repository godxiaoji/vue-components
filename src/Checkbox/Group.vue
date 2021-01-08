<template>
  <div :class="[prefix + '-checkbox-group', { vertical: !inline }]">
    <slot></slot>
  </div>
</template>

<script>
import { isStringNumberMixArray, cloneData, isSameArray, isArray, inArray } from '../helpers/util'
import { SDKKey } from '../config'
import formMixin from '../util/form-mixin'
import groupMixin from '../util/group-mixin'

export default {
  name: SDKKey + '-checkbox-group',
  mixins: [formMixin, groupMixin],
  provide() {
    return {
      appCheckboxGroup: this
    }
  },
  props: {
    name: {
      type: String,
      default: ''
    },
    modelValue: {
      validator(val) {
        return isStringNumberMixArray(val)
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
      prefix: SDKKey,

      formValue: []
    }
  },
  watch: {
    modelValue: {
      handler(val) {
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
  methods: {
    updateValue() {
      const value = this.formValue.slice(0, 0)

      this.childrenForEach(child => {
        if (child.getInputChecked()) {
          value.push(cloneData(child.value))
        }
      })

      this.formValue = value

      if (!isSameArray(value, this.modelValue)) {
        this.$emit('_change', this.hookFormValue())
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
