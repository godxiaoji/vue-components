<template>
  <div :class="[prefix + '-badge', { animated: !!animated }]">
    <slot></slot>
    <i v-if="dot" :class="[prefix + '-badge_dot']" :style="styles"></i>
    <span v-else :class="[prefix + '-badge_num']" :style="styles">{{
      showCount
    }}</span>
  </div>
</template>

<script>
import { rangeInteger } from '../../helpers/util'
import { SDKKey } from '../../config'
import { frameTo } from '../../helpers/animation'

export default {
  name: SDKKey + '-badge',
  components: {},
  props: {
    // 消息条数
    count: {
      type: Number,
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
    return { prefix: SDKKey, count2: 0 }
  },
  watch: {
    count: {
      handler(val) {
        this.frameTask && this.frameTask.stop()

        const currentIsShow = this.showZero || this.count2 > 0
        const isReadyToHide = !this.showZero && val === 0

        if (!currentIsShow || isReadyToHide) {
          this.count2 = val
        } else {
          const to = rangeInteger(val, 0, this.maxCount)

          this.frameTask = frameTo({
            from: this.count2,
            to,
            duration: Math.min(Math.abs(to - this.count2) * 50, 1000),
            progress: ({ current, frameIndex }) => {
              if (frameIndex % 3 === 0) {
                this.count2 = Math.round(current)
              }
            },
            complete: ({ current }) => {
              this.count2 = current
            }
          })
        }
      }
    }
  },
  computed: {
    showCount() {
      if (this.count > this.maxCount && this.count2 === this.maxCount) {
        return this.count2 + '+'
      }
      return this.count2.toString()
    },
    styles() {
      return {
        transform: `translate3d(${this.offset[0]}px, ${
          this.offset[1]
        }px, 0px) scale(${this.showZero || this.count > 0 ? 1 : 0})`
      }
    }
  },
  created() {
    this.count2 = rangeInteger(this.count, 0, this.maxCount)
  },
  mounted() {},
  destroyed() {
    this.frameTask && this.frameTask.stop()
  },
  methods: {}
}
</script>

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-badge {
  display: inline-block;
  position: relative;
  --background-color: #{$danger-color};
  --border-color: #fff;
  --color: #fff;

  &_num {
    position: absolute;
    right: -9px;
    top: -9px;
    height: 18px;
    min-width: 18px;
    display: inline-flex;
    align-items: center;
    padding: 0 4px;
    border-radius: 9px;
    box-sizing: border-box;
    font-size: 12px;
    color: var(--color);
    background-color: var(--background-color);
    border: 1px solid var(--border-color);
    transform: scale(0);
  }

  &_dot {
    position: absolute;
    right: -5px;
    top: -5px;
    height: 10px;
    width: 10px;
    border-radius: 5px;
    box-sizing: border-box;
    color: var(--color);
    background-color: var(--background-color);
    border: 1px solid var(--border-color);
    transform: scale(0);
  }

  &.animated {
    .#{$prefix}-badge {
      &_num {
        transition: transform 0.2s;
      }

      &_dot {
        transition: transform 0.1s;
      }
    }
  }
}
</style>
