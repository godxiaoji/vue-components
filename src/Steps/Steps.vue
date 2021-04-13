<template>
  <div class="fx-steps" :class="{ dot }" ref="list">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, toRef } from 'vue'
import { useList } from '@/hooks/list'

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
    }
  },
  emits: ['update:activeIndex'],
  setup(props, { emit }) {
    const { list } = useList('steps', $items => {
      if (props.activeIndex >= $items.length) {
        emit('update:activeIndex', $items.length - 1)
      }
    })

    provide('fxStepsActiveIndex', toRef(props, 'activeIndex'))

    return { list }
  }
})
</script>
