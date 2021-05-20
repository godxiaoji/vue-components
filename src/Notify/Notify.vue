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

<script lang="ts">
import NoticeBar from '@/NoticeBar'
import { defineComponent, onBeforeUnmount, PropType } from 'vue'
import { popupEmits, popupProps, usePopup } from '@/hooks/popup'
import { iconValidator } from '@/helpers/validator'
import { StateType } from '../hooks/types'

export default defineComponent({
  name: 'fx-notify',
  components: { NoticeBar },
  provide() {
    return {
      fxNotifyExist: true
    }
  },
  props: {
    ...popupProps,
    closable: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: null
    },
    icon: {
      validator: iconValidator,
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
      type: String as PropType<StateType>,
      default: null
    }
  },
  emits: [...popupEmits, 'close-click'],
  setup(props, ctx) {
    let durationTimer: number

    const popup = usePopup(props, ctx, {
      forbidScroll: false,
      afterCancel: removeAutoClose,
      afterShow: setAutoClose
    })

    function removeAutoClose() {
      clearTimeout(durationTimer)
    }

    function setAutoClose() {
      if (props.duration > 0) {
        durationTimer = window.setTimeout(() => {
          popup.customCancel('auto', true)
        }, props.duration)
      }
    }

    function onClose() {
      ctx.emit('close-click', {})
      popup.customCancel('activeClick', true)
    }

    onBeforeUnmount(removeAutoClose)

    return {
      ...popup,
      onClose
    }
  }
})
</script>
