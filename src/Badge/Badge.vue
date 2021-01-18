<template>
  <div :class="[prefix + '-badge', { animated: !!animated }]">
    <slot></slot>
    <i
      v-if="dot && content != null"
      :class="[prefix + '-badge_dot']"
      :style="styles"
    ></i>
    <span
      v-else-if="content != null"
      :class="[prefix + '-badge_num']"
      :style="styles"
      >{{ showCount }}</span
    >
  </div>
</template>

<script>
import {
  isNumber,
  isString,
  isStringNumberMix,
  rangeInteger
} from '../helpers/util'
import { SDKKey } from '../config'
import { frameTo } from '../helpers/animation'

export default {
  name: SDKKey + '-badge',
  props: {
    // 消息条数
    content: {
      validator: isStringNumberMix,
      default: 0
    },
    // 最大完全显示消息条数
    maxCount: {
      type: Number,
      default: 99
    },
    // 是否显示为小红点
    dot: {
      type: Boolean,
      default: false
    },
    // 消息数为0时是否显示
    showZero: {
      type: Boolean,
      default: false
    },
    // 是否开启动画
    animated: {
      type: Boolean,
      default: false
    },
    // 偏移量，格式为 [x, y]
    offset: {
      type: Array,
      default() {
        return [0, 0]
      }
    }
  },
  data() {
    return { prefix: SDKKey, content2: 0 }
  },
  watch: {
    content: {
      handler(val) {
        this.frameTask && this.frameTask.stop()

        if (isString(val)) {
          this.content2 = val
          return
        }
        if (!isNumber(val)) {
          return
        }

        const currentIsShow = this.showZero || this.content2 > 0
        const isReadyToHide = !this.showZero && val === 0

        if (!currentIsShow || isReadyToHide) {
          this.content2 = val
        } else {
          const to = rangeInteger(val, 0, this.maxCount)

          this.frameTask = frameTo({
            from: this.content2,
            to,
            duration: Math.min(Math.abs(to - this.content2) * 50, 1000),
            progress: ({ current, frameIndex }) => {
              if (frameIndex % 3 === 0) {
                this.content2 = Math.round(current)
              }
            },
            complete: ({ current }) => {
              this.content2 = current
            }
          })
        }
      }
    }
  },
  computed: {
    showCount() {
      if (isString(this.content2)) {
        return this.content2
      }

      if (this.content > this.maxCount && this.content2 === this.maxCount) {
        return this.content2 + '+'
      }
      return this.content2.toString()
    },
    styles() {
      return {
        transform: `translate3d(50%, -50%, 0px) scale(${
          (isString(this.content) && this.content) ||
          this.showZero ||
          this.content > 0
            ? 1
            : 0
        })`,
        right: `${-this.offset[0]}px`,
        top: `${this.offset[1]}px`
      }
    }
  },
  created() {
    if (isString(this.content)) {
      this.content2 = this.content
    } else if (isNumber(this.content)) {
      this.content2 = rangeInteger(this.content, 0, this.maxCount)
    }
  },
  destroyed() {
    this.frameTask && this.frameTask.stop()
  }
}
</script>
