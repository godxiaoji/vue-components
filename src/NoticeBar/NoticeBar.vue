<template>
  <div :class="[prefix + '-notice-bar', typeClassName]" :style="styles" v-show="visible2" @click="onClick">
    <div v-if="leftIcon" :class="[prefix + '-notice-bar_left-icon']">
      <icon :icon="leftIcon" :style="iconStyle" />
    </div>
    <div :class="[prefix + '-notice-bar_content']">
      <div ref="content" :class="[prefix + '-notice-bar_content-inner', { marquee: !!marquee }]" :style="contentStyles">
        {{ title }}
      </div>
    </div>
    <div v-if="rightIcon2" :class="[prefix + '-notice-bar_right-icon']" @click="onRightIconClick">
      <icon :icon="rightIcon2" :style="iconStyle" />
    </div>
  </div>
</template>

<script>
import Icon from '../Icon'
import { SDKKey } from '../config'
import { inArray } from '../helpers/util'

const TYPE_NAMES = ['primary', 'success', 'warning', 'danger']

const MODE_MAPS = {
  default: '',
  clickable: 'RightOutlined',
  closable: 'CloseOutlined'
}

export default {
  name: SDKKey + '-notice-bar',
  components: { Icon },
  inject: {
    appNotify: {
      default: null
    }
  },
  props: {
    // 是否显示
    visible: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      required: true,
      default: ''
    },
    // 通知栏模式
    mode: {
      validator(val) {
        return MODE_MAPS[val] != null
      },
      default: 'default'
    },
    // 左侧图标名称
    leftIcon: {
      type: String,
      default: null
    },
    // 右边侧图标名称
    rightIcon: {
      type: String,
      default: null
    },
    // 背景颜色
    backgroundColor: {
      type: String,
      default: null
    },
    // 字体颜色
    color: {
      type: String,
      default: null
    },
    // 是否采用跑马灯显示
    marquee: {
      type: Boolean,
      default: false
    },
    type: {
      validator(val) {
        return inArray(val, TYPE_NAMES)
      },
      default: TYPE_NAMES[2]
    }
  },
  data() {
    return { prefix: SDKKey, marqueeX: 0, marqueeDuration: 0, visible2: true }
  },
  watch: {
    marquee() {
      this.resetMarquee()
    },
    title() {
      this.resetMarquee()
    },
    visible: {
      immediate: true,
      handler(val) {
        this.visible2 = !!val
      }
    }
  },
  computed: {
    rightIcon2() {
      if (this.rightIcon) {
        return this.rightIcon
      }

      if (this.mode) {
        return MODE_MAPS[this.mode] || null
      }

      return null
    },
    styles() {
      const obj = {}

      if (this.backgroundColor) obj.backgroundColor = this.backgroundColor
      if (this.color) obj.color = this.color

      return obj
    },
    iconStyle() {
      const obj = {}

      if (this.color) obj.fill = this.color

      return obj
    },
    contentStyles() {
      const obj = {}

      if (this.marqueeX !== 0) obj.transform = `translateX(${this.marqueeX}px)`
      if (this.marqueeDuration > 0) obj.transitionDuration = `${this.marqueeDuration}s`

      return obj
    },
    // 计算属性的 getter
    typeClassName() {
      return 'type--' + (inArray(this.type, TYPE_NAMES) ? this.type : TYPE_NAMES[0])
    }
  },
  mounted() {
    if (this.marquee) {
      this.startMarquee()
    }
  },
  destroyed() {
    this.stopMarquee()
  },
  methods: {
    resetMarquee() {
      if (this.marquee) {
        this.startMarquee()
      } else {
        this.stopMarquee()
      }
    },

    startMarquee() {
      this.stopMarquee()

      const $content = this.$refs.content

      if ($content.offsetWidth > $content.parentNode.offsetWidth) {
        this.marqueeStep($content.offsetWidth)
      }
    },

    stopMarquee() {
      clearTimeout(this.marqueeTimer)

      this.marqueeX = 0
      this.marqueeDuration = 0
    },

    marqueeStep(x) {
      this.marqueeX = x
      this.marqueeDuration = 0

      this.marqueeTimer = setTimeout(() => {
        this.marqueeX = -x
        this.marqueeDuration = x / 30

        this.marqueeTimer = setTimeout(() => {
          this.marqueeStep(x)
        }, (x / 30) * 1000)
      }, 17)
    },

    show() {
      if (!this.visible2) {
        this.$emit('update:visible', true)
        this.visible2 = true

        this.$emit('show', {})
      }
    },
    hide() {
      if (this.visible2) {
        this.$emit('update:visible', false)
        this.visible2 = false

        this.$emit('hide', {})
      }
    },
    onRightIconClick() {
      if (this.mode === 'closable') {
        if (!this.appNotify) {
          this.hide()
        }

        this.$emit('close-click', {})
      }
    },
    onClick(e) {
      this.$emit(e.type, e)
    }
  }
}
</script>
