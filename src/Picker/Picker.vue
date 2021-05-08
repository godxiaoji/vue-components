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
      v-bind="$props"
      :title="placeholder"
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
import pickerCommonProps from '@/Picker/props'

export default defineComponent({
  name: 'fx-picker',
  components: { PickerInput, PickerPopup },
  props: { ...formItemProps, ...pickerCommonProps, ...pickerProps },
  emits: [...formItemEmits, ...pickerEmits],
  setup(props, ctx) {
    return {
      ...usePicker(props, ctx, { name: 'picker' }, {})
    }
  }
})
</script>
