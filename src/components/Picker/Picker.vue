<template>
  <div
    :class="[
      prefix + '-picker',
      {
        disabled
      }
    ]"
  >
    <div
      :class="[prefix + '-input', { 'has--value': formLabelString }]"
      :disabled="disabled"
      @click="onFieldClick"
    >
      <div
        :class="[prefix + '-input_input', { placeholder: !formLabelString }]"
      >
        {{ formLabelString || placeholder }}
      </div>
      <icon
        :class="[prefix + '-input_arrow']"
        class-name="RightOutlined"
      />
      <input
        :class="[prefix + '-input_cover']"
        type="text"
        readonly
        :name="formName"
        :disabled="disabled"
        :value="formValueString"
      />
    </div>
  </div>
</template>

<script>
import PickerPopup from './Popup.vue'
import { SDKKey } from '../../config'
import pickerMixin from '../util/mulit-selector/picker-mixin'

export default {
  name: SDKKey + '-picker',
  mixins: [pickerMixin],
  data() {
    return {
      prefix: SDKKey,
      compName: 'picker'
    }
  },
  created() {
    this.Popup = PickerPopup
  }
}
</script>

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-picker {
  display: flex;
  width: 100%;
  position: relative;
}
</style>
