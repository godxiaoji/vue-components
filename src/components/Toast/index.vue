<template>
  <div
    :class="[
      prefix + '-toast',
      prefix + '-popup',
      { visible: visible2, 'forbid-click': mask }
    ]"
    :style="{ zIndex }"
    v-show="isShow"
  >
    <div :class="[prefix + '-toast_box', { 'has--icon': !!iconName }]">
      <icon
        v-if="iconName"
        :class="[prefix + '-toast_icon']"
        :class-name="iconName"
        :spin="type === 'loading'"
      ></icon>
      <div :class="[prefix + '-toast_text']">
        {{ title }}
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '../Icon'
import { SDKKey } from '../../config'
import popupMixin from '../util/popup-mixin'
import { isUndefined } from '../../helpers/util'

const TYPE_MAP = {
  default: null,
  success: 'CheckCircleOutlined',
  loading: 'LoadingOutlined',
  fail: 'CloseCircleOutlined'
}

export default {
  name: SDKKey + '-toast',
  components: { Icon },
  mixins: [popupMixin],
  props: {
    title: {
      type: String,
      required: true
    },
    type: {
      validator(val) {
        return !isUndefined(TYPE_MAP[val])
      },
      default: 'default'
    },
    icon: {
      type: String,
      default: null
    },
    mask: {
      type: Boolean,
      default: false
    },
    // 展示时长(ms)，值为 0 时，notify 不会消失
    duration: {
      type: Number,
      default: 0
    }
  },
  data() {
    return { prefix: SDKKey, forbidScroll: false }
  },
  watch: {},
  computed: {
    iconName() {
      if (this.icon) {
        return this.icon
      } else if (TYPE_MAP[this.type]) {
        return TYPE_MAP[this.type]
      }

      return null
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

.#{$prefix}-popup.#{$prefix}-toast {
  width: 0;
  height: 0;

  &.forbid-click {
    width: 100vw;
    height: 100vh;
  }
}

.#{$prefix}-toast {
  width: 0;
  height: 0;

  &_box {
    position: fixed;
    left: 50%;
    top: 50%;
    min-width: 100px;
    max-width: 70%;
    z-index: $default-z-index;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s;
    opacity: 0;
    min-height: 48px;
    padding: 12px 16px;
    border-radius: 4px;
    box-sizing: border-box;
    background-color: rgba($color: $black-color, $alpha: 0.65);
    color: #fff;
    transform: translate3d(-50%, -50%, 0) scale(0);

    &.has--icon {
      .#{$prefix}-toast {
        &_icon {
          --size: 21px;
          fill: #fff;
          margin-right: 8px;
          flex-shrink: 0;
        }

        &_text {
          -webkit-line-clamp: 1;
          height: 24px;
        }
      }
    }
  }

  &.visible {
    .#{$prefix}-toast_box {
      opacity: 1;
      transform: translate3d(-50%, -50%, 0) scale(1);
    }
  }

  &_text {
    font-size: 17px;
    line-height: 24px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-align: center;
  }
}
</style>
