<template>
  <label
    class="fx-input"
    :class="{
      'has--prepend': $slots.prepend,
      'has--append': $slots.append,
      'fx-textarea': type === 'textarea',
      focus: focus2,
      disabled
    }"
  >
    <div class="fx-input_prepend" v-if="$slots.prepend">
      <slot name="prepend"></slot>
    </div>
    <textarea
      v-if="type === 'textarea'"
      class="fx-input_input fx-input_textarea"
      :name="formName"
      :disabled="disabled"
      :placeholder="placeholder"
      :readonly="readonly"
      :maxlength="maxLength"
      @input="onInput"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
      ref="input"
    ></textarea>
    <input
      v-else
      class="fx-input_input"
      :name="formName"
      :type="inputType"
      :inputmode="inputMode"
      :disabled="disabled"
      :placeholder="placeholder"
      :readonly="readonly"
      :maxlength="maxLength"
      @input="onInput"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
      @compositionstart="onCompositionStart"
      @compositionend="onCompositionEnd"
      ref="input"
    />
    <span class="fx-input_limit" v-if="showLimit && maxLength > 0"
      >{{ formValue.length }}/{{ maxLength }}</span
    >
    <icon
      v-if="showClear"
      v-show="formValue && focus2"
      class="fx-input_clear"
      icon="CloseCircleFilled"
      @mousedown.prevent="onClear"
    />
    <div class="fx-input_append" v-if="$slots.append">
      <slot name="append"></slot>
    </div>
  </label>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import Icon from '@/Icon'
import { isNumeric, isNumber, isStringNumberMix } from '@/helpers/util'
import { formatInputDigit, formatInputNumber } from '@/helpers/input'
import { getEnumsValue } from '@/helpers/validator'
import { useFormItem, formItemEmits, formItemProps } from '@/hooks/form'

const TYPE_NAMES = [
  'text',
  'number',
  'digit',
  'tel',
  'password',
  'search',
  'textarea'
]

export default defineComponent({
  name: 'fx-input',
  components: { Icon },
  props: {
    ...formItemProps,
    maxlength: {
      type: [String, Number],
      validator: (val: number | string) => {
        return isNumeric(val) || val === ''
      },
      default: 140
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    modelValue: {
      type: [String, Number],
      validator: isStringNumberMix,
      default: null
    },
    focus: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    showClear: {
      type: Boolean,
      default: false
    },
    // 展示字数限制文本
    showLimit: {
      type: Boolean,
      default: false
    }
  },
  emits: [...formItemEmits, 'input', 'focus', 'blur'],
  setup(props, ctx) {
    const focus2 = ref(false)
    const formValue = ref('')
    const { emit } = ctx

    const {
      formName,
      validateAfterEventTrigger,
      getInputEl,
      hookFormValue,
      eventEmit
    } = useFormItem<string>(props, ctx, {
      formValue
    })

    function updateValue(value: string | number) {
      value = value.toString() as string

      switch (props.type) {
        case 'digit':
          value = formatInputDigit(value)
          break

        case 'number':
          value = formatInputNumber(value)
          break

        default:
          break
      }

      const $input = getInputEl()
      let isChange = false

      if ($input.value != value) {
        $input.value = value.toString()
      }

      value = $input.value

      if (value !== formValue.value) {
        formValue.value = value.toString()
        isChange = true
      }

      if (value != props.modelValue) {
        emit('update:modelValue', formValue.value)
      }

      return { value, isChange }
    }

    function updateInput(newVal: string) {
      const { value, isChange } = updateValue(newVal)

      isChange && emit('input', { value, type: 'input' })
    }

    let isComposition = false

    function onCompositionStart() {
      isComposition = true
    }

    function onCompositionEnd(e: Event) {
      isComposition = false
      updateInput((e.target as HTMLInputElement).value)
    }

    function onFocus(e: Event) {
      focus2.value = true
      emit(e.type, e)
    }

    function onBlur(e: Event) {
      focus2.value = false
      emit(e.type, e)

      validateAfterEventTrigger(e.type, formValue.value)
    }

    function onInput(e: Event) {
      if (!isComposition) {
        updateInput((e.target as HTMLInputElement).value)
      }
    }

    function onChange(e: Event) {
      eventEmit(e.type)
    }

    function onClear() {
      updateInput('')
    }

    const inputType = computed(() => {
      if (props.type === 'number') {
        return 'text'
      }

      if (props.type === 'digit') {
        return 'tel'
      }

      return getEnumsValue(TYPE_NAMES, props.type)
    })

    const inputMode = computed(() => {
      let mode: 'search' | 'numeric' | 'decimal' | 'tel' | 'text' | 'none' =
        'none'

      switch (props.type) {
        case 'search':
          mode = 'search'
          break

        case 'digit':
          mode = 'numeric'
          break

        case 'number':
          mode = 'decimal'
          break

        case 'tel':
          mode = 'tel'
          break

        case 'text':
          mode = 'text'
          break

        default:
          break
      }

      return mode
    })

    watch(
      () => props.modelValue,
      val => {
        val != formValue.value && updateValue(val ?? '')
      }
    )

    watch(
      () => props.focus,
      val => {
        const $input = getInputEl()

        $input && ($input as HTMLInputElement)[val ? 'focus' : 'blur']()
      }
    )

    const maxLength = computed(() => {
      if (isNumber(props.maxlength)) {
        return Math.round(props.maxlength as number)
      }
      if (isNumeric(props.maxlength)) {
        return Math.round(parseFloat(props.maxlength as string))
      }

      return 140
    })

    onMounted(() => {
      updateValue(props.modelValue ?? '')

      const $input = getInputEl() as HTMLInputElement

      $input.defaultValue = $input.value
      props.focus && $input.focus()
    })

    return {
      formName,
      formValue,
      focus2,
      onCompositionStart,
      onCompositionEnd,
      onFocus,
      onBlur,
      onInput,
      onChange,
      onClear,
      hookFormValue,
      inputType,
      inputMode,
      maxLength
    }
  }
})
</script>
