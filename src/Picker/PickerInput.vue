<template>
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
      class="fx-input_cover fx-form-input"
      type="text"
      readonly
      :name="formName"
      :disabled="disabled"
      :value="formValueString"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '@/Icon'

export default defineComponent({
  name: 'fx-picker-input',
  components: { Icon },
  props: {
    disabled: Boolean,
    formValueString: String,
    formLabelString: String,
    formName: String,
    placeholder: String
  },
  emits: ['field-click'],
  setup(props, { emit }) {
    function onFieldClick() {
      emit('field-click', {})
    }

    return {
      onFieldClick
    }
  }
})
</script>
