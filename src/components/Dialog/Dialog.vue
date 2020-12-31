<template>
  <modal
    :class="[prefix + '-dialog']"
    :visible.sync="visible2"
    :show-close="false"
    :mask-closable="maskClosable"
    @show="onShow"
    @shown="onShown"
    @hide="onHide"
    @hidden="onHidden"
    @cancel="onCancel"
    ref="popup"
  >
    <div :class="[prefix + '-dialog_header']" v-if="title != null">
      {{ title }}
    </div>
    <div :class="[prefix + '-dialog_content']">
      <div :class="[prefix + '-dialog_content-text']" v-if="content != null">
        {{ content }}
      </div>
      <slot v-else></slot>
    </div>
    <div :class="[prefix + '-dialog_footer', prefix + '-horizontal-hairline']">
      <fx-button-group :class="[prefix + '-dialog_footer-inner']" pattern="borderless">
        <fx-button v-if="showCancel" :class="[prefix + '-dialog_button']" type="default" @click="onCancelClick">
          {{ cancelText }}
        </fx-button>
        <fx-button :class="[prefix + '-dialog_button']" type="primary" @click="onConfirmClick">
          {{ confirmText }}
        </fx-button>
      </fx-button-group>
    </div>
  </modal>
</template>

<script>
import FxButton from '../Button/Button.vue'
import FxButtonGroup from '../Button/Group.vue'
import Modal from '../Modal/Modal.vue'
import { SDKKey } from '../../config'
import popupExtendMixin from '../util/popup-extend-mixin'

export default {
  name: SDKKey + '-dialog',
  components: { FxButton, FxButtonGroup, Modal },
  mixins: [popupExtendMixin],
  props: {
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
  data() {
    return { prefix: SDKKey }
  },
  watch: {},
  created() {},
  beforeDestroy() {},
  methods: {
    onConfirmClick() {
      this.$emit('confirm', {})
      this.afterConfirm({})

      this.visible2 = false
    }
  }
}
</script>

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-dialog {
  &_header {
    flex: 1;
    font-size: 17px;
    line-height: 24px;
    height: 24px;
    font-weight: 500;
    color: $title-color;
    margin: 32px 0 0;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-align: center;
    white-space: pre-line;

    + .#{$prefix}-dialog_content {
      margin-top: 0;
    }
  }

  &_content {
    margin-top: 16px;
    padding: 16px 24px;
    font-size: 17px;
    line-height: 24px;
    color: $font-color;

    &-text {
      min-height: 24px;
      max-height: 300px;
      overflow-x: hidden;
      overflow-y: auto;
      word-break: break-all;
      word-wrap: break-word;
      text-align: center;
      white-space: pre-line;
    }
  }

  &_footer {
    display: flex;
    flex-direction: column;
    margin-top: 16px;

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
