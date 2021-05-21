<template>
  <div
    class="fx-picker"
    :class="[
      {
        disabled
      }
    ]"
    ref="root"
  >
    <picker-input
      :formLabelString="formLabelString"
      :formValueString="formValueString"
      :disabled="disabled"
      :formName="formName"
      :placeholder="placeholder"
      @field-click="onFieldClick"
    />
    <picker-popup
      :title="placeholder"
      :handlers="handlers"
      v-model:visible="popupVisible"
      v-if="isInitPopup"
      @change="onChange"
      ref="popup"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PickerInput from '@/Picker/PickerInput.vue'
import PickerPopup from '@/PickerPopup'
import { formItemEmits, formItemProps } from '@/hooks/form'
import { usePicker, pickerEmits, pickerProps } from '@/Picker/picker'
import { datePickerProps, useDatePicker } from '@/DatePicker/date-picker'

export default defineComponent({
  name: 'fx-date-picker',
  components: { PickerInput, PickerPopup },
  props: { ...formItemProps, ...datePickerProps, ...pickerProps },
  emits: [...formItemEmits, ...pickerEmits],
  setup(props, ctx) {
    const { handlers } = useDatePicker(props)

    return {
      ...usePicker(props, ctx, { name: 'picker' }, handlers),
      handlers
    }
  }
})
</script>
