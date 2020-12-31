<template>
  <div
    :class="[
      prefix + '-popover',
      prefix + '-pop-dialog',
      prefix + '-popup',
      { visible: visible2, 'no--mask': !showMask }
    ]"
    :style="{ zIndex }"
    v-show="isShow"
  >
    <div :class="[prefix + '-mask']" @click="onMaskClick"></div>
    <div :class="[prefix + '-popover_inner']" ref="inner" :style="innerStyles">
      <i :class="[prefix + '-popover_arrow']" :style="arrowStyles"></i>
      <div :class="[prefix + '-popover_content']">
        <div :class="[prefix + '-pop-dialog_body']">
          <div :class="[prefix + '-popover_text']">{{ content }}</div>
        </div>
        <div :class="[prefix + '-pop-dialog_footer', prefix + '-horizontal-hairline']">
          <fx-button-group :class="[prefix + '-pop-dialog_footer-inner']" pattern="borderless" size="middle">
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
import { SDKKey } from '../../config'

export default {
  name: SDKKey + '-pop-dialog',
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
  computed: {},
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

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-pop-dialog {
  &_footer {
    display: flex;
    flex-direction: column;

    &::before {
      content: '';
    }

    &-inner {
      display: flex;
      justify-content: space-between;
      position: relative;

      > .#{$prefix}-button + .#{$prefix}-button::before {
        height: 100%;
        background-color: $border-color;
      }
    }
  }
}
</style>
