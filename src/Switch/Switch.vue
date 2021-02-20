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
import { onMounted, ref, toRef, watch, defineComponent } from 'vue'
import formMixin from '../util/form/options-mixin'
import useFormItem from '../util/form/use-item'

export default defineComponent({
  name: 'fx-switch',
  mixins: [formMixin],
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  setup(props, ctx) {
    const { emit } = ctx
    const formValue = ref(!!props.modelValue)

    const {
      formName,
      validateAfterEventTrigger,
      formReset,
      getInputEl,
      hookFormValue
    } = useFormItem<boolean>(props, ctx, { formValue })

    watch(toRef(props, 'modelValue'), val => {
      val = !!val

      if (val !== formValue.value) {
        getInputEl().checked = formValue.value = val
      }
    })

    function onChange(e: Event) {
      const value = !!(e.target as HTMLInputElement).checked

      formValue.value = value

      if (props.modelValue !== value) {
        emit('update:modelValue', value)
      }

      emit('change', { value })
      validateAfterEventTrigger('change', value)
    }

    function reset() {
      return formReset(getInputEl().checked)
    }

    onMounted(() => {
      const $input = getInputEl()

      $input.defaultChecked = $input.checked = formValue.value
    })

    return {
      formName,
      formValue,
      onChange,
      reset,
      hookFormValue
    }
  }
})
</script>
