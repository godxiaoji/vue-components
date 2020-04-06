<template>
  <div class="ly-image">
    <img :class="[modeClassName]" :src="imgSrc" />
  </div>
</template>

<script>
import lazy from './lazy'
import { getHandleEvent } from '../../helpers/events'
import { inArray } from '../../helpers/util'

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

export default {
  name: 'app-image',
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
    src(val) {
      if (this.lazyLoad) {
        lazy.addLazyBox(this)
      } else {
        this.imgSrc = val
      }
    }
  },
  ready() {},
  mounted() {
    if (this.src) {
      if (this.lazyLoad) {
        lazy.addLazyBox(this)
      } else {
        this.imgSrc = this.src
      }
    }
  },
  updated() {},
  attached() {},
  beforeDestroy() {
    lazy.removeComponent(this)
  },
  methods: {
    getRect() {
      this.rect = this.$el.getBoundingClientRect()
    },
    checkInView() {
      this.getRect()
      return (
        this.rect.top < window.innerHeight * lazy.options.preLoad &&
        this.rect.bottom > 0 &&
        this.rect.left < window.innerWidth * lazy.options.preLoad &&
        this.rect.right > 0
      )
    },
    onLoad(res) {
      if (res.src === this.src) {
        // 防止多次变更图片导致的图片不正确
        this.imgSrc = res.src
      }

      this.$emit(
        'load',
        getHandleEvent(this.$el, res.event, {
          width: res.naturalWidth,
          height: res.naturalHeight
        })
      )
    },
    onError(e) {
      this.$emit(
        'error',
        getHandleEvent(this.$el, e, {
          errMsg: e.message
        })
      )
    }
  }
}
</script>

<style>
.ly-image {
  position: relative;
  display: inline-block;
  width: 320px;
  height: 240px;
  overflow: hidden;
}

.ly-image img {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
}

.ly-image img.mode--scaleToFill {
  object-fit: fill;
}

.ly-image img.mode--aspectFit {
  object-fit: contain;
}

.ly-image img.mode--aspectFill {
  object-fit: cover;
}

.ly-image img.mode--widthFix {
  height: auto;
}

.ly-image img.mode--top,
.ly-image img.mode--bottom {
  left: 50%;
  width: auto;
  height: auto;
  transform: translateX(-50%);
}

.ly-image img.mode--top {
  top: 0;
}

.ly-image img.mode--bottom {
  bottom: 0;
}

.ly-image img.mode--center {
  top: 50%;
  left: 50%;
  width: auto;
  height: auto;
  transform: translate(-50%, -50%);
}

.ly-image img.mode--left,
.ly-image img.mode--right {
  top: 50%;
  width: auto;
  height: auto;
  transform: translateY(-50%);
}

.ly-image img.mode--left {
  left: 0;
}

.ly-image img.mode--right {
  right: 0;
}

.ly-image img.mode--top-left {
  top: 0;
  left: 0;
  width: auto;
  height: auto;
}

.ly-image img.mode--top-right {
  top: 0;
  right: 0;
  width: auto;
  height: auto;
}

.ly-image img.mode--bottom-left {
  bottom: 0;
  left: 0;
  width: auto;
  height: auto;
}

.ly-image img.mode--bottom-right {
  right: 0;
  bottom: 0;
  width: auto;
  height: auto;
}
</style>
