<template>
  <div class="fx-slider fx-range" :class="{ disabled: !!disabled }">
    <div class="fx-slider_inner" ref="slider">
      <div class="fx-slider_box">
        <div
          class="fx-slider_track"
          :style="[
            {
              left: Math.min(progress[0], progress[1]) * 100 + '%',
              width: Math.abs(progress[1] - progress[0]) * 100 + '%',
              backgroundColor: color
            }
          ]"
        ></div>
        <div
          class="fx-slider_thumb"
          data-thumb="true"
          data-index="0"
          :style="[{ left: progress[0] * 100 + '%', color }]"
        >
          {{ showValue ? formValue[0] : '' }}
        </div>
        <div
          class="fx-slider_thumb"
          data-thumb="true"
          data-index="1"
          :style="[{ left: progress[1] * 100 + '%', color }]"
        >
          {{ showValue ? formValue[1] : '' }}
        </div>
      </div>
      <input
        type="hidden"
        :name="formName"
        :disabled="disabled"
        :value="formValueString"
        ref="input"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  watch,
  nextTick,
  PropType,
  reactive,
  computed
} from 'vue'
import { cloneData, isNumberArray, isSameArray, isString } from '@/helpers/util'
import { useFormItem, formItemEmits, formItemProps } from '@/hooks/form'
import { slideProps, slideEmits, useSlide } from '@/Slider/slide'

export default defineComponent({
  name: 'fx-range',
  props: {
    ...formItemProps,
    ...slideProps,
    modelValue: {
      type: Array as PropType<number[]>,
      validator: isNumberArray,
      default: null
    },
    allowSameValue: {
      type: Boolean,
      default: true
    }
  },
  emits: [...formItemEmits, ...slideEmits],
  setup(props, ctx) {
    const progress = reactive<number[]>([0, 0])
    const formValue = reactive<number[]>([0, 0])
    const { emit } = ctx

    const {
      formName,
      validateAfterEventTrigger,
      hookFormValue,
      eventEmit
    } = useFormItem<number>(props, ctx, {
      formValue,
      hookFormValue() {
        return valueHandler(formValue)
      }
    })

    const {
      slider,
      toInteger,
      rangeValue,
      value2Progress,
      getMinMax
    } = useSlide(props, {
      getValue($target) {
        const { thumb, index } = $target.dataset

        return thumb ? formValue[parseInt(index as string)] : 0
      },
      move({ value: newVal, progress: newProgress, $target }) {
        const { thumb } = $target.dataset
        let index = 0

        if (thumb) {
          index = parseInt($target.dataset.index as string)
        } else {
          if (
            Math.abs(formValue[0] - newVal) > Math.abs(formValue[1] - newVal)
          ) {
            index = 1
          }
        }
        if (!props.allowSameValue && newVal === formValue[1 - index]) {
          // 不允许重叠
        } else {
          formValue[index] = newVal
          progress[index] = newProgress

          inputModel()
          eventEmit('input')
        }
      },
      end({ isChange }) {
        isChange && eventEmit('change')
      }
    })

    function valueHandler(val: unknown) {
      let newVal: number[] = []

      if (isNumberArray(val) && (val as number[]).length > 1) {
        newVal = cloneData(val as number[])
      } else if (isString(val)) {
        newVal = (val as string).split(',').map(v => {
          return toInteger(v)
        })

        if (newVal.length < 2) {
          newVal = []
        }
      }

      return newVal.slice(0, 2).sort(sortBy)
    }

    function sortBy(a: number, b: number) {
      return a - b
    }

    function inputModel() {
      if (
        props.modelValue == null ||
        valueHandler(formValue) !== valueHandler(props.modelValue)
      ) {
        emit('update:modelValue', hookFormValue())
      }
    }

    function rangeValues(vals: number[]) {
      vals[0] = rangeValue(vals[0])
      vals[1] = rangeValue(vals[1])

      return vals
    }

    function updateValue(val: unknown) {
      let newVal = valueHandler(val)

      if (newVal.length === 0) {
        return
      }
      newVal = rangeValues(newVal)

      if (!isSameArray(newVal, valueHandler(formValue))) {
        formValue[0] = newVal[0]
        formValue[1] = newVal[1]
        progress[0] = value2Progress(newVal[0])
        progress[1] = value2Progress(newVal[1])
      }
    }

    watch(
      () => props.modelValue,
      val => updateValue(val)
    )

    watch([() => props.min, () => props.max], () => {
      nextTick(() => {
        updateValue(formValue)
        inputModel()
      })
    })

    const formValueString = computed(() => {
      return cloneData(formValue)
        .sort(sortBy)
        .join(',')
    })

    const { min, max } = getMinMax()

    updateValue([min, max])
    updateValue(props.modelValue)
    inputModel()

    return {
      formValueString,
      slider,
      progress,
      formName,
      formValue,
      validateAfterEventTrigger
    }
  }
})
</script>
