<template>
  <div
    class="fx-cascader"
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
    <cascader-popup
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
import CascaderPopup from '@/CascaderPopup'
import PickerInput from '@/Picker/PickerInput.vue'
import { formItemEmits, formItemProps } from '@/hooks/form'
import { usePicker, pickerEmits, pickerProps } from '@/Picker/picker'
import pickerCommonProps from '@/Picker/props'

export default defineComponent({
  name: 'fx-cascader',
  components: { CascaderPopup, PickerInput },
  props: { ...formItemProps, ...pickerCommonProps, ...pickerProps },
  emits: [...formItemEmits, ...pickerEmits],
  setup(props, ctx) {
    return {
      ...usePicker(props, ctx, { name: 'cascader' }, {})
    }
  }
})
</script>
