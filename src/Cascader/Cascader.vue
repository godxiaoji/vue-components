<template>
  <div
    class="fx-cascader"
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
      />
    </div>
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

<script>
import CascaderPopup from './CascaderPopup.vue'
import pickerMixin from '../util/multi-selector/picker-mixin'

export default {
  name: 'fx-cascader',
  mixins: [pickerMixin],
  components: { CascaderPopup },
  data() {
    return {
      compName: 'cascader'
    }
  }
}
</script>
