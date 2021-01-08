<template>
  <div :class="[prefix + '-image']" @click="onClick">
    <span
      v-if="aspectRatio != null && aspectRatio > 0"
      :class="[prefix + '-image_ratio']"
      :style="{ 'padding-top': aspectRatio * 100 + '%' }"
    ></span>
    <i :class="[prefix + '-image_loading']" v-if="loading">
      <icon class-name="ImageOutlined" />
    </i>
    <i :class="[prefix + '-image_error']" v-if="error">
      <icon class-name="ImageBreakOutlined" />
    </i>
    <img v-if="imgSrc" :class="[prefix + '-image_img', modeClassName]" :src="imgSrc" />
  </div>
</template>

<script>
import Icon from '../Icon'
import { addLazyQueue, loadNow, removeComponentFromLazy } from './load-image'
import { inArray } from '../helpers/util'
import { SDKKey } from '../config'

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
  components: { Icon },
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
    },
    // 自适应正方形
    aspectRatio: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      prefix: SDKKey,

      imgSrc: null,
      inViewed: false,

      loading: true,
      error: false
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
  mounted() {
    if (this.src) {
      this.loading = true
      this.error = false

      if (this.lazyLoad) {
        addLazyQueue(this)
      } else {
        loadNow(this)
      }
    }
  },
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
        this.loading = false
        this.error = false
        this.imgSrc = res.src
      }

      const type = 'load'

      this.$emit(type, {
        width: res.naturalWidth,
        height: res.naturalHeight,
        src: this.imgSrc
      })
    },
    onError(e) {
      this.loading = false
      this.error = true

      this.$emit('error', e)
    },
    onClick(e) {
      this.$emit(e.type, e)
    }
  }
}
</script>
