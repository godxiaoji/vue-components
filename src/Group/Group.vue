<template>
  <div
    class="fx-group fx-horizontal-hairline"
    :class="{ 'strong-header': !!strongHeader }"
  >
    <div class="fx-group_header">
      <div class="fx-group_title">{{ title }}</div>
      <div class="fx-group_more">
        <slot name="header"></slot>
      </div>
    </div>
    <div class="fx-group_body fx-horizontal-hairline hairline-reverse">
      <div class="fx-group_body-inner">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'fx-group',
  props: {
    title: {
      type: String,
      required: true
    },
    strongHeader: {
      type: Boolean,
      default: false
    }
  }
})
</script>
