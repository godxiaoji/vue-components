<template>
  <div class="ly-swiper">
    <div class="ly-swiper_list">
      <slot></slot>
    </div>
    <div class="ly-swiper_pagination" v-show="indicatorDots">
      <span
        class="ly-swiper_pagination-bullet"
        v-for="(item, index) in pagination"
        :key="item.index"
        :class="{ active: index === slideCurrent }"
        :style="{
          background:
            index === slideCurrent ? indicatorActiveColor : indicatorColor
        }"
      ></span>
    </div>
  </div>
</template>

<script>
import MSlide from 'mslide/src/mslide'
import { getHandleEvent } from '../../helpers/events'

// export
export default {
  name: 'ly-swiper',
  props: {
    indicatorDots: {
      type: Boolean,
      default: false
    },

    indicatorColor: {
      type: String,
      default: 'rgba(0, 0, 0, .3)'
    },

    indicatorActiveColor: {
      type: String,
      default: '#09bb07'
    },

    autoplay: {
      type: Boolean,
      default: false
    },

    interval: {
      type: Number,
      default: 5000
    },

    duration: {
      type: Number,
      default: 500
    },

    circular: {
      type: Boolean,
      default: false
    },

    current: {
      type: Number,
      default: 0
    },

    displayMultipleItems: {
      type: Number,
      default: 1
    },

    previousMargin: {
      type: Number,
      default: 0
    },

    nextMargin: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      slideCurrent: 0,
      globalOptions: {},
      pagination: []
    }
  },
  ready() {
    if (!this.swiper) {
      this.mountInstance()
    }
  },
  mounted() {
    if (!this.swiper) {
      this.mountInstance()
    }
  },
  activated() {
    this.update()
  },
  beforeDestroy() {
    this.$nextTick(function() {
      if (this.swiper) {
        this.swiper.destroy && this.swiper.destroy()
        delete this.swiper
      }
    })
  },
  watch: {
    /**
     * 外部修改索引可以旋转
     */
    current(val) {
      if (this.swiper) {
        this.swiper.to(val)
      }
    },
    autoplay() {
      this.updateSlide()
    },
    interval() {
      this.updateSlide()
    },
    duration() {
      this.updateSlide()
    },
    circular() {
      this.updateSlide()
    }
  },
  methods: {
    update() {
      if (this.swiper) {
        this.swiper.refresh && this.swiper.refresh()
      }

      const pagination = []

      this.$el.querySelectorAll('.ly-swiper_item').forEach(($item, k) => {
        $item.style.paddingLeft = this.previousMargin + 'px'
        $item.style.paddingRight = this.nextMargin + 'px'

        pagination.push({
          index: k
        })
      })

      this.pagination = pagination
    },
    updateSlide() {
      if (this.swiper) {
        const options = {}

        // 自动播放
        options.autoPlay = this.autoplay ? true : false
        options.interval = this.interval

        // 滑动动画时长
        options.duration = this.duration
        // 是否采用衔接滑动
        options.loop = this.circular

        this.swiper.updateOptions(options)
      }
    },
    mergeOptions() {
      const vm = this
      const options = {}

      options.selector = this.$el
      // 当前所在滑块的 index
      options.index = this.current
      // // 同时显示的滑块数量
      // options.slidesPerView = this.displayMultipleItems

      options.onBeforeSlide = (index, fromIndex) => {
        if (index !== fromIndex) {
          // 排重

          vm.$emit('update:current', index)
          const type = 'change'
          vm.$emit(
            type,
            getHandleEvent(
              this.$el,
              {},
              {
                current: index
              },
              type
            )
          )
        }

        this.slideCurrent = index
      }

      options.onSlide = index => {
        const type = 'animationfinish'
        vm.$emit(
          type,
          getHandleEvent(
            this.$el,
            {},
            {
              current: index
            },
            type
          )
        )
      }

      // window.console.log(options);
      return Object.assign({}, this.globalOptions, options)
    },
    mountInstance() {
      this.slideCurrent = this.current
      const swiperOptions = this.mergeOptions()
      this.swiper = new MSlide(swiperOptions)
      this.updateSlide()
      this.bindEvents()
      // this.$emit('ready', this.swiper)
    },
    bindEvents() {}
  }
}
</script>

<style>
.ly-swiper {
  position: relative;
  box-sizing: border-box;
}

.ly-swiper_pagination {
  position: absolute;
  left: 0;
  bottom: 20px;
  text-align: center;
  width: 100%;
}

.ly-swiper_pagination-bullet {
  display: inline-block;
  margin: 0 5px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
</style>
