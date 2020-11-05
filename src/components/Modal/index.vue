<template>
  <div
    :class="[prefix + '-modal', prefix + '-popup', { visible: visible2 }]"
    :style="{ zIndex }"
    v-show="isShow"
  >
    <div :class="[prefix + '-mask']" @click="onMaskClick"></div>
    <div :class="[prefix + '-modal_box']" :style="boxStyles">
      <slot></slot>
      <i
        v-if="showClose"
        :class="[prefix + '-modal_close']"
        @click="onCloseClick"
        ><icon class-name="CloseOutlined"></icon
      ></i>
    </div>
  </div>
</template>

<script>
import Icon from '../Icon'
import { SDKKey } from '../../config'
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
    maskClosable: {
      type: Boolean,
      default: false
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
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    onMaskClick() {
      if (this.maskClosable) {
        this.$emit('mask-click', {})
        this.hide()
      }
    },
    onCloseClick() {
      this.$emit('close-click', {})
      this.hide()
    }
  }
}
</script>

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-modal {
  &_box {
    width: 400px;
    box-sizing: border-box;
    border-radius: 4px;
    background-color: #fff;
    transform: scale(0);
    transition: all 0.2s;
    opacity: 0;
    position: relative;
  }

  &.visible {
    .#{$prefix}-modal_box {
      opacity: 1;
      transform: scale(1);
    }
  }

  &_close {
    position: absolute;
    left: 50%;
    bottom: -56px;
    margin: 0 0 0 -20px;
    background-color: rgba($color: $black-color, $alpha: 0.65);
    border: 2px solid #fff;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    cursor: pointer;

    .#{$prefix}-icon {
      --size: 24px;
      --color: #fff;
    }
  }
}

@media screen and (max-width: 575px) {
  .#{$prefix}-modal {
    &_box {
      width: calc(100% - 96px);
    }
  }
}
</style>
