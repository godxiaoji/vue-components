<template>
  <teleport to="body">
    <div
      class="fx-notify fx-popup"
      :class="{ visible: visible2 }"
      :style="popupStyles"
      v-bind="$attrs"
      v-show="isShow"
    >
      <notice-bar
        class="fx-notify_inner"
        :type="type"
        :left-icon="icon"
        :title="title"
        :color="color"
        :background-color="backgroundColor"
        :mode="closable ? 'closable' : 'default'"
        @close-click="onClose"
      />
    </div>
  </teleport>
</template>

<script>
import NoticeBar from '../NoticeBar'
import popupMixin from '../util/popup-mixin'

export default {
  name: 'fx-notify',
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
  beforeUnmount() {
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
