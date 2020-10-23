<template>
  <div
    :class="[
      prefix + '-toast',
      { 'has--icon': image || (icon && icon !== 'none'), visible }
    ]"
    :style="{ zIndex }"
  >
    <div :class="[prefix + '-toast_mask']" v-show="mask"></div>
    <div :class="[prefix + '-toast_box']">
      <img v-if="image" :class="[prefix + '-toast_icon']" :src="image" />
      <icon
        v-else-if="icon == 'success'"
        :class="[prefix + '-toast_icon']"
        class-name="CheckOutlined"
      ></icon>
      <icon
        v-else-if="icon == 'loading'"
        :class="[prefix + '-toast_icon']"
        class-name="LoadingOutlined"
        :spin="true"
      ></icon>
      <div :class="[prefix + '-toast_text']">
        {{ title }}
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '../Icon/Icon.vue'
import { SDKKey } from '../../config'

export default {
  name: SDKKey + '-toast',
  components: { Icon },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    mask: {
      type: Boolean,
      default: false
    },
    // 展示时长(ms)，值为 0 时，notify 不会消失
    duration: {
      type: Number,
      default: 0
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

.#{$prefix}-toast {
  position: fixed;
  left: 50%;
  top: 50%;
  width: 200px;
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: -20px 0 0 -100px;
  transition: all 0.2s;
  opacity: 0;
  transform: scale(0);

  &.visible {
    opacity: 1;
    transform: scale(1);
  }

  &_mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($color: $black-color, $alpha: 0.5);
  }

  &_box {
    min-height: 40px;
    padding: 6px 20px;
    border-radius: 20px;
    box-sizing: border-box;
    background-color: rgba($color: $black-color, $alpha: 0.5);
    color: #fff;
  }

  &_text {
    max-width: 200px;
    line-height: 28px;
    font-size: 14px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  &.has--icon {
    height: 100px;
    width: 100px;
    margin: -50px 0 0 -50px;

    .#{$prefix}-toast_box {
      padding: 0;
      height: 100px;
      width: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }

    .#{$prefix}-toast_icon {
      --size: 48px;
      fill: #fff;
    }

    .#{$prefix}-toast_text {
      margin-top: 10px;
      height: 16px;
      line-height: 16px;
      -webkit-line-clamp: 1;
    }
  }
}
</style>
