<template>
  <label class="fx-switch" :class="{ disabled }">
    <input
      class="fx-switch_checkbox"
      type="checkbox"
      :disabled="disabled"
      :name="formName"
      :value="formValue"
      @change="onChange"
      ref="input"
    />
  </label>
</template>

<script lang="ts">
import { onMounted, ref, watch, defineComponent } from 'vue'
import { useFormItem, formItemEmits, formItemProps } from '@/hooks/form'

export default defineComponent({
  name: 'fx-switch',
  props: {
    ...formItemProps,
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  emits: formItemEmits,
  setup(props, ctx) {
    const { emit } = ctx
    const formValue = ref(!!props.modelValue)

    const {
      formName,
      validateAfterEventTrigger,
      getInputEl,
      hookFormValue,
      eventEmit
    } = useFormItem<boolean>(props, ctx, {
      formValue,
      hookResetValue: input => input?.checked || false
    })

    watch(
      () => props.modelValue,
      val => {
        val = !!val

        if (val !== formValue.value) {
          getInputEl().checked = formValue.value = val
        }
      }
    )

    function onChange(e: Event) {
      const value = !!(e.target as HTMLInputElement).checked

      formValue.value = value

      if (props.modelValue !== value) {
        emit('update:modelValue', value)
      }

      eventEmit(e.type)
    }

    onMounted(() => {
      const $input = getInputEl()

      $input.defaultChecked = $input.checked = formValue.value
    })

    return {
      formName,
      formValue,
      onChange,
      hookFormValue,
      validateAfterEventTrigger
    }
  }
})
</script>
