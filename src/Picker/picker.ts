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
  validateValues,
  updateArray,
  defaultValueParser
} from '@/Picker/util'
import { UseProps } from '../helpers/types'
import {
  DetailObject,
  Labels,
  Values,
  OptionsHandler,
  PickerHandlers,
  HandleType
} from './types'
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
  { name }: UseOptions,
  handlers: PickerHandlers
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
  const separator: string = props.initialSeparator
  // const defaultDetail = getDefaultDetail()
  const optionsHandler: OptionsHandler | null = handlers.optionsHandler || null

  const {
    formName,
    validateAfterEventTrigger,
    hookFormValue,
    root
  } = useFormItem<string | number>(props, ctx, {
    formValue,
    hookFormValue: () =>
      handlers.valueHook
        ? handlers.valueHook(cloneData(formValue))
        : props.formatString
        ? formValueString.value
        : cloneData(formValue),
    hookResetValue: () => updateValue(cloneData(defaultValue)).value
  })

  const format2String = (array: Values, type: HandleType = 'value') => {
    return handlers.valueFormatter
      ? handlers.valueFormatter(array, type)
      : array.join(separator)
  }

  function updateValue(val: unknown) {
    if (popup.value) {
      const popupDetail: DetailObject = popup.value.updateValue(val)

      return updateDetail(
        isEmpty(val) && val !== 0 ? getDefaultDetail() : popupDetail
      )
    }

    const values = handlers.valueParser
      ? handlers.valueParser(val, 'value')
      : defaultValueParser(val, separator)

    if (!(values instanceof Error)) {
      const { options, isCascade } = getFormatOptions(
        props.options || [],
        props.fieldNames || {},
        optionsHandler,
        name === 'cascader'
      )

      if (!isSameArray(values, formValue)) {
        const { value, label, valid, extraData } = validateValues(
          values,
          options,
          isCascade,
          optionsHandler
        )

        if (valid) {
          return updateDetail({
            value,
            label,
            extraData,
            valueString: format2String(value, 'value'),
            labelString: format2String(label, 'label')
          })
        }
      }
    }

    return getDetail()
  }

  function updateDetail(newDetail: DetailObject) {
    if (!isSameArray(newDetail.value, formValue)) {
      emit('value-change', detailHook(newDetail), detailHook(detail))
    }

    detail = newDetail
    updateArray(formValue, newDetail.value)
    updateArray(formLabel, newDetail.label)
    formValueString.value = newDetail.valueString
    formLabelString.value = newDetail.labelString

    return getDetail()
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

  function detailHook(detail: DetailObject): any {
    return handlers.detailHook ? handlers.detailHook(detail) : cloneData(detail)
  }

  function getDetail(): DetailObject {
    return cloneData(detail)
  }

  function onChange(detail: DetailObject) {
    updateDetail(detail)

    emit('update:modelValue', hookFormValue())
    emit('change', detailHook(detail))

    validateAfterEventTrigger('change', hookFormValue())
  }

  watch(
    [() => props.modelValue, () => props.options],
    () => updateValue(props.modelValue),
    {
      immediate: true
    }
  )

  const defaultValue = getDetail().value

  return {
    root,
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
