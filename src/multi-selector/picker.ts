import {
  onMounted,
  ref,
  SetupContext,
  reactive,
  shallowRef,
  ComponentPublicInstance,
  watch
} from 'vue'
import { cloneData, isSameArray, isEmpty } from '../helpers/util'
import {
  getDefaultDetail,
  getFormatOptions,
  MODE_NAMES,
  string2Array,
  validateValues,
  updateArray
} from './util'
import { UseProps } from '../utils/types'
import { DetailObject, Labels, Values } from './types'
import { getEnumsValue } from '../utils/validator'
import { useFormItem } from '../Form/form-item'

interface UseOptions {
  name: string
}

export const pickerProps = {
  placeholder: {
    type: String,
    default: ''
  }
}

export const pickerEmits = ['value-change']

export function usePicker(
  props: UseProps,
  ctx: SetupContext<any>,
  { name }: UseOptions
) {
  const { emit } = ctx
  const isInitPopup = ref(false)
  const popupVisible = ref(true)
  const formValueString = ref('')
  const formLabelString = ref('')
  const formLabel = reactive<Labels>([])
  const formValue = reactive<Values>([])
  const popup = shallowRef<ComponentPublicInstance<any>>()

  let detail = getDefaultDetail()
  const mode = getEnumsValue(MODE_NAMES, props.initialMode)
  const separator = props.initialSeparator
  // const defaultDetail = getDefaultDetail()

  const {
    formName,
    validateAfterEventTrigger,
    formReset,
    getInputEl,
    hookFormValue
  } = useFormItem<string | number>(props, ctx, {
    formValue,
    hookFormValue() {
      return props.formatString ? formValueString.value : cloneData(formValue)
    }
  })

  function updateValue(val: unknown) {
    if (popup.value) {
      const popupDetail: DetailObject = popup.value.updateValue(val)

      updateDetail(isEmpty(val) && val !== 0 ? getDefaultDetail() : popupDetail)
      return
    }

    const values = string2Array(val, mode, separator)

    if (values instanceof Error) {
      return
    }

    const { options, isCascade } = getFormatOptions(
      props.options,
      props.fieldNames,
      mode,
      name === 'cascader'
    )

    if (!isSameArray(values, formValue)) {
      const validateRet = validateValues(
        values,
        options,
        mode,
        separator,
        isCascade
      )

      if (validateRet.valid) {
        updateDetail(validateRet.detail)
      }
    }
  }

  function updateDetail(newDetail: DetailObject) {
    if (!isSameArray(newDetail.value, formValue)) {
      emit('value-change', cloneData(detail))
    }

    detail = newDetail
    updateArray(formValue, newDetail.value)
    updateArray(formLabel, newDetail.label)
    formValueString.value = newDetail.valueString
    formLabelString.value = newDetail.labelString
  }

  function onFieldClick() {
    if (!props.disabled) {
      if (!isInitPopup.value) {
        isInitPopup.value = true
      } else {
        popupVisible.value = true
      }
    }
  }

  function onChange(detail: DetailObject) {
    updateDetail(detail)

    emit('update:modelValue', hookFormValue())
    emit('change', cloneData(detail))

    validateAfterEventTrigger('change', hookFormValue())
  }

  //   function reset() {
  //     updateValue(this.getInputEl().value)
  //     emit('update:modelValue', hookFormValue())
  //     emit('reset', { name: this.formName, value: hookFormValue() })

  //     return hookFormValue()
  //   }

  watch(
    [() => props.modelValue, () => props.options],
    () => updateValue(props.modelValue),
    {
      immediate: true
    }
  )

  watch(
    () => props.options,
    val => updateValue(val),
    {
      immediate: true
    }
  )

  onMounted(() => {
    const $input = getInputEl()
    $input.defaultValue = $input.value
  })

  return {
    popup,
    formName,
    isInitPopup,
    popupVisible,
    formValueString,
    formLabelString,
    updateValue,
    onFieldClick,
    onChange,
    hookFormValue,
    validateAfterEventTrigger
  }
}
