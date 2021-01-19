<template>
  <teleport to="body">
    <div
      :class="[
        prefix + '-preview-image',
        prefix + '-popup',
        { visible: visible2 }
      ]"
      :style="{ zIndex }"
      v-show="isShow"
    >
      <div :class="[prefix + '-mask']"></div>
      <swiper
        v-model:activeIndex="activeIndex"
        :navigation-buttons="navigationButtons"
        @click="onPreviewClick"
        @change="onSwiperChange"
      >
        <swiper-item v-for="(item, index) in images" :key="index">
          <div :class="[prefix + '-preview-image_image']">
            <fx-image
              :src="item.src"
              :mode="'aspectFit'"
              @load="onImageLoad"
              :style="{ width: item.width + 'px', height: item.height + 'px' }"
            />
          </div>
        </swiper-item>
      </swiper>
      <div :class="[prefix + '-preview-image_pagination']">
        {{ activeIndex + 1 }} / {{ urls.length }}
      </div>
      <fx-button
        v-if="showClose"
        :class="[prefix + '-preview-image_close']"
        @click.stop="onCloseClick"
        icon="CloseOutlined"
        size="large"
        pattern="borderless"
        shape="square"
        :ghost="true"
      ></fx-button>
    </div>
  </teleport>
</template>

<script>
import FxButton from '../Button'
import FxImage from '../Image'
import Swiper from '../Swiper'
import SwiperItem from '../SwiperItem'
import { SDKKey } from '../config'
import { isStringArray } from '../helpers/util'
import popupMixin from '../util/popup-mixin'

export default {
  name: SDKKey + '-image-preview',
  components: { FxButton, Swiper, SwiperItem, FxImage },
  mixins: [popupMixin],
  props: {
    urls: {
      validator(value) {
        return isStringArray(value)
      },
      required: true
    },
    current: {
      type: String,
      default: ''
    },
    showClose: {
      type: Boolean,
      default: false
    },
    navigationButtons: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return { prefix: SDKKey, activeIndex: 0, images: [], visible2: false }
  },
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
    current: {
      handler(val) {
        this.updateCurrent(val)
      }
    }
  },
  created() {
    this.updateCurrent(this.current)
  },
  emits: ['update:current', 'change'],
  methods: {
    updateCurrent(val) {
      let hasUrl = false

      for (let i = 0; i < this.urls.length; i++) {
        if (this.images[i].src === val) {
          if (this.activeIndex !== i) {
            this.activeIndex = i
          }
          hasUrl = true
          break
        }
      }

      if (!hasUrl && this.images[0]) {
        this.$emit('update:current', this.images[0].src)
      }
    },
    onImageLoad({ width, height, src }) {
      for (let i = 0; i < this.images.length; i++) {
        const image = this.images[i]

        if (image.src === src) {
          const { clientWidth, clientHeight } = document.documentElement
          image.width = Math.min(width, clientWidth)
          image.height = Math.min(height, clientHeight)
          image.loaded = true
          break
        }
      }
    },
    onSwiperChange({ activeIndex }) {
      const current = this.urls[activeIndex]

      this.$emit('update:current', current)

      this.$emit('change', {
        activeIndex,
        current
      })
    },
    onPreviewClick() {
      this.customCancel('previewClick')
    }
  }
}
</script>
