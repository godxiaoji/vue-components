<template>
  <div
    :class="[prefix + '-drawer', { visible: visible2 }]"
    :style="{ zIndex }"
    v-show="isShow"
  >
    <div :class="[prefix + '-drawer_overlay']" @click="onOverlayClick"></div>
    <div
      :class="[
        prefix + '-drawer_inner',
        { 'has--title': !!title },
        alignClassName
      ]"
      @mousedown.prevent="noop"
    >
      <div :class="[prefix + '-drawer_head', prefix + '-horizontal-hairline']">
        <div :class="[prefix + '-drawer_title']">{{ title }}</div>
      </div>
      <div :class="[prefix + '-drawer_body']">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { SDKKey } from '../../config'
import { addClassName, removeClassName, removeEl } from '../../helpers/dom'
import { getNewZIndex } from '../../helpers/popup'
import { inArray } from '../../helpers/util'

const DRAWER_ALIGNS = ['bottom', 'up', 'left', 'right']

export default {
  name: SDKKey + '-drawer',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: null
    },
    align: {
      validator(val) {
        return inArray(val, DRAWER_ALIGNS)
      },
      default: DRAWER_ALIGNS[0]
    }
  },
  data() {
    return {
      prefix: SDKKey,

      isShow: false,
      visible2: false,

      zIndex: 2000
    }
  },
  computed: {
    alignClassName() {
      return (
        'algin--' +
        (inArray(this.align, DRAWER_ALIGNS) ? this.align : DRAWER_ALIGNS[0])
      )
    }
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        this.show()
      } else {
        this.hide()
      }
    }
  },
  created() {},
  ready() {},
  mounted() {
    if (this.visible) {
      this.show()
    } else {
      this.hide()
    }
  },
  updated() {},
  attached() {},
  methods: {
    onOverlayClick() {
      if (this.isShowing) {
        return
      }

      this.hide()
    },

    noop() {},

    clearTimer() {
      this.isShowing = false
      this.isHiding = false
      clearTimeout(this.visibleTimer)
    },

    show() {
      this.isShowing = true

      clearTimeout(this.visibleTimer)
      addClassName(document.body, SDKKey + '-overflow-hidden')

      this.zIndex = getNewZIndex()
      this.isShow = true

      this.visibleTimer = setTimeout(() => {
        this.isShowing = false
        this.visible2 = true
      }, 17)

      if (!this.visible) {
        this.$emit('update:visible', true)
      }

      const type = 'show'
      this.$emit(type, {})
    },
    hide() {
      if (this.isHiding) {
        return
      }
      this.isHiding = true

      this.clearTimer()
      removeClassName(document.body, SDKKey + '-overflow-hidden')
      this.visible2 = false

      this.visibleTimer = setTimeout(() => {
        this.isShow = false
        this.isHiding = false
      }, 220)

      if (this.visible) {
        this.$emit('update:visible', false)
      }

      const type = 'hide'
      this.$emit(type, {})
    },
    destroy() {
      this.$destroy()

      removeEl(this.$el)
    }
  }
}
</script>

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-drawer {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  width: 100vw;
  height: 100vh;

  &_overlay {
    display: block;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: opacity 0.2s;
  }

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
    height: 410px;

    &.algin--left,
    &.algin--right {
      max-width: 90%;
      width: auto;
      height: 100%;
      top: 0;
      transform: translate3d(-100vw, 0, 0);
    }

    &.algin--right {
      left: auto;
      right: 0;
      transform: translate3d(100vw, 0, 0);
    }
  }

  &_head {
    height: 48px;
    flex-shrink: 0;
    flex-direction: column;
    box-sizing: border-box;
    min-width: 100px;
    display: none;

    .#{$prefix}-drawer_inner.has--title & {
      display: flex;
    }

    &::after {
      content: '';
    }
  }

  &_title {
    flex: 1;
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 17px;
    font-weight: 500;
    color: $title-color;
    padding: 0 12px;
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
      &_overlay {
        opacity: 1;
      }

      &_inner {
        transform: translate3d(0, 0, 0);
      }
    }
  }
}
</style>
