<template>
  <div class="fx-pagination">
    <button
      class="fx-pagination_prev"
      :disabled="current <= 1"
      @click="onClick('prev')"
    >
      <slot name="prev">
        <icon icon="LeftOutlined" />
      </slot>
    </button>
    <div class="fx-pagination_content">
      <slot :current="current" :total="total">{{ current }} / {{ total }}</slot>
    </div>
    <button
      class="fx-pagination_next"
      :disabled="current >= total"
      @click="onClick('next')"
    >
      <slot name="next">
        <icon icon="RightOutlined" />
      </slot>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '@/Icon'

export default defineComponent({
  name: 'fx-pagination',
  components: { Icon },
  props: {
    // 栅格占据的列数
    current: {
      type: Number,
      default: 1
    },
    // 栅格左侧的间隔格数
    total: {
      type: Number,
      default: 1
    }
  },
  emits: ['update:current', 'change'],
  setup(props, { emit }) {
    function onClick(type: string) {
      const newPageNum = type === 'next' ? props.current + 1 : props.current - 1

      emit('update:current', newPageNum)
      emit('change', {
        type: 'change',
        current: newPageNum,
        total: props.total
      })
    }

    return { onClick }
  }
})
</script>
