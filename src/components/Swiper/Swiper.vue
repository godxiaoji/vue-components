<template>
  <div class="swiper-container">
    <slot name="parallax-bg"></slot>
    <div :class="classes.wrapperClass">
      <slot></slot>
    </div>
    <div class="swiper-pagination" v-show="indicatorDots"></div>
    <!-- <slot name="pagination"></slot>
    <slot name="button-prev"></slot>
    <slot name="button-next"></slot>
    <slot name="scrollbar"></slot>-->
  </div>
</template>

<script>
// @url https://swiperjs.com/api/#custom-build
import { Swiper, Pagination } from 'swiper/js/swiper.esm.js'
import './swiper.css'
Swiper.use([Pagination])

// pollfill
if (typeof Object.assign != 'function') {
  Object.defineProperty(Object, 'assign', {
    value(target) {
      if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object')
      }
      const to = Object(target)
      for (let index = 1; index < arguments.length; index++) {
        const nextSource = arguments[index]
        if (nextSource != null) {
          for (const nextKey in nextSource) {
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey]
            }
          }
        }
      }
      return to
    },
    writable: true,
    configurable: true
  })
}

// as of swiper 4.0.7
// http://idangero.us/swiper/api/#events
// const DEFAULT_EVENTS = [
//   "beforeDestroy",
//   "slideChange",
//   "slideChangeTransitionStart",
//   "slideChangeTransitionEnd",
//   "slideNextTransitionStart",
//   "slideNextTransitionEnd",
//   "slidePrevTransitionStart",
//   "slidePrevTransitionEnd",
//   "transitionStart",
//   "transitionEnd",
//   "touchStart",
//   "touchMove",
//   "touchMoveOpposite",
//   "sliderMove",
//   "touchEnd",
//   "click",
//   "tap",
//   "doubleTap",
//   "imagesReady",
//   "progress",
//   "reachBeginning",
//   "reachEnd",
//   "fromEdge",
//   "setTranslate",
//   "setTransition",
//   "resize"
// ];

// export
export default {
  name: 'app-swiper',
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
      globalOptions: {
        /* 分页 */
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets', // ... 点分页
          // clickable: true, // 点击分页器的指示点分页器会控制Swiper切换
          renderBullet: (index, className) => {
            // this指vue
            // window.console.log(className);
            return `<span class="${className}" style="background-color: ${this.indicatorColor}; opacity: 1;"></span>`
          }
        }
      },
      swiper: null,
      classes: {
        wrapperClass: 'swiper-wrapper'
      }
    }
  },
  ready() {
    if (!this.swiper) {
      this.mountInstance()
    }
  },
  mounted() {
    if (!this.swiper) {
      // let setClassName = false
      // for (const className in this.classes) {
      //   if (this.classes.hasOwnProperty(className)) {
      //     if (this.options[className]) {
      //       setClassName = true
      //       this.classes[className] = this.options[className]
      //     }
      //   }
      // }
      // setClassName ? this.$nextTick(this.mountInstance) : this.mountInstance()
      this.mountInstance()
    }
  },
  activated() {
    this.update()
  },
  updated() {
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
        this.swiper.slideToLoop(val, this.duration, false)
      }
    }
  },
  methods: {
    update() {
      if (this.swiper) {
        this.swiper.update && this.swiper.update()
        this.swiper.navigation && this.swiper.navigation.update()
        this.swiper.pagination && this.swiper.pagination.render()
        this.swiper.pagination && this.swiper.pagination.update()
      }
    },
    mergeOptions() {
      const vm = this
      const options = {}

      // 自动播放
      if (this.autoplay) {
        options.autoplay = {
          delay: this.interval
        }
      }
      // 滑动动画时长
      options.speed = this.duration
      // 是否采用衔接滑动
      options.loop = this.circular
      // 当前所在滑块的 index
      options.initialSlide = this.current
      // 同时显示的滑块数量
      options.slidesPerView = this.displayMultipleItems
      // 前边距，可用于露出前一项的一小部分
      options.slidesOffsetBefore = this.previousMargin
      // 后边距，可用于露出后一项的一小部分
      options.slidesOffsetAfter = this.nextMargin

      let slideCurrent = this.current

      options.on = {
        // 两个输出事件change和animationfinish， transition事件暂时不提供
        slideChange: function() {
          if (this.realIndex !== slideCurrent) {
            // 左下排重
            slideCurrent = this.realIndex

            vm.$emit('change', {
              detail: {
                current: slideCurrent
              }
            })
          }
        },
        transitionEnd: function() {
          vm.$emit('animationfinish', {
            detail: {
              current: this.realIndex
            }
          })
        },
        // 主要在于接收数据
        paginationUpdate: function(swiper, paginationEl) {
          paginationEl.childNodes.forEach(el => {
            el.style.backgroundColor = el.classList.contains(
              'swiper-pagination-bullet-active'
            )
              ? vm.indicatorActiveColor
              : vm.indicatorColor
          })
        }
      }

      // window.console.log(options);
      return Object.assign({}, this.globalOptions, options)
    },
    mountInstance() {
      const swiperOptions = this.mergeOptions()
      this.swiper = new Swiper(this.$el, swiperOptions)
      this.bindEvents()
      // this.$emit('ready', this.swiper)
    },
    bindEvents() {
      // const vm = this;
      // swiper.on("paginationUpdate", function(swiper, paginationEl) {
      //   paginationEl.childNodes.forEach(el => {
      //     el.style.backgroundColor = el.classList.contains(
      //       "swiper-pagination-bullet-active"
      //     )
      //       ? vm.indicatorActiveColor
      //       : vm.indicatorColor;
      //   });
      // });
      // DEFAULT_EVENTS.forEach(eventName => {
      //   this.swiper.on(eventName, function() {
      //     vm.$emit(eventName, ...arguments);
      //     vm.$emit(
      //       eventName.replace(/([A-Z])/g, "-$1").toLowerCase(),
      //       ...arguments
      //     );
      //   });
      // });
    }
  }
}
</script>
