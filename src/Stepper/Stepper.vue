<template>
  <div class="fx-stepper" :class="{ disabled }">
    <fx-button
      icon="MinusOutlined"
      shape="square"
      size="small"
      :disabled="disabled || disabledMinus || formValue <= min"
      @click="onMinusOrPlusClick(false)"
    />
    <input
      class="fx-stepper_input"
      :type="allowDecimal ? 'text' : 'tel'"
      :inputmode="allowDecimal ? 'decimal' : 'numeric'"
      :name="formName"
      :disabled="disabled"
      :readonly="disabledInput"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
      @change="onChange"
      ref="input"
    />
    <fx-button
      icon="PlusOutlined"
      shape="square"
      size="small"
      :disabled="disabled || disabledPlus || formValue >= max"
      @click="onMinusOrPlusClick(true)"
    />
  </div>
</template>

<script lang="ts">
import { onMounted, ref, defineComponent, watch } from 'vue'
import FxButton from '@/Button'
import { rangeInteger, rangeNumber } from '@/helpers/util'
import { formatInputNumber } from '@/helpers/input'
import { useFormItem, formItemEmits, formItemProps } from '@/utils/form'

export default defineComponent({
  name: 'fx-stepper',
  components: { FxButton },
  props: {
    ...formItemProps,
    modelValue: {
      type: [Number, String],
      default: null
    },
    color: {
      type: String,
      default: ''
    },
    // 是否禁用减少按钮
    disabledMinus: {
      type: Boolean,
      default: false
    },
    // 是否禁用增加按钮
    disabledPlus: {
      type: Boolean,
      default: false
    },
    // 是否禁用输入框
    disabledInput: {
      type: Boolean,
      default: false
    },
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: Infinity
    },
    allowDecimal: {
      type: Boolean,
      default: true
    },
    step: {
      type: Number,
      default: 1
    },
    decimalLength: {
      type: Number,
      default: null
    }
  },
  emits: [
    ...formItemEmits,
    'plus-click',
    'minus-click',
    'input',
    'focus',
    'blur'
  ],
  setup(props, ctx) {
    const { emit } = ctx
    const formValue = ref('1')

    const {
      formName,
      validateAfterEventTrigger,
      formReset,
      getInputEl,
      hookFormValue
    } = useFormItem<string>(props, ctx, { formValue })

    function onMinusOrPlusClick(isPlus = true) {
      let type = 'plus-click'

      if (isPlus) {
        updateValue(parseFloat(formValue.value) + props.step)
      } else {
        updateValue(parseFloat(formValue.value) - props.step)
        type = 'minus-click'
      }

      emit(type, { type })
    }

    function updateValue(value: any, eventChange = true) {
      const newValue = getRangeNumber(value)

      if (newValue !== formValue.value) {
        formValue.value = newValue
        if (eventChange) {
          const eventType = 'change'

          emit(eventType, {
            value: newValue
          })

          validateAfterEventTrigger(eventType, newValue)
        }
      }

      const $input = getInputEl()
      if ($input) {
        $input.value = newValue
      }

      if (newValue !== props.modelValue) {
        emit('update:modelValue', newValue)
      }

      return newValue
    }

    function getRangeNumber(value: string | number) {
      value = formateNumber(value)

      if (value === '') {
        value = props.min
      }

      if (props.allowDecimal) {
        value = rangeNumber(parseFloat(value as string), props.min, props.max)
      } else {
        value = rangeInteger(Math.floor(value as number), props.min, props.max)
      }

      return value.toString()
    }

    function formateNumber(value: string | number): string {
      return formatInputNumber(value, props.decimalLength)
    }

    function proxyEvent(e: Event) {
      emit(e.type, e)
    }

    function onChange(e: Event) {
      updateValue((e.target as HTMLInputElement).value)
    }

    function onInput(e: Event) {
      const $input = e.target as HTMLInputElement

      const value = formateNumber($input.value)

      $input.value = value

      emit(e.type, {
        value
      })
    }

    function reset() {
      return formReset(getInputEl().value)
    }

    watch(
      () => props.modelValue,
      val => {
        if (
          val != null &&
          parseFloat(val.toString()) !== parseFloat(formValue.value)
        ) {
          updateValue(val, false)
        }
      }
    )

    onMounted(() => {
      const $input = getInputEl()

      $input.defaultValue = $input.value = formValue.value
    })

    updateValue(props.modelValue, false)

    return {
      formName,
      formValue,
      validateAfterEventTrigger,
      onFocus: proxyEvent,
      onBlur: proxyEvent,
      onChange,
      onInput,
      onMinusOrPlusClick,
      hookFormValue,
      reset
    }
  }
})
</script>
