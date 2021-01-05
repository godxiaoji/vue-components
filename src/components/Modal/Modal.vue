<template>
  <div
    :class="[prefix + '-modal', prefix + '-popup', { visible: visible2 }]"
    :style="{ zIndex }"
    v-show="isShow"
  >
    <div :class="[prefix + '-mask']" @click="onMaskClick"></div>
    <div :class="[prefix + '-modal_box']" :style="boxStyles">
      <div :class="[prefix + '-modal_box-inner']">
        <slot></slot>
      </div>
      <i
        v-if="showClose"
        :class="[prefix + '-modal_close']"
        @click="onCloseClick"
        ><icon class-name="CloseCircleFilled"></icon
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

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-modal {
  &_box {
    width: 400px;
    box-sizing: border-box;
    transform: scale(0);
    transition: all 0.2s;
    opacity: 0;
    position: relative;
  }

  &_box-inner {
    min-height: 100px;
    border-radius: 4px;
    background-color: #fff;
    overflow: hidden;
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
    bottom: -50px;
    margin: 0 0 0 -16px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    cursor: pointer;

    .#{$prefix}-icon {
      --size: 32px;
      --color: #{$title-color};
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
