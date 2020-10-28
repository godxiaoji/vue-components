<template>
  <div
    v-show="visible"
    :class="[prefix + '-preview-image', { visible: visible2 }]"
    :style="{ zIndex }"
  >
    <swiper :current.sync="activeIndex" @click="onPreviewClick">
      <swiper-item v-for="(item, index) in images" :key="index">
        <div :class="[prefix + '-preview-image_image']">
          <fx-image
            :src="item.src"
            :mode="'aspectFit'"
            @load="onImageLoad"
            :style="{ width: item.width + 'px', height: item.height + 'px' }"
          ></fx-image>
        </div>
      </swiper-item>
    </swiper>
    <div :class="[prefix + '-preview-image_pagination']">
      {{ activeIndex + 1 }} / {{ urls.length }}
    </div>
    <i
      v-if="showClose"
      :class="[prefix + '-preview-image_close']"
      @click.stop="onCloseClick"
      ><icon class-name="CloseCircleFilled"></icon
    ></i>
  </div>
</template>

<script>
import Icon from '../Icon'
import FxImage from '../Image'
import { Swiper, SwiperItem } from '../Swiper'
import { CustomEvent } from '../../helpers/events'
import { SDKKey } from '../../config'
import { isStringArray } from '../../helpers/util'

export default {
  name: SDKKey + '-preview-image',
  components: { Icon, Swiper, SwiperItem, FxImage },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    urls: {
      validator(value) {
        return isStringArray(value)
      },
      required: true,
      default() {
        return []
      }
    },
    current: {
      type: String,
      default: ''
    },
    showClose: {
      type: Boolean,
      default: true
    },
    zIndex: {
      type: Number,
      default: 10000
    }
  },
  data() {
    return { prefix: SDKKey, activeIndex: 0, images: [], visible2: false }
  },
  computed: {},
  watch: {
    urls: {
      immediate: true,
      handler() {
        const map = {}

        this.images.forEach(v => {
          map[v.src] = v
        })

        const images = []

        this.urls.forEach((url, index) => {
          if (map[url]) {
            images.push(map[url])
          } else {
            images.push({
              src: url,
              width: 0,
              height: 0,
              loaded: false
            })
          }

          if (this.current && this.current === url) {
            this.activeIndex = index
          }
        })

        this.images = images
      }
    },
    visible(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.visible2 = true
        })
      } else {
        this.visible2 = false
      }
    }
  },
  created() {},
  mounted() {
    if (this.visible) {
      this.visible2 = true
    }
  },
  beforeDestroy() {},
  methods: {
    onImageLoad({ details: { width, height, src } }) {
      for (let i = 0; i < this.images.length; i++) {
        const image = this.images[i]

        if (image.src === src) {
          const doc = document.documentElement
          image.width = Math.min(width, doc.offsetWidth)
          image.height = Math.min(height, doc.offsetHeight)
          image.loaded = true
          break
        }
      }
    },
    onBoxClick() {},
    onPreviewClick(e) {
      this.close(e)
    },
    onCloseClick(e) {
      this.close(e)
    },
    close() {
      if (this.isClosing) {
        return
      }
      this.isClosing = true

      this.visible2 = false
      setTimeout(() => {
        this.isClosing = false
        this.$emit('update:visible', false)
      }, 500)

      const type = 'close'

      this.$emit(
        type,
        new CustomEvent(
          {
            type,
            currentTarget: this.$el
          },
          {}
        )
      )
    }
  }
}
</script>

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-preview-image {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba($color: $black-color, $alpha: 0.9);
  text-align: left;
  transform: translateZ(0);
  opacity: 0;
  transition: opacity 0.5s;

  &.visible {
    opacity: 1;
  }

  .#{$prefix}-swiper {
    display: block;
    width: 100%;
    height: 100%;
  }

  &_image {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    .#{$prefix}-image {
      max-width: 100%;
      max-height: 100%;
    }
  }

  &_pagination {
    position: absolute;
    top: 16px;
    left: 0;
    line-height: 32px;
    width: 100%;
    font-size: 17px;
    color: #fff;
    text-align: center;
  }

  &_close {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 32px;
    height: 32px;

    .#{$prefix}-icon {
      --size: 32px;
      --color: #fff;
    }
  }
}
</style>
