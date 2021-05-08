<template>
  <drawer
    class="fx-picker-popup fx-date-picker-popup"
    placement="bottom"
    :visible="visible"
    :showCancel="true"
    :showConfirm="true"
    :beforeConfirm="beforeConfirm"
    @visible-state-change="onVisibleStateChange"
    @cancel="onCancel"
    @confirm="onConfirm"
    @update:visible="onUpdateVisible"
    ref="popup"
  >
    <picker-view ref="view" :handlers="handlers" />
  </drawer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PickerView from '@/PickerView'
import Drawer from '@/Drawer'
import { viewEmits } from '@/Picker/view'
import {
  usePopupExtend,
  popupExtendEmits,
  popupExtendProps
} from '@/hooks/popup'
import { usePickerPopup, pickerPopupProps } from '@/Picker/popup'
import { datePickerProps, useDatePicker } from '@/DatePicker/date-picker'

export default defineComponent({
  name: 'fx-date-picker-popup',
  components: { PickerView, Drawer },
  props: {
    ...popupExtendProps,
    ...datePickerProps,
    ...pickerPopupProps
  },
  emits: [...viewEmits, ...popupExtendEmits],
  setup(props, ctx) {
    const { handlers } = useDatePicker(props, ctx)
    const popup = usePopupExtend(ctx)
    const pickerPopup = usePickerPopup(props, ctx, handlers)

    return {
      ...popup,
      ...pickerPopup,
      handlers
    }
  }
})
</script>
