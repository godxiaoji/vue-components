<template>
  <teleport to="body">
    <div
      class="fx-modal fx-popup"
      :class="{ visible: visible2 }"
      :style="popupStyles"
      v-bind="$attrs"
      v-show="isShow"
    >
      <div class="fx-mask" @click="onMaskClick"></div>
      <div
        class="fx-modal_box"
        :style="{
          width
        }"
      >
        <div class="fx-modal_box-inner">
          <slot></slot>
        </div>
        <i v-if="showClose" class="fx-modal_close" @click="onCloseClick">
          <icon icon="CloseCircleFilled"></icon>
        </i>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { popupEmits, popupProps, usePopup } from '@/hooks/popup'
import Icon from '@/Icon'

export default defineComponent({
  name: 'fx-modal',
  components: { Icon },
  props: {
    ...popupProps,
    width: {
      type: String,
      default: null
    },
    showClose: {
      type: Boolean,
      default: true
    }
  },
  emits: popupEmits,
  setup(props, ctx) {
    const popup = usePopup(props, ctx, {})

    return {
      ...popup
    }
  }
})
</script>
