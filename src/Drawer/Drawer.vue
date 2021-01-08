<template>
  <div :class="[prefix + '-drawer', prefix + '-popup', { visible: visible2 }]" :style="{ zIndex }" v-show="isShow">
    <div :class="[prefix + '-mask']" @click="onMaskClick"></div>
    <div :class="[prefix + '-drawer_inner', alignClassName, { 'has--header': hasHeader }]">
      <div v-show="hasHeader" :class="[prefix + '-drawer_header', prefix + '-horizontal-hairline']">
        <div :class="[prefix + '-drawer_header-inner']">
          <div :class="[prefix + '-drawer_title']">{{ title }}</div>
          <fx-button
            v-if="showClose"
            :class="[prefix + '-drawer_close']"
            shape="square"
            icon="CloseOutlined"
            pattern="borderless"
            @click="onCloseClick"
          ></fx-button>
        </div>
      </div>
      <div :class="[prefix + '-drawer_body']">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { SDKKey } from '../config'
import popupMixin from '../util/popup-mixin'
import { createEnumsValidator, getEnumsValue } from '../helpers/validator'

export default {
  name: SDKKey + '-drawer',
  mixins: [popupMixin],
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
  data() {
    return {
      prefix: SDKKey
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
