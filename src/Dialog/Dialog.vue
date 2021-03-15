<template>
  <modal
    class="fx-dialog"
    :visible="visible"
    :show-close="false"
    :mask-closable="maskClosable"
    @visible-state-change="onVisibleStateChange"
    @cancel="onCancel"
    @update:visible="onUpdateVisible"
    ref="popup"
  >
    <div class="fx-dialog_header" v-if="title != null">
      {{ title }}
    </div>
    <div class="fx-dialog_content">
      <div class="fx-dialog_content-text" v-if="content != null">
        {{ content }}
      </div>
      <slot v-else></slot>
    </div>
    <div class="fx-dialog_footer fx-horizontal-hairline">
      <fx-button-group class="fx-dialog_footer-inner" pattern="borderless">
        <fx-button
          v-if="showCancel"
          class="fx-dialog_button"
          type="default"
          @click="onCancelClick"
        >
          {{ cancelText }}
        </fx-button>
        <fx-button
          class="fx-dialog_button"
          type="primary"
          @click="onConfirmClick"
        >
          {{ confirmText }}
        </fx-button>
      </fx-button-group>
    </div>
  </modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FxButton from '@/Button'
import FxButtonGroup from '@/ButtonGroup'
import Modal from '@/Modal'
import {
  usePopupExtend,
  popupExtendEmits,
  popupExtendProps
} from '@/utils/popup'

export default defineComponent({
  name: 'fx-dialog',
  components: { FxButton, FxButtonGroup, Modal },
  props: {
    ...popupExtendProps,
    title: {
      type: String,
      default: null
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    maskClosable: {
      type: Boolean,
      default: false
    },
    showCancel: {
      type: Boolean,
      default: true
    },
    content: {
      type: String,
      default: null
    }
  },
  emits: popupExtendEmits,
  setup(props, ctx) {
    const popup = usePopupExtend(ctx)

    function onConfirmClick() {
      ctx.emit('confirm', {})
      popup.customConfirm({})
    }

    return {
      ...popup,
      onConfirmClick
    }
  }
})
</script>
