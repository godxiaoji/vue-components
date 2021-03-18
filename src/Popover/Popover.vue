<template>
  <teleport to="body">
    <div
      class="fx-popover fx-popup"
      :class="{ visible: visible2, 'no--mask': !showMask }"
      :style="popupStyles"
      v-bind="$attrs"
      v-show="isShow"
    >
      <div class="fx-mask" @click="onMaskClick"></div>
      <div class="fx-popover_inner" ref="inner" :style="innerStyles">
        <i class="fx-popover_arrow" :style="arrowStyles"></i>
        <div class="fx-popover_content">
          <slot>
            <div class="fx-popover_text">{{ content }}</div>
          </slot>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { popoverProps, popoverEmits, usePopover } from '@/hooks/popover'

export default defineComponent({
  name: 'fx-popover',
  props: {
    ...popoverProps,
    content: {
      type: String,
      default: ''
    }
  },
  emits: popoverEmits,
  setup(props, ctx) {
    const popoverHook = usePopover(props, ctx)

    return {
      ...popoverHook
    }
  }
})
</script>
