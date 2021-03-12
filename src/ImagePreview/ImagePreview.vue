<template>
  <div
    class="fx-preview-image fx-popup"
    :class="{ visible: visible2 }"
    :style="{ zIndex }"
    v-show="isShow"
  >
    <div class="fx-mask"></div>
    <swiper
      :activeIndex.sync="activeIndex"
      :navigation-buttons="navigationButtons"
      @click="onPreviewClick"
      @change="onSwiperChange"
      @animated="onSwiperAnimated"
    >
      <swiper-item v-for="(item, index) in images" :key="index">
        <div class="fx-preview-image_image-container">
          <fx-image
            :src="item.src"
            :mode="'aspectFit'"
            @load="onImageLoad"
            :class="{ animated: zoomAnimated }"
            :style="{
              width: item.width + 'px',
              height: item.height + 'px',
              'margin-left': item.offsetLeft + 'px',
              'margin-top': item.offsetTop + 'px'
            }"
            @touchstart.native="onImageTouchStart($event, item)"
            @touchmove.native="onImageTouchMove($event, item)"
            @touchend.native="onImageTouchEnd($event, item)"
          />
        </div>
      </swiper-item>
    </swiper>
    <div class="fx-preview-image_pagination">
      {{ activeIndex + 1 }} / {{ urls.length }}
    </div>
    <fx-button
      v-if="showClose"
      class="fx-preview-image_close"
      @click.stop="onCloseClick"
      icon="CloseOutlined"
      size="large"
      pattern="borderless"
      shape="square"
      :ghost="true"
    ></fx-button>
  </div>
</template>

<script>
import FxButton from '../Button'
import FxImage from '../Image'
import Swiper from '../Swiper'
import SwiperItem from '../SwiperItem'
import { isStringArray, rangeNumber } from '../helpers/util'
import popupMixin from '../util/popup-mixin'

export default {
  name: 'fx-image-preview',
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
    },
    imageHighRendering: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      activeIndex: 0,
      images: [],
      visible2: false,
      zoomAnimated: false
    }
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
              initialWidth: 0,
              initialHeight: 0,
              naturalWidth: 0,
              naturalHeight: 0,
              offsetTop: 0,
              offsetLeft: 0,
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
  methods: {
    onImageTouchStart(e, item) {
      this.zoomAnimated = false

      if (e.touches.length >= 2) {
        e.preventDefault()
        e.stopPropagation()

        this.touchCoords = {
          start: {
            pageX: e.touches[0].pageX,
            pageY: e.touches[0].pageY
          },
          start2: {
            pageX: e.touches[1].pageX,
            pageY: e.touches[1].pageY
          },
          image: {
            width: item.width,
            height: item.height
          },
          inZoom: true
        }
      } else {
        const { clientWidth, clientHeight } = document.documentElement

        if (item.width <= clientWidth && item.height <= clientHeight) {
          // 图片小于屏幕，不劫持滑动操作
        } else {
          this.touchCoords = {
            start: {
              pageX: e.touches[0].pageX,
              pageY: e.touches[0].pageY
            },
            scroll: this.offset2Scroll(item)
          }
        }
      }
    },

    onImageTouchMove(e, item) {
      if (!this.touchCoords) {
        return
      }

      const coords = this.touchCoords

      if (coords.inZoom) {
        if (!coords.inZoomEnd) {
          coords.hasZoom = true
          const scale =
            this.getDistance(e.touches[0], e.touches[1]) /
            this.getDistance(coords.start, coords.start2)

          item.width = coords.image.width * scale
          item.height = coords.image.height * scale
        } else {
          // 放开一只手指就不执行缩放操作
        }
        e.preventDefault()
        e.stopPropagation()
      } else {
        const touch = e.touches[0]
        const scroll = coords.scroll

        const offsetX = coords.start.pageX - touch.pageX
        const offsetY = coords.start.pageY - touch.pageY

        if (!coords.inMove) {
          const verticalMove = Math.abs(offsetY) > Math.abs(offsetX)

          if (
            (verticalMove && offsetY > 0 && scroll.top < scroll.maxTop) ||
            (verticalMove && offsetY < 0 && scroll.top > 0) ||
            (!verticalMove && offsetX > 0 && scroll.left < scroll.maxLeft) ||
            (!verticalMove && offsetX < 0 && scroll.left > 0)
          ) {
            coords.inMove = true
          }
        }

        if (coords.inMove) {
          const { offsetTop, offsetLeft } = this.getUpdateOffset(
            {
              top: Math.max(0, Math.min(scroll.maxTop, scroll.top + offsetY)),
              left: Math.max(
                0,
                Math.min(scroll.maxLeft, scroll.left + offsetX)
              ),
              isScrollValue: true
            },
            item
          )

          item.offsetTop = offsetTop
          item.offsetLeft = offsetLeft

          e.preventDefault()
          e.stopPropagation()
        } else {
          delete this.touchCoords
        }
      }
    },

    offset2Scroll(item) {
      const { clientWidth, clientHeight } = document.documentElement

      return {
        top: (item.height - clientHeight) / 2 - item.offsetTop,
        left: (item.width - clientWidth) / 2 - item.offsetLeft,
        maxTop: item.height - clientHeight,
        maxLeft: item.width - clientWidth
      }
    },

    getUpdateOffset({ top, left, isScrollValue }, item) {
      const { clientHeight, clientWidth } = document.documentElement

      let offsetTop
      let offsetLeft

      if (item.height <= clientHeight) {
        offsetTop = 0
      } else {
        const diff = (item.height - clientHeight) / 2
        offsetTop = rangeNumber(isScrollValue ? diff - top : top, -diff, diff)
      }

      if (item.width <= clientWidth) {
        offsetLeft = 0
      } else {
        const diff = (item.width - clientWidth) / 2

        offsetLeft = rangeNumber(
          isScrollValue ? diff - left : left,
          -diff,
          diff
        )
      }

      return {
        offsetTop,
        offsetLeft
      }
    },

    onImageTouchEnd(e, item) {
      if (!this.touchCoords) {
        return
      }

      e.preventDefault()
      e.stopPropagation()

      const coords = this.touchCoords

      if (coords.hasZoom) {
        this.zoomAnimated = true
        if (item.width < item.initialWidth) {
          item.width = item.initialWidth
        } else if (item.width > item.naturalWidth) {
          item.width = item.naturalWidth
        }
        if (item.height < item.initialHeight) {
          item.height = item.initialHeight
        } else if (item.height > item.naturalHeight) {
          item.height = item.naturalHeight
        }

        const { offsetTop, offsetLeft } = this.getUpdateOffset(
          {
            top: item.offsetTop,
            left: item.offsetLeft
          },
          item
        )
        item.offsetTop = offsetTop
        item.offsetLeft = offsetLeft
      }

      if (e.touches.length > 0) {
        // 放开一只手指
        this.touchCoords.inZoomEnd = true
      } else {
        // 放开两只手指
        delete this.touchCoords
      }
    },

    getDistance(p1, p2) {
      const x = p2.pageX - p1.pageX
      const y = p2.pageY - p1.pageY
      return Math.sqrt(x * x + y * y)
    },

    onSwiperAnimated() {
      this.images.forEach((item, k) => {
        if (k !== this.activeIndex) {
          // 切走的图片恢复原有大小
          item.width = item.initialWidth
          item.height = item.initialHeight
          item.offsetTop = 0
          item.offsetLeft = 0
        }
      })
    },

    updateCurrent(val) {
      let hasUrl = false

      for (let i = 0, len = this.images.length; i < len; i++) {
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
      if (this.imageHighRendering) {
        const dpr = window.devicePixelRatio || 1
        width = width / dpr
        height = height / dpr
      }
      for (let i = 0; i < this.images.length; i++) {
        const image = this.images[i]

        if (image.src === src) {
          const { clientWidth } = document.documentElement

          if (width > clientWidth) {
            image.width = clientWidth
            image.height = height * (clientWidth / width)
            // image.width = width
            // image.height = height
          } else {
            image.width = width
            image.height = height
          }
          image.naturalWidth = width
          image.naturalHeight = height
          image.initialWidth = image.width
          image.initialHeight = image.height
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
