<template>
  <div :class="[prefix + '-image']">
    <img :class="[prefix + '-image_img', modeClassName]" :src="imgSrc" />
  </div>
</template>

<script>
import { addLazyQueue, loadNow, removeComponentFromLazy } from './load-image'
import { CustomEvent } from '../../helpers/events'
import { inArray } from '../../helpers/util'
import { SDKKey } from '../../config'

const MODE_NAMES = [
  'scaleToFill',
  'aspectFit',
  'aspectFill',
  'widthFix',
  'top',
  'bottom',
  'left',
  'right',
  'top left',
  'top right',
  'bottom left',
  'bottom right'
]

const LAZY_PRELOAD = 1.3

export default {
  name: SDKKey + '-image',
  props: {
    // 图片资源地址
    src: {
      type: String,
      default: ''
    },
    mode: {
      validator(value) {
        return inArray(value, MODE_NAMES)
      },
      default: MODE_NAMES[0]
    },
    // 图片懒加载，在即将进入一定范围(preload=1.3)时才开始加载
    lazyLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefix: SDKKey,

      imgSrc: null,
      inViewed: false
    }
  },
  computed: {
    // 计算属性的 getter
    modeClassName() {
      // `this` 指向 vm 实例
      const mode = inArray(this.mode, MODE_NAMES) ? this.mode : MODE_NAMES[0]
      return 'mode--' + mode.replace(/\s+/g, '-')
    }
  },
  watch: {
    src() {
      if (this.lazyLoad) {
        addLazyQueue(this)
      } else {
        loadNow(this)
      }
    }
  },
  ready() {},
  mounted() {
    if (this.src) {
      if (this.lazyLoad) {
        addLazyQueue(this)
      } else {
        loadNow(this)
      }
    }
  },
  updated() {},
  attached() {},
  beforeDestroy() {
    removeComponentFromLazy(this)
  },
  methods: {
    getRect() {
      this.rect = this.$el.getBoundingClientRect()
    },
    checkInView() {
      this.getRect()
      return (
        this.rect.top < window.innerHeight * LAZY_PRELOAD &&
        this.rect.bottom > 0 &&
        this.rect.left < window.innerWidth * LAZY_PRELOAD &&
        this.rect.right > 0
      )
    },
    onLoad(res) {
      if (res.src === this.src) {
        // 防止多次变更图片导致的图片不正确
        this.imgSrc = res.src
      }

      const type = 'load'

      this.$emit(
        type,
        new CustomEvent(
          {
            type,
            currentTarget: this.$el,
            target: this.$el.firstElementChild
          },
          { width: res.naturalWidth, height: res.naturalHeight }
        )
      )
    },
    onError(e) {
      const type = 'error'

      this.$emit(
        type,
        new CustomEvent(
          {
            type,
            currentTarget: this.$el,
            target: this.$el.firstElementChild
          },
          e
        )
      )
    }
  }
}
</script>

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-image {
  position: relative;
  display: inline-block;
  width: 320px;
  height: 240px;
  overflow: hidden;

  &_img {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;

    &.mode--scaleToFill {
      object-fit: fill;
    }

    &.mode--aspectFit {
      object-fit: contain;
    }

    &.mode--aspectFill {
      object-fit: cover;
    }

    &.mode--widthFix {
      height: auto;
    }

    &.mode--top,
    &.mode--bottom {
      left: 50%;
      width: auto;
      height: auto;
      transform: translateX(-50%);
    }

    &.mode--top {
      top: 0;
    }

    &.mode--bottom {
      bottom: 0;
    }

    &.mode--center {
      top: 50%;
      left: 50%;
      width: auto;
      height: auto;
      transform: translate(-50%, -50%);
    }

    &.mode--left,
    &.mode--right {
      top: 50%;
      width: auto;
      height: auto;
      transform: translateY(-50%);
    }

    &.mode--left {
      left: 0;
    }

    &.mode--right {
      right: 0;
    }

    &.mode--top-left {
      top: 0;
      left: 0;
      width: auto;
      height: auto;
    }

    &.mode--top-right {
      top: 0;
      right: 0;
      width: auto;
      height: auto;
    }

    &.mode--bottom-left {
      bottom: 0;
      left: 0;
      width: auto;
      height: auto;
    }

    &.mode--bottom-right {
      right: 0;
      bottom: 0;
      width: auto;
      height: auto;
    }
  }
}
</style>
