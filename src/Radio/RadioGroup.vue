<template>
  <div
    class="fx-radio-group"
    :class="{ vertical: !inline, disabled: !!disabled }"
    ref="root"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { formItemEmits, formItemProps } from '../Form/form-item'
import { useCheckboxOrRadioGroup, ModelValue } from '../utils/checkbox-radio'

export default defineComponent({
  name: 'fx-radio-group',
  props: {
    ...formItemProps,
    modelValue: {
      type: [Number, String],
      default: null
    },
    inline: {
      type: Boolean,
      default: false
    }
  },
  emits: formItemEmits,
  setup(props, ctx) {
    const formValue = ref<ModelValue>('')

    const group = useCheckboxOrRadioGroup(props, ctx, {
      name: 'radio',
      updateValue({ isChange, uid, children, hookFormValue }) {
        let hasChecked = false

        children.forEach(child => {
          const checked = uid ? uid === child.uid : child.getInputChecked()

          if (!hasChecked && checked) {
            hasChecked = true
            formValue.value = child.getValue()
            child.setChecked(true)
          } else {
            child.setChecked(false)
          }
        })

        if (isChange && formValue.value !== props.modelValue) {
          ctx.emit('update:modelValue', hookFormValue())
        }
      },
      watchValue({ children, value }) {
        let hasChecked = false

        children.forEach(child => {
          if (!hasChecked && child.getValue() === value) {
            hasChecked = true
            formValue.value = value
            child.setChecked(true)
          } else {
            child.setChecked(false)
          }
        })
      },
      formValue
    })

    return {
      ...group,
      formValue
    }
  }
})
</script>
