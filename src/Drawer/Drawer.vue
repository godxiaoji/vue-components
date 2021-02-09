<template>
  <teleport to="body">
    <div
      class="fx-drawer fx-popup"
      :class="{ visible: visible2 }"
      :style="popupStyles"
      v-bind="$attrs"
      v-show="isShow"
    >
      <div class="fx-mask" @click="onMaskClick"></div>
      <div
        class="fx-drawer_inner"
        :class="[alignClassName, { 'has--header': hasHeader }]"
        :style="innerStyles"
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
  </teleport>
</template>

<script>
import safeAreaInsets from 'safe-area-insets'
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
    },
    // 是否开启安全区
    enableSafeAreaInsets: {
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
      return this.title != null || this.showClose
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
  mounted() {
    safeAreaInsets.onChange(this.updateSafeAreaInsets)
  },
  beforeUnmount() {
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
    }
  }
}
</script>
