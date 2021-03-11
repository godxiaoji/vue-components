<template>
  <div
    class="fx-picker"
    :class="[
      {
        disabled
      }
    ]"
  >
    <div
      class="fx-input"
      :class="{ 'has--value': formLabelString, disabled }"
      @click="onFieldClick"
    >
      <div class="fx-input_input" :class="{ placeholder: !formLabelString }">
        {{ formLabelString || placeholder }}
      </div>
      <icon class="fx-input_arrow" icon="RightOutlined" />
      <input
        class="fx-input_cover"
        type="text"
        readonly
        :name="formName"
        :disabled="disabled"
        :value="formValueString"
        ref="input"
      />
    </div>
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
import PickerPopup from './PickerPopup.vue'
import Icon from '../Icon'
import { formItemEmits, formItemProps } from '../Form/form-item'
import { usePicker, pickerEmits, pickerProps } from '../multi-selector/picker'
import commonProps from '../multi-selector/props'

export default defineComponent({
  name: 'fx-picker',
  components: { PickerPopup, Icon },
  props: { ...formItemProps, ...commonProps, ...pickerProps },
  emits: [...formItemEmits, ...pickerEmits],
  setup(props, ctx) {
    return {
      ...usePicker(props, ctx, { name: 'picker' })
    }
  }
})
</script>
