<template>
  <teleport to="body">
    <div
      class="fx-popover fx-popup fx-pop-dialog"
      :class="{ visible: visible2, 'no--mask': !showMask }"
      :style="popupStyles"
      v-bind="$attrs"
      v-show="isShow"
    >
      <div class="fx-mask" @click="onMaskClick"></div>
      <div class="fx-popover_inner" ref="inner" :style="innerStyles">
        <i class="fx-popover_arrow" :style="arrowStyles"></i>
        <div class="fx-popover_content">
          <div class="fx-pop-dialog_body">
            <div class="fx-popover_text">{{ content }}</div>
          </div>
          <div class="fx-pop-dialog_footer fx-horizontal-hairline">
            <fx-button-group
              class="fx-pop-dialog_footer-inner"
              pattern="borderless"
              size="middle"
            >
              <fx-button
                v-if="showCancel"
                type="default"
                @click="onCancelClick"
              >
                {{ cancelText }}
              </fx-button>
              <fx-button type="primary" @click="onConfirmClick">
                {{ confirmText }}
              </fx-button>
            </fx-button-group>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { popoverProps, popoverEmits, usePopover } from '@/hooks/popover'
import FxButton from '@/Button'
import FxButtonGroup from '@/ButtonGroup'

export default defineComponent({
  name: 'fx-pop-dialog',
  components: { FxButton, FxButtonGroup },
  props: {
    ...popoverProps,
    content: {
      type: String,
      default: '',
      required: true
    },
    // 展示取消按钮
    showCancel: {
      type: Boolean,
      default: true
    },
    // 取消文本
    cancelText: {
      type: String,
      default: '取消'
    },
    // 确认文本
    confirmText: {
      type: String,
      default: '确定'
    }
  },
  emits: [...popoverEmits, 'confirm'],
  setup(props, ctx) {
    const popoverHook = usePopover(props, ctx)

    function onConfirmClick() {
      popoverHook.customConfirm({})
    }

    return {
      ...popoverHook,
      onConfirmClick
    }
  }
})
</script>
