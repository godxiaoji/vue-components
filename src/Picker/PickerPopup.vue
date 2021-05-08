<template>
  <drawer
    class="fx-picker-popup"
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
    <picker-view
      ref="view"
      :formatString="formatString"
      :initialSeparator="initialSeparator"
      :options="options"
      :fieldNames="fieldNames"
      :handlers="handlers"
    />
  </drawer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PickerView from '@/PickerView'
import Drawer from '@/Drawer'
import { viewEmits } from '@/Picker/view'
import pickerCommonProps from '@/Picker/props'
import {
  usePopupExtend,
  popupExtendEmits,
  popupExtendProps
} from '@/hooks/popup'
import { usePickerPopup, pickerPopupProps } from '@/Picker/popup'

export default defineComponent({
  name: 'fx-picker-popup',
  components: { PickerView, Drawer },
  props: {
    ...popupExtendProps,
    ...pickerCommonProps,
    ...pickerPopupProps
  },
  emits: [...viewEmits, ...popupExtendEmits],
  setup(props, ctx) {
    const popup = usePopupExtend(ctx)
    const pickerPopup = usePickerPopup(props, ctx, {})

    return {
      ...popup,
      ...pickerPopup
    }
  }
})
</script>
