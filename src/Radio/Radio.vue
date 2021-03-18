<template>
  <label
    class="fx-radio fx-horizontal-hairline"
    :class="{ disabled: disabled2 }"
  >
    <input
      class="fx-radio_input fx-form-input"
      type="radio"
      :name="formName"
      :value="value"
      :disabled="disabled2"
      @change="onChange"
      ref="input"
    />
    <div class="fx-radio_box">
      <icon class="fx-radio_icon" icon="CircleOutlined" />
      <icon class="fx-radio_checked-icon" icon="CheckCircleFilled" />
      <span class="fx-radio_text" v-if="$slots.default">
        <slot></slot>
      </span>
    </div>
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '@/Icon'
import { useCheckboxOrRadio } from '@/hooks/checkbox-radio'

export default defineComponent({
  name: 'fx-radio',
  components: { Icon },
  props: {
    value: {
      type: [Number, String],
      default: ''
    },
    checked: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  emits: ['update:checked'],
  setup(props, ctx) {
    return useCheckboxOrRadio(props, ctx, 'radio')
  }
})
</script>
