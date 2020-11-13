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
  watch: {},
  computed: {},
  created() {},
  beforeDestroy() {
    this.removeAutoClose()
  },
  methods: {
    setAutoClose() {
      if (this.duration > 0) {
        this.durationTimer = setTimeout(() => {
          this.hide('auto')
        }, this.duration)
      }
    },
    removeAutoClose() {
      clearTimeout(this.durationTimer)
    },
    show() {
      const isSuccess = this._doShow(() => {
        this.$emit('shown', {})
      })

      if (isSuccess) {
        this.$emit('show', {})
        this.setAutoClose()
      }
    },
    hide(source = 'active') {
      const isSuccess = this._doHide(() => {
        this.$emit('hidden', { source })
      })

      if (isSuccess) {
        this.$emit('hide', { source })
        this.removeAutoClose()
      }
    },
    onClose() {
      this.$emit('close-click', {})
      this.hide('active')
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
