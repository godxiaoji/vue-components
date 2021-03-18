<template>
  <drawer
    class="fx-picker-popup"
    placement="bottom"
    :visible="visible"
    @visible-state-change="onVisibleStateChange"
    @cancel="onCancel"
    @update:visible="onUpdateVisible"
    ref="popup"
  >
    <nav-bar
      :title="title"
      :right-buttons="[{ icon: '', text: '确定', type: 'primary' }]"
      :left-buttons="[{ icon: '', text: '取消' }]"
      :icon-only="false"
      @left-button-click="onCancelClick"
      @right-button-click="onConfirmClick"
    >
    </nav-bar>
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
import NavBar from '@/NavBar'
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
  components: { PickerView, NavBar, Drawer },
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

    function onConfirmClick() {
      const oldDetail = detail
      detail = pickerView.value?.getDetail() || getDefaultDetail()

      const confirmDetail = getDetail()
      ctx.emit('confirm', confirmDetail)
      popup.customConfirm(confirmDetail)

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
      onConfirmClick,
      updateValue,
      getDetail
    }
  }
})
</script>
