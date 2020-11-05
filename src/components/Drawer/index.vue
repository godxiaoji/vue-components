<template>
  <div
    :class="[prefix + '-drawer', prefix + '-popup', { visible: visible2 }]"
    :style="{ zIndex }"
    v-show="isShow"
  >
    <div :class="[prefix + '-mask']" @click="onMaskClick"></div>
    <div
      :class="[prefix + '-drawer_inner', alignClassName]"
      @mousedown.prevent="noop"
    >
      <div
        v-show="title != null || showClose"
        :class="[prefix + '-drawer_header', prefix + '-horizontal-hairline']"
      >
        <div :class="[prefix + '-drawer_header-inner']">
          <div :class="[prefix + '-drawer_title']">{{ title }}</div>
          <fx-button
            v-if="showClose"
            :class="[prefix + '-drawer_close']"
            shape="square"
            icon="CloseOutlined"
            pattern="borderless"
            @click="onCloseClick()"
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
import { inArray } from '../../helpers/util'
import popupMixin from '../util/popup-mixin'

const DRAWER_ALIGNS = ['bottom', 'top', 'left', 'right']

export default {
  name: SDKKey + '-drawer',
  mixins: [popupMixin],
  props: {
    title: {
      type: String,
      default: null
    },
    align: {
      validator(val) {
        return inArray(val, DRAWER_ALIGNS)
      },
      default: DRAWER_ALIGNS[0]
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
      return (
        'align--' +
        (inArray(this.align, DRAWER_ALIGNS) ? this.align : DRAWER_ALIGNS[0])
      )
    }
  },
  watch: {},
  created() {},
  ready() {},
  updated() {},
  attached() {},
  methods: {
    onCloseClick() {
      this.$emit('close-click', {})
      this.hide()
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
    box-shadow: 0 -5px 10px rgba(0, 0, 0, 0.25);
    border-radius: 0;
    transform: translate3d(0, 100vh, 0);
    transition: transform 0.2s;
    background-color: #fff;
    height: 360px;

    &.align--left,
    &.align--right {
      min-width: 100px;
      max-width: 90%;
      width: auto;
      height: 100%;
      top: 0;
      transform: translate3d(-100vw, 0, 0);
    }

    &.align--right {
      left: auto;
      right: 0;
      transform: translate3d(100vw, 0, 0);
    }

    &.align--top {
      top: 0;
      bottom: auto;
      transform: translate3d(0, -100vh, 0);
      height: 260px;
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
  }

  &_title {
    flex: 1;
    font-size: 17px;
    line-height: 48px;
    height: 48px;
    font-weight: 500;
    color: $title-color;
    padding: 0 0 0 12px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
  }

  &_close.type--default {
    flex-shrink: 0;
    border-radius: 0;
    --button-font-color: #{$font3-color};
  }

  &_body {
    flex-shrink: 1;
    flex-grow: 1;

    .#{$prefix}-drawer_inner.has--title & {
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
