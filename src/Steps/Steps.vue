<template>
  <div class="fx-steps" :class="{ dot, horizontal }" ref="list">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { stepsEmits, useStepList } from '@/Steps/steps'

export default defineComponent({
  name: 'fx-steps',
  props: {
    activeIndex: {
      type: Number,
      default: 0
    },
    dot: {
      type: Boolean,
      default: false
    },
    horizontal: {
      type: Boolean,
      default: false
    }
  },
  emits: [...stepsEmits],
  setup(props, ctx) {
    return { ...useStepList(props, ctx, 'steps') }
  }
})
</script>
