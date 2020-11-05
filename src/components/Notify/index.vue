<template>
  <div
    :class="[prefix + '-notify', prefix + '-popup', { visible: visible2 }]"
    :style="{ zIndex }"
    v-show="isShow"
  >
    <div :class="[prefix + '-notify_inner', typeClassName]" :style="styles">
      <template v-if="title">
        <icon v-if="icon" :class-name="icon" :style="iconStyle"></icon>
        <span>{{ title }}</span>
      </template>
      <slot v-else></slot>
    </div>
  </div>
</template>

<script>
import Icon from '../Icon'
import { inArray } from '../../helpers/util'
import { SDKKey } from '../../config'
import popupMixin from '../util/popup-mixin'

const TYPE_NAMES = ['primary', 'success', 'warning', 'danger']

export default {
  name: SDKKey + '-notify',
  components: { Icon },
  mixins: [popupMixin],
  props: {
    title: {
      type: String,
      default: null
    },
    icon: {
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
    // 展示时长(ms)，值为 0 时，notify 不会消失
    duration: {
      type: Number,
      default: 0
    },
    // 类型
    type: {
      type: String,
      default: TYPE_NAMES[0]
    }
  },
  data() {
    return { prefix: SDKKey }
  },
  watch: {},
  computed: {
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
    // 计算属性的 getter
    typeClassName() {
      return (
        'type--' + (inArray(this.type, TYPE_NAMES) ? this.type : TYPE_NAMES[0])
      )
    }
  },
  created() {},
  beforeDestroy() {
    this.clearDurationTimer()
  },
  methods: {
    setAutoClose() {
      if (this.duration > 0) {
        this.durationTimer = setTimeout(() => {
          this.hide('auto')
        }, this.duration)
      }
    },
    /**
     * 清除关闭定时器
     */
    clearDurationTimer() {
      clearTimeout(this.durationTimer)
    },
    show() {
      this._doShow()
      this.setAutoClose()
    }
  }
}
</script>

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-popup.#{$prefix}-notify {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: auto;
}

.#{$prefix}-notify {
  &_inner {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 17px;
    line-height: 24px;
    word-break: break-all;
    word-wrap: break-word;
    padding: 12px 0;
    overflow: hidden;
    color: #fff;
    background-color: $primary-color;
    transform: translate3d(0, calc(-100%), 0);
    transition: all 0.2s;
    opacity: 0;

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
      --size: 21px;
      --color: #fff;

      & + * {
        margin-left: 8px;
      }
    }
  }

  &.visible {
    .#{$prefix}-notify_inner {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }
}
</style>
