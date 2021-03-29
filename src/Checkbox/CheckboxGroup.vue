<template>
  <div
    class="fx-checkbox-group"
    :class="{ vertical: !inline, disabled: !!disabled }"
    ref="root"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType } from 'vue'
import { formItemEmits, formItemProps } from '@/hooks/form'
import {
  isStringNumberMixArray,
  cloneData,
  isSameArray,
  inArray
} from '@/helpers/util'
import { useCheckboxOrRadioGroup } from '@/hooks/checkbox-radio'
import { ModelValue } from '../hooks/checkbox-radio'

export default defineComponent({
  name: 'fx-checkbox-group',
  props: {
    ...formItemProps,
    modelValue: {
      type: Array as PropType<ModelValue[]>,
      validator: isStringNumberMixArray,
      default: (): string[] => []
    },
    inline: {
      type: Boolean,
      default: false
    }
  },
  emits: formItemEmits,
  setup(props, ctx) {
    const formValue = reactive<ModelValue[]>([])

    const group = useCheckboxOrRadioGroup(props, ctx, {
      name: 'checkbox',
      updateValue({ isChange, children, hookFormValue }) {
        const value: ModelValue[] = []

        children.forEach(child => {
          if (child.getInputChecked()) {
            value.push(cloneData(child.getValue()))
          }
        })

        formValue.splice(0, Infinity, ...value)

        if (isChange && !isSameArray(value, props.modelValue)) {
          ctx.emit('update:modelValue', hookFormValue())
        }

        return hookFormValue()
      },
      watchValue({ children, value }) {
        value = value as ModelValue[]

        if (isStringNumberMixArray(value) && !isSameArray(value, formValue)) {
          formValue.length = 0

          children.forEach(child => {
            const checked = inArray(child.getValue(), value)
            child.setChecked(checked)
            checked && formValue.push(child.getValue())
          })
        }
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
