import {
  ComponentPublicInstance,
  onMounted,
  SetupContext,
  shallowRef,
  watch
} from 'vue'
import { isSameArray, isEmpty } from '@/helpers/util'
import { DetailObject, PickerHandlers } from './types'
import { UseProps } from '../helpers/types'
import { cloneDetail, getDefaultDetail, getHookValue } from '@/Picker/util'

export const pickerPopupProps = {
  title: {
    type: String,
    default: ''
  }
}

export function usePickerPopup(
  props: UseProps,
  { emit }: SetupContext<any>,
  handlers: PickerHandlers
) {
  const view = shallowRef<ComponentPublicInstance<any>>()

  let detail = getDefaultDetail()

  function beforeConfirm() {
    const newDetail = view.value?.getDetail() || getDefaultDetail()

    if (!isSameArray(newDetail.value, detail.value)) {
      detail = newDetail

      // 跟picker-view不一样，改变数值时机是确定按钮
      emit(
        'update:modelValue',
        getHookValue(detail, props.formatString || false, handlers.valueHook)
      )
      emit('change', detailHook(detail))
    }

    return detailHook(detail)
  }

  function onConfirm(e: any) {
    emit('confirm', e)
  }

  function detailHook(detail: DetailObject): any {
    const newDetail = cloneDetail(detail)

    return handlers.detailHook ? handlers.detailHook(newDetail) : newDetail
  }

  function getDetail() {
    return cloneDetail(detail)
  }

  function updateValue(val: unknown) {
    view.value && (detail = view.value.updateValue(val))

    return getDetail()
  }

  watch(
    () => props.modelValue,
    val => updateValue(val),
    {
      immediate: true
    }
  )

  watch(
    () => props.visible,
    val => val && view.value?.updatePos()
  )

  onMounted(
    () =>
      (!isEmpty(props.modelValue) || props.modelValue === 0) &&
      updateValue(props.modelValue)
  )

  return {
    view,
    onConfirm,
    updateValue,
    getDetail,
    beforeConfirm
  }
}
