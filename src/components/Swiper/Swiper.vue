<template>
  <div :class="[prefix + '-swiper']">
    <div :class="[prefix + '-swiper_list']">
      <slot></slot>
    </div>
    <div :class="[prefix + '-swiper_pagination']" v-show="indicatorDots">
      <span
        v-for="(item, index) in pagination"
        :key="item.index"
        :class="[
          prefix + '-swiper_pagination-bullet',
          { active: index === slideCurrent }
        ]"
        :style="{
          background:
            index === slideCurrent ? indicatorActiveColor : indicatorColor
        }"
      ></span>
    </div>
  </div>
</template>

<script>
import MSlide from 'mslide'
import { SDKKey } from '../../config'

// export
export default {
  name: SDKKey + '-swiper',
  provide() {
    return {
      appSwiper: this
    }
  },
  props: {
    // 是否显示面板指示点
    indicatorDots: {
      type: Boolean,
      default: false
    },

    indicatorColor: {
      type: String,
      default: 'rgba(4, 10, 19, .45)'
    },

    indicatorActiveColor: {
      type: String,
      default: '#1890ff'
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

    activeIndex: {
      type: Number,
      default: 0
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
      prefix: SDKKey,

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
    activeIndex(val) {
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
      clearTimeout(this.updateTimer)

      this.updateTimer = setTimeout(() => {
        if (this.swiper) {
          this.swiper.refresh && this.swiper.refresh()
        }

        const pagination = []

        this.$el
          .querySelectorAll(`.${SDKKey}-swiper-item`)
          .forEach(($item, k) => {
            $item.style.paddingLeft = this.previousMargin + 'px'
            $item.style.paddingRight = this.nextMargin + 'px'

            pagination.push({
              index: k
            })
          })

        this.pagination = pagination
      }, 17)
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
      const options = {}

      options.selector = this.$el
      // 当前所在滑块的 index
      options.index = this.activeIndex
      // // 同时显示的滑块数量

      options.onBeforeSlide = (index, fromIndex) => {
        if (index !== fromIndex) {
          // 排重

          this.$emit('update:activeIndex', index)
          const type = 'change'
          this.$emit(type, {
            activeIndex: index
          })
        }

        this.slideCurrent = index
      }

      options.onSlide = index => {
        const type = 'changed'

        this.$emit(type, {
          activeIndex: index
        })
      }

      options.onClick = e => {
        this.$emit(e.type, e)
      }

      // window.console.log(options);
      return Object.assign({}, this.globalOptions, options)
    },
    mountInstance() {
      this.slideCurrent = this.activeIndex
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

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-swiper {
  position: relative;
  box-sizing: border-box;

  &_pagination {
    position: absolute;
    left: 0;
    bottom: 20px;
    text-align: center;
    width: 100%;
  }

  &_pagination-bullet {
    display: inline-block;
    margin: 0 5px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }

  &_list {
    height: 100%;
  }

  &-item {
    height: 100%;
  }
}
</style>
