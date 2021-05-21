<template>
  <drawer
    class="fx-picker-popup fx-date-picker-popup"
    placement="bottom"
    :visible="visible"
    @visibleStateChange="onVisibleStateChange"
    @cancel="onCancel"
    @confirm="onConfirm"
    @update:visible="onUpdateVisible"
    ref="popup"
  >
    <template #header>
      <nav-bar
        class="fx-drawer_header"
        :title="title"
        :leftButtons="[{ text: '取消', type: 'primary' }]"
        :rightButtons="[{ text: '确定', type: 'primary' }]"
        :iconOnly="false"
        @leftButtonClick="onHeaderLeftClick"
        @rightButtonClick="onHeaderRightClick"
      >
      </nav-bar>
    </template>
    <picker-view ref="view" :handlers="handlers" />
  </drawer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PickerView from '@/PickerView'
import Drawer from '@/Drawer'
import NavBar from '@/NavBar'
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
  components: { PickerView, Drawer, NavBar },
  props: {
    ...popupExtendProps,
    ...datePickerProps,
    ...pickerPopupProps
  },
  emits: [...viewEmits, ...popupExtendEmits],
  setup(props, ctx) {
    const { handlers } = useDatePicker(props)
    const popup = usePopupExtend(ctx)
    const pickerPopup = usePickerPopup(props, popup, handlers)

    return {
      ...popup,
      ...pickerPopup,
      handlers
    }
  }
})
</script>
