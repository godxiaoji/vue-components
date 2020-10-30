<template>
  <modal
    :visible.sync="visible"
    @click="onClose"
    :show-close="false"
    :z-index="zIndex"
    :mask-closable="maskClosable"
    ref="modal"
  >
    <template #header>
      {{ title }}
    </template>
    <div :class="[prefix + '-dialog_content']">
      <template v-if="content">
        {{ content }}
      </template>
      <slot v-else></slot>
    </div>
    <template #footer>
      <fx-button
        v-show="showCancel"
        :class="[prefix + '-modal_button']"
        type="default"
        @click="onCancelClick"
      >
        {{ cancelText }}
      </fx-button>
      <fx-button
        :class="[prefix + '-modal_button']"
        type="primary"
        @click="onConfirmClick"
      >
        {{ confirmText }}
      </fx-button>
    </template>
  </modal>
</template>

<script>
import FxButton from '../Button'
import Modal from '../Modal'
import { CustomEvent } from '../../helpers/events'
import { SDKKey } from '../../config'

export default {
  name: SDKKey + '-dialog',
  components: { FxButton, Modal },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '提示'
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
    zIndex: {
      type: Number,
      default: 2000
    },
    content: {
      type: String,
      default: ''
    }
  },
  data() {
    return { prefix: SDKKey }
  },
  created() {},
  beforeDestroy() {},
  methods: {
    onCancelClick(e) {
      const type = 'cancel'

      this.$emit(
        type,
        new CustomEvent(
          {
            type,
            currentTarget: this.$el
          },
          {}
        )
      )

      this.$refs.close.close(e)
    },
    onConfirmClick(e) {
      const type = 'confirm'

      this.$emit(
        type,
        new CustomEvent(
          {
            type,
            currentTarget: this.$el
          },
          {}
        )
      )

      this.$refs.close.close(e)
    },
    onClose() {
      this.$emit('update:visible', false)

      const type = 'close'

      this.$emit(
        type,
        new CustomEvent(
          {
            type,
            currentTarget: this.$el
          },
          {}
        )
      )
    }
  }
}
</script>

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-dialog {
  &_content {
    padding: 16px 24px;
    max-height: 300px;
    overflow-x: hidden;
    overflow-y: auto;
    word-break: break-all;
    word-wrap: break-word;
    text-align: center;
  }
}
</style>
