import { ComponentPublicInstance, onMounted, shallowRef, watch } from 'vue'
import { isSameArray, isEmpty } from '@/helpers/util'
import { DetailObject, PickerHandlers } from './types'
import { DataObject, UseProps } from '../helpers/types'
import { cloneDetail, getDefaultDetail, getHookValue } from '@/Picker/util'
import { PopupCustomConfirm, UseEmit } from '@/hooks/types'

export const pickerPopupProps = {
  title: {
    type: String,
    default: ''
  }
}

export function usePickerPopup(
  props: UseProps,
  {
    emit,
    customConfirm,
    onCancelClick
  }: {
    emit: UseEmit
    customConfirm: PopupCustomConfirm
    onCancelClick: () => void
  },
  handlers: PickerHandlers
) {
  const view = shallowRef<ComponentPublicInstance<any>>()

  let detail = getDefaultDetail()

  function beforeConfirm(): DataObject {
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

  function onHeaderLeftClick() {
    onCancelClick()
  }

  function onHeaderRightClick() {
    customConfirm(beforeConfirm())
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
    updateValue,
    getDetail,
    onHeaderLeftClick,
    onHeaderRightClick
  }
}
