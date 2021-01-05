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
import { SDKKey } from '../../config'
import popupMixin from '../util/popup-mixin'
import { createEnumsValidator, getEnumsValue } from '../../helpers/validator'

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

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-drawer {
  &_inner {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    border: none;
    border-radius: 0;
    transform: translate3d(0, 100%, 0);
    transition: transform 0.2s;
    background-color: #fff;
    min-height: 100px;

    &.placement--left,
    &.placement--right {
      min-width: 100px;
      max-width: 90%;
      min-height: auto;
      width: auto;
      height: 100%;
      top: 0;
      transform: translate3d(-100%, 0, 0);
    }

    &.placement--right {
      left: auto;
      right: 0;
      transform: translate3d(100%, 0, 0);
    }

    &.placement--top {
      top: 0;
      bottom: auto;
      transform: translate3d(0, -100%, 0);
    }
  }

  &_header {
    flex-shrink: 0;
    flex-direction: column;
    box-sizing: border-box;
    display: flex;

    &::after {
      content: '';
    }
  }

  &_header-inner {
    height: 48px;
    box-sizing: border-box;
    display: flex;
    position: relative;
  }

  &_title {
    flex: 1;
    font-size: 17px;
    font-weight: 500;
    line-height: 48px;
    height: 48px;
    color: $title-color;
    padding: 0 12px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;

    .#{$prefix}-drawer_inner.placement--top &,
    .#{$prefix}-drawer_inner.placement--bottom & {
      text-align: center;
    }
  }

  &_close.type--default {
    position: absolute;
    top: 0;
    right: 0;
    flex-shrink: 0;
    border-radius: 0;
    --button-font-color: #{$font3-color};
  }

  &_body {
    flex-shrink: 1;
    flex-grow: 1;

    .#{$prefix}-drawer_inner.has--header & {
      height: calc(100% - 48px);
    }
  }

  &.visible {
    .#{$prefix}-drawer {
      &_inner {
        transform: translate3d(0, 0, 0);
      }
    }
  }
}
</style>
