<template>
  <drawer
    class="fx-picker-popup"
    placement="bottom"
    :visible="visible"
    :showCancel="true"
    :showConfirm="true"
    @visible-state-change="onVisibleStateChange"
    @cancel="onCancel"
    @confirm="onConfirm"
    @update:visible="onUpdateVisible"
    ref="popup"
  >
    <picker-view ref="pickerView" v-bind="$props" />
  </drawer>
</template>

<script lang="ts">
import {
  defineComponent,
  shallowRef,
  ComponentPublicInstance,
  watch,
  onMounted
} from 'vue'
import PickerView from '@/PickerView'
import Drawer from '@/Drawer'
import { cloneData, isSameArray } from '@/helpers/util'
import { viewEmits } from '@/Picker/view'
import commonProps from '@/Picker/props'
import { getDefaultDetail } from '@/Picker/util'
import {
  usePopupExtend,
  popupExtendEmits,
  popupExtendProps
} from '@/hooks/popup'
import { isEmpty } from '@/helpers/util'

export default defineComponent({
  name: 'fx-picker-popup',
  components: { PickerView, Drawer },
  props: {
    ...popupExtendProps,
    ...commonProps,
    title: {
      type: String,
      default: ''
    }
  },
  emits: [...viewEmits, ...popupExtendEmits],
  setup(props, ctx) {
    const { emit } = ctx
    const pickerView = shallowRef<ComponentPublicInstance<typeof PickerView>>()

    const popup = usePopupExtend(ctx)

    let detail = getDefaultDetail()

    function onConfirm() {
      const oldDetail = detail
      detail = pickerView.value?.getDetail() || getDefaultDetail()

      const confirmDetail = getDetail()
      ctx.emit('confirm', confirmDetail)

      if (!isSameArray(oldDetail.value, detail.value)) {
        // 跟picker-view不一样，改变数值时机是确定按钮
        const { value, valueString } = getDetail()
        emit('update:modelValue', props.formatString ? valueString : value)
        emit('change', cloneData(detail))
        // this.afterChange(cloneData(detail))
      }
    }

    function getDetail() {
      return cloneData(detail)
    }

    function updateValue(val: unknown) {
      pickerView.value && (detail = pickerView.value.updateValue(val))

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
      val => val && pickerView.value?.updatePos()
    )

    onMounted(
      () =>
        (!isEmpty(props.modelValue) || props.modelValue === 0) &&
        updateValue(props.modelValue)
    )

    return {
      ...popup,
      pickerView,
      onConfirm,
      updateValue,
      getDetail
    }
  }
})
</script>
