import {
  ref,
  SetupContext,
  reactive,
  shallowRef,
  ComponentPublicInstance,
  watch
} from 'vue'
import { cloneData, isSameArray, isEmpty } from '@/helpers/util'
import {
  getDefaultDetail,
  getFormatOptions,
  MODE_NAMES,
  string2Array,
  validateValues,
  updateArray
} from '@/Picker/util'
import { UseProps } from '../helpers/types'
import { DetailObject, Labels, Values } from './types'
import { getEnumsValue } from '@/helpers/validator'
import { useFormItem } from '@/hooks/form'

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

  const { formName, validateAfterEventTrigger, hookFormValue } = useFormItem<
    string | number
  >(props, ctx, {
    formValue,
    hookFormValue: () =>
      props.formatString ? formValueString.value : cloneData(formValue),
    hookResetValue: () => updateValue(cloneData(defaultValue)).value
  })

  function updateValue(val: unknown) {
    if (popup.value) {
      const popupDetail: DetailObject = popup.value.updateValue(val)

      return updateDetail(
        isEmpty(val) && val !== 0 ? getDefaultDetail() : popupDetail
      )
    }

    const values = string2Array(val, mode, separator)

    if (!(values instanceof Error)) {
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
          return updateDetail(validateRet.detail)
        }
      }
    }

    return cloneData(detail)
  }

  function updateDetail(newDetail: DetailObject) {
    if (!isSameArray(newDetail.value, formValue)) {
      emit('value-change', cloneData(newDetail), cloneData(detail))
    }

    detail = newDetail
    updateArray(formValue, newDetail.value)
    updateArray(formLabel, newDetail.label)
    formValueString.value = newDetail.valueString
    formLabelString.value = newDetail.labelString

    return cloneData(detail)
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

  const defaultValue = cloneData(detail).value

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
    validateAfterEventTrigger,
    defaultValue
  }
}
