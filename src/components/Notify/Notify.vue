<template>
  <div
    :class="[prefix + '-notify', prefix + '-popup', { visible: visible2 }]"
    :style="{ zIndex }"
    v-show="isShow"
  >
    <notice-bar
      :class="[prefix + '-notify_inner']"
      :type="type"
      :left-icon="icon"
      :title="title"
      :color="color"
      :background-color="backgroundColor"
      :mode="closable ? 'closable' : 'default'"
      @close-click="onClose"
    />
  </div>
</template>

<script>
import NoticeBar from '../NoticeBar'
import { SDKKey } from '../../config'
import popupMixin from '../util/popup-mixin'

export default {
  name: SDKKey + '-notify',
  components: { NoticeBar },
  mixins: [popupMixin],
  provide() {
    return {
      appNotify: this
    }
  },
  props: {
    closable: {
      type: Boolean,
      default: false
    },
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
      default: 'primary'
    }
  },
  data() {
    return { prefix: SDKKey }
  },
  beforeDestroy() {
    this.removeAutoClose()
  },
  methods: {
    setAutoClose() {
      if (this.duration > 0) {
        this.durationTimer = setTimeout(() => {
          this.close('auto')
        }, this.duration)
      }
    },
    close(source) {
      this.customCancel(source, true)
    },
    afterCancel() {
      this.removeAutoClose()
    },
    removeAutoClose() {
      clearTimeout(this.durationTimer)
    },
    afterShow() {
      this.setAutoClose()
    },
    onClose() {
      this.$emit('close-click', {})
      this.close('activeClick')
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
    transform: translate3d(0, calc(-100%), 0);
    transition: all 0.2s;
    opacity: 0;
  }

  &.visible {
    .#{$prefix}-notify_inner {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }
}
</style>
