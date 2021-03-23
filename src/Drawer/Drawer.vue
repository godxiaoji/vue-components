<template>
  <div
    class="fx-drawer fx-popup"
    :class="{ visible: visible2, 'no--mask': !showMask }"
    :style="popupStyles"
    v-show="isShow"
  >
    <div class="fx-mask" @click="onMaskClick"></div>
    <div
      class="fx-drawer_inner fx-horizontal-hairline"
      :class="[alignClassName, { 'has--header': hasHeader }]"
      :style="innerStyles"
    >
      <nav-bar
        v-if="hasHeader"
        class="fx-drawer_header"
        :title="title"
        :left-buttons="showCancel ? [{ text: '取消', type: 'primary' }] : []"
        :right-buttons="
          showClose
            ? [{ text: '关闭', type: 'primary' }]
            : showConfirm
            ? [{ text: '完成', type: 'primary' }]
            : []
        "
        :icon-only="false"
        @left-button-click="onHeaderLeftClick"
        @right-button-click="onHeaderRightClick"
      >
      </nav-bar>
      <div class="fx-drawer_body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import safeAreaInsets from 'safe-area-insets'
import NavBar from '../NavBar'
import popupMixin from '../util/popup-mixin'
import { createEnumsValidator, getEnumsValue } from '../helpers/validator'

export default {
  name: 'fx-drawer',
  mixins: [popupMixin],
  components: { NavBar },
  props: {
    title: {
      type: String,
      default: null
    },
    placement: {
      validator: createEnumsValidator('placement')
    },
    showCancel: {
      type: Boolean,
      default: false
    },
    showClose: {
      type: Boolean,
      default: false
    },
    showConfirm: {
      type: Boolean,
      default: false
    },
    // 是否开启安全区
    enableSafeAreaInsets: {
      type: Boolean,
      default: true
    },
    showMask: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      safeAreaInsets: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }
    }
  },
  computed: {
    alignClassName() {
      return 'placement--' + getEnumsValue('placement', this.placement)
    },
    hasHeader() {
      return (
        this.title != null ||
        this.showClose ||
        this.showCancel ||
        this.showConfirm
      )
    },
    innerStyles() {
      const placement = getEnumsValue('placement', this.placement)

      let { left, top, right, bottom } = this.safeAreaInsets

      if (placement === 'top') {
        bottom = 0
      } else if (placement === 'bottom') {
        top = 0
      } else if (placement === 'left') {
        right = 0
      } else if (placement === 'right') {
        left = 0
      }

      return {
        padding: top + 'px ' + right + 'px ' + bottom + 'px ' + left + 'px'
      }
    }
  },
  watch: {
    showMask: {
      immediate: true,
      handler(val) {
        this.useBlur = !val
      }
    }
  },
  mounted() {
    safeAreaInsets.onChange(this.updateSafeAreaInsets)
  },
  beforeDestroy() {
    safeAreaInsets.offChange(this.updateSafeAreaInsets)
  },
  methods: {
    updateSafeAreaInsets() {
      if (this.enableSafeAreaInsets) {
        this.safeAreaInsets = {
          top: safeAreaInsets.top,
          left: safeAreaInsets.left,
          right: safeAreaInsets.right,
          bottom: safeAreaInsets.bottom
        }
      } else {
        this.safeAreaInsets = {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }
      }
    },
    onHeaderLeftClick() {
      this.onCancelClick()
    },
    onHeaderRightClick() {
      if (this.showClose) {
        this.onCloseClick()
      } else if (this.showConfirm) {
        this.customConfirm({})
      }
    }
  }
}
</script>
