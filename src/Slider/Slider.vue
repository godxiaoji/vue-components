<template>
  <div class="fx-slider" :class="{ disabled: !!disabled }">
    <div class="fx-slider_inner">
      <div class="fx-slider_box">
        <div class="fx-slider_track" :style="[{ width: progress }]"></div>
        <div class="fx-slider_thumb" :style="[{ left: progress }]">
          {{ showValue ? formValue : '' }}
        </div>
      </div>
      <input
        class="fx-slider_range"
        type="range"
        :disabled="disabled"
        :value="formValue"
        :min="min"
        :max="max"
        :step="step"
        :name="formName"
        @input="onInput"
        @change="onChange"
        ref="input"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, ref, defineComponent, watch, computed, nextTick } from 'vue'
import { isNumeric } from '../helpers/util'
import { useFormItem, formItemEmits, formItemProps } from '../Form/form-item'

export default defineComponent({
  name: 'fx-slider',
  props: {
    ...formItemProps,
    modelValue: {
      type: [Number, String],
      validator: isNumeric,
      default: null
    },
    min: {
      type: [Number, String],
      validator: isNumeric,
      default: 0
    },
    max: {
      type: [Number, String],
      validator: isNumeric,
      default: 100
    },
    step: {
      type: [Number, String],
      validator: isNumeric,
      default: 1
    },
    showValue: {
      type: Boolean,
      default: false
    }
  },
  emits: [...formItemEmits, 'input'],
  setup(props, ctx) {
    const formValue = ref('')
    const { emit } = ctx

    const {
      formName,
      validateAfterEventTrigger,
      formReset,
      getInputEl,
      hookFormValue,
      eventEmit
    } = useFormItem<string>(props, ctx, {
      formValue,
      hookFormValue() {
        return parseFloat(formValue.value)
      }
    })

    function updateValue() {
      formValue.value = getInputEl().value
    }

    function inputModel() {
      if (
        props.modelValue == null ||
        formValue.value !== props.modelValue.toString()
      ) {
        emit('update:modelValue', hookFormValue())
      }
    }

    function onInput(e: Event) {
      formValue.value = (e.target as HTMLInputElement).value

      inputModel()

      eventEmit(e.type)
    }

    function onChange(e: Event) {
      eventEmit(e.type)
    }

    function reset() {
      return formReset(getInputEl().value)
    }

    const progress = computed(() => {
      return (
        ((parseFloat(formValue.value) - parseFloat(props.min as string)) /
          (parseFloat(props.max as string) - parseFloat(props.min as string))) *
          100 +
        '%'
      )
    })

    watch(
      () => props.modelValue,
      val => {
        formValue.value = val.toString()

        nextTick(() => {
          updateValue()
        })
      }
    )

    watch([() => props.min, () => props.max], () => {
      nextTick(() => {
        updateValue()
        inputModel()
      })
    })

    onMounted(() => {
      formValue.value = getInputEl().value

      inputModel()
    })

    return {
      progress,
      onChange,
      onInput,
      reset,
      formName,
      formValue,
      validateAfterEventTrigger
    }
  }
})
</script>
