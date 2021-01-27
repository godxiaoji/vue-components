<template>
  <div
    class="fx-popover fx-popup fx-pop-dialog"
    :class="{ visible: visible2, 'no--mask': !showMask }"
    :style="popupStyles"
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
            <fx-button v-if="showCancel" type="default" @click="onCancelClick">
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
</template>

<script>
import Popover from './Popover.vue'
import FxButton from '../Button/Button.vue'
import FxButtonGroup from '../Button/Group.vue'

export default {
  name: 'fx-pop-dialog',
  extends: Popover,
  components: { FxButton, FxButtonGroup },
  props: {
    content: {
      type: String,
      default: '',
      required: true
    },
    showCancel: {
      type: Boolean,
      default: true
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '确定'
    }
  },
  methods: {
    onConfirmClick() {
      this.$emit('confirm', {})
      this.afterConfirm({})

      this.hide()
    },
    afterConfirm() {}
  }
}
</script>
