<template>
  <div class="fx-slider" :class="{ disabled: !!disabled }">
    <div class="fx-slider_inner" ref="slider">
      <div class="fx-slider_box">
        <div
          class="fx-slider_track"
          :style="[{ width: progress * 100 + '%', backgroundColor: color }]"
        ></div>
        <div
          class="fx-slider_thumb"
          data-thumb="true"
          :style="[{ left: progress * 100 + '%', color }]"
        >
          {{ showValue ? formValue : '' }}
        </div>
      </div>
      <input
        type="hidden"
        :name="formName"
        :disabled="disabled"
        :value="formValue"
        ref="input"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, watch, nextTick } from 'vue'
import { isNumeric } from '@/helpers/util'
import { useFormItem, formItemEmits, formItemProps } from '@/hooks/form'
import { slideProps, slideEmits, useSlide } from '@/Slider/slide'

export default defineComponent({
  name: 'fx-slider',
  props: {
    ...formItemProps,
    ...slideProps,
    modelValue: {
      type: [Number, String],
      validator: isNumeric,
      default: null
    }
  },
  emits: [...formItemEmits, ...slideEmits],
  setup(props, ctx) {
    const progress = ref(0)
    const formValue = ref(0)
    const { emit } = ctx

    const {
      formName,
      validateAfterEventTrigger,
      hookFormValue,
      eventEmit
    } = useFormItem<number>(props, ctx, {
      formValue
    })

    const { slider, toInteger, rangeValue, value2Progress } = useSlide(props, {
      getValue() {
        return formValue.value
      },
      move({ value: newVal, progress: newProgress }) {
        formValue.value = newVal
        progress.value = newProgress

        inputModel()
        eventEmit('input')
      },
      end({ isChange }) {
        isChange && eventEmit('change')
      }
    })

    function inputModel() {
      if (
        props.modelValue == null ||
        formValue.value !== toInteger(props.modelValue)
      ) {
        emit('update:modelValue', hookFormValue())
      }
    }

    function updateValue(val: unknown) {
      if (val == null) {
        return
      }

      let newVal = toInteger(val as string)

      if (isNaN(newVal)) {
        return
      }

      newVal = rangeValue(newVal)

      if (newVal !== formValue.value) {
        formValue.value = newVal
        progress.value = value2Progress(newVal)
      }
    }

    watch(
      () => props.modelValue,
      val => updateValue(val)
    )

    watch([() => props.min, () => props.max], () => {
      nextTick(() => {
        updateValue(formValue.value)
        inputModel()
      })
    })

    updateValue(props.modelValue || 0)
    inputModel()

    return {
      slider,
      progress,
      formName,
      formValue,
      validateAfterEventTrigger
    }
  }
})
</script>
