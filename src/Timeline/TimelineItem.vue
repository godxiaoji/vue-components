<template>
  <div class="fx-timeline-item fx-horizontal-hairline" ref="root">
    <div class="fx-timeline-item_line"></div>
    <div class="fx-timeline-item_index">
      <slot name="dot">
        <i class="fx-timeline-item_dot" :style="{ borderColor: dotColor }"></i>
      </slot>
    </div>
    <div class="fx-timeline-item_inner">
      <div class="fx-timeline-item_title" v-if="title || $slots.title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div class="fx-timeline-item_content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'fx-timeline-item',
  components: {},
  props: {
    // dot颜色
    dotColor: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: ''
    }
  },
  setup() {
    return {}
  }
})
</script>
