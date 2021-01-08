<template>
  <div :class="[prefix + '-modal', prefix + '-popup', { visible: visible2 }]" :style="{ zIndex }" v-show="isShow">
    <div :class="[prefix + '-mask']" @click="onMaskClick"></div>
    <div :class="[prefix + '-modal_box']" :style="boxStyles">
      <div :class="[prefix + '-modal_box-inner']">
        <slot></slot>
      </div>
      <i v-if="showClose" :class="[prefix + '-modal_close']" @click="onCloseClick"
        ><icon class-name="CloseCircleFilled"></icon
      ></i>
    </div>
  </div>
</template>

<script>
import Icon from '../Icon'
import { SDKKey } from '../config'
import popupMixin from '../util/popup-mixin'

export default {
  name: SDKKey + '-modal',
  components: { Icon },
  mixins: [popupMixin],
  props: {
    width: {
      type: String,
      default: ''
    },
    showClose: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return { prefix: SDKKey }
  },
  computed: {
    boxStyles() {
      const styles = {}

      if (this.width) {
        styles.width = this.width
      }

      return styles
    }
  }
}
</script>
