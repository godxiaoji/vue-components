<template>
  <div
    class="fx-drawer fx-popup"
    :class="{ visible: visible2 }"
    :style="popupStyles"
    v-show="isShow"
  >
    <div class="fx-mask" @click="onMaskClick"></div>
    <div
      class="fx-drawer_inner"
      :class="[alignClassName, { 'has--header': hasHeader }]"
    >
      <div v-show="hasHeader" class="fx-drawer_header fx-horizontal-hairline">
        <div class="fx-drawer_header-inner">
          <div class="fx-drawer_title">{{ title }}</div>
          <fx-button
            v-if="showClose"
            class="fx-drawer_close"
            shape="square"
            icon="CloseOutlined"
            pattern="borderless"
            @click="onCloseClick"
          ></fx-button>
        </div>
      </div>
      <div class="fx-drawer_body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import FxButton from '../Button'
import popupMixin from '../util/popup-mixin'
import { createEnumsValidator, getEnumsValue } from '../helpers/validator'

export default {
  name: 'fx-drawer',
  mixins: [popupMixin],
  components: { FxButton },
  props: {
    title: {
      type: String,
      default: null
    },
    placement: {
      validator: createEnumsValidator('placement')
    },
    showClose: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    alignClassName() {
      return 'placement--' + getEnumsValue('placement', this.placement)
    },
    hasHeader() {
      return this.title != null || this.showClose
    }
  }
}
</script>
