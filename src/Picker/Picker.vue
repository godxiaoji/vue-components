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
      :class="[prefix + '-input', { 'has--value': formLabelString, disabled }]"
      @click="onFieldClick"
    >
      <div
        :class="[prefix + '-input_input', { placeholder: !formLabelString }]"
      >
        {{ formLabelString || placeholder }}
      </div>
      <icon :class="[prefix + '-input_arrow']" icon="RightOutlined" />
      <input
        :class="[prefix + '-input_cover']"
        type="text"
        readonly
        :name="formName"
        :disabled="disabled"
        :value="formValueString"
      />
    </div>
    <picker-popup
      v-bind="$props"
      :title="placeholder"
      :visible.sync="popupVisible"
      v-if="isInitPopup"
      @change="onChange"
      ref="popup"
    />
  </div>
</template>

<script>
import PickerPopup from './Popup.vue'
import { SDKKey } from '../config'
import pickerMixin from '../util/mulit-selector/picker-mixin'

export default {
  name: SDKKey + '-picker',
  mixins: [pickerMixin],
  components: { PickerPopup },
  data() {
    return {
      prefix: SDKKey,
      compName: 'picker'
    }
  }
}
</script>
