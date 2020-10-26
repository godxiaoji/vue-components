<template>
  <div :class="[prefix + '-notify', { visible }]" :style="styles">
    <slot>消息提示</slot>
  </div>
</template>

<script>
import { inArray } from '../../helpers/util'
import { SDKKey } from '../../config'

const TYPE_NAMES = ['primary', 'success', 'warning', 'danger']

export default {
  name: SDKKey + '-notify',
  components: {},
  props: {
    visible: {
      type: Boolean,
      require: true
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
    // 展示时长(ms)，值为 0 时，notify 不会消失
    duration: {
      type: Number,
      default: 0
    },
    // 类型
    type: {
      type: String,
      default: TYPE_NAMES[0]
    },
    zIndex: {
      type: Number,
      default: 10000
    }
  },
  data() {
    return { prefix: SDKKey }
  },
  watch: {
    visible: {
      handler(val) {
        if (val && this.duration > 0) {
          this.durationTimer = setTimeout(() => {
            this.close('autoClose')
          }, this.duration)
        } else if (!val) {
          this.close()
        }
      }
    }
  },
  computed: {
    styles() {
      const obj = {}

      if (this.backgroundColor) obj.backgroundColor = this.backgroundColor
      if (this.color) obj.color = this.color

      obj.zIndex = this.zIndex

      return obj
    },
    // 计算属性的 getter
    typeClassName() {
      return (
        'type--' + (inArray(this.type, TYPE_NAMES) ? this.type : TYPE_NAMES[0])
      )
    }
  },
  created() {
    if (this.visible && this.duration > 0) {
      this.durationTimer = setTimeout(() => {
        this.close('autoClose')
      }, this.duration)
    }
  },
  mounted() {},
  beforeDestroy() {
    this.clearTimer()
  },
  methods: {
    /**
     * 清除关闭定时器
     */
    clearTimer() {
      clearTimeout(this.durationTimer)
    },
    /**
     * 关闭
     */
    close(source = 'activeClose') {
      this.clearTimer()
      if (source === 'autoClose') {
        this.$emit('update:visible', false)
      }

      this.$emit(
        'close',
        new CustomEvent(
          {
            type: 'close',
            currentTarget: this.$el,
            target: this.$el
          },
          { source }
        )
      )
    }
  }
}
</script>

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-notify {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  line-height: 1.5;
  word-break: break-all;
  word-wrap: break-word;
  padding: 7px 0;
  overflow: hidden;
  color: #fff;
  background-color: $primary-color;
  transform: translate3d(0, calc(-100%), 0);
  transition: all 0.2s;
  opacity: 0;

  &.visible {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }

  &.type--success {
    background-color: $success-color;
  }

  &.type--warning {
    background-color: $warning-color;
  }

  &.type--danger {
    background-color: $danger-color;
  }

  .#{$prefix}-icon {
    --size: 18px;
    --color: #fff;

    & + * {
      margin-left: 5px;
    }
  }
}
</style>
