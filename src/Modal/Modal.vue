<template>
  <div
    class="fx-modal fx-popup"
    :class="{ visible: visible2 }"
    :style="popupStyles"
    v-show="isShow"
  >
    <div class="fx-mask" @click="onMaskClick"></div>
    <div class="fx-modal_box" :style="boxStyles">
      <div class="fx-modal_box-inner">
        <slot></slot>
      </div>
      <i v-if="showClose" class="fx-modal_close" @click="onCloseClick"
        ><icon icon="CloseCircleFilled"></icon
      ></i>
    </div>
  </div>
</template>

<script>
import Icon from '../Icon'
import popupMixin from '../util/popup-mixin'

export default {
  name: 'fx-modal',
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
