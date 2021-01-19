<template>
  <modal
    :class="[prefix + '-dialog']"
    :visible="visible"
    :show-close="false"
    :mask-closable="maskClosable"
    @show="onShow"
    @shown="onShown"
    @hide="onHide"
    @hidden="onHidden"
    @cancel="onCancel"
    @update:visible="onUpdateVisible"
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
      <fx-button-group
        :class="[prefix + '-dialog_footer-inner']"
        pattern="borderless"
      >
        <fx-button
          v-if="showCancel"
          :class="[prefix + '-dialog_button']"
          type="default"
          @click="onCancelClick"
        >
          {{ cancelText }}
        </fx-button>
        <fx-button
          :class="[prefix + '-dialog_button']"
          type="primary"
          @click="onConfirmClick"
        >
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
import { SDKKey } from '../config'
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
  emits: ['confirm'],
  methods: {
    onConfirmClick() {
      this.$emit('confirm', {})
      this.afterConfirm({})

      this.onUpdateVisible(false)
    }
  }
}
</script>
