<template>
  <teleport to="body">
    <div
      class="fx-toast fx-popup"
      :class="{ visible: visible2, 'forbid-click': mask }"
      :style="popupStyles"
      v-bind="$attrs"
      v-show="isShow"
    >
      <div class="fx-toast_box" :class="{ 'has--icon': !!iconName }">
        <activity-indicator
          class="fx-toast_icon"
          :size="21"
          color="#ffffff"
          v-if="type === 'loading'"
        />
        <icon v v-else-if="iconName" class="fx-toast_icon" :icon="iconName" />
        <div class="fx-toast_text">
          {{ title }}
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, computed, onBeforeUnmount, PropType } from 'vue'
import Icon from '@/Icon'
import ActivityIndicator from '@/ActivityIndicator'
import { popupEmits, popupProps, usePopup } from '@/hooks/popup'
import { isUndefined } from '@/helpers/util'
import { iconValidator } from '@/helpers/validator'

const typeMaps = new Map([
  ['default', null],
  ['success', 'CheckCircleOutlined'],
  ['loading', 'LoadingOutlined'],
  ['fail', 'CloseCircleOutlined']
])

export default defineComponent({
  name: 'fx-toast',
  components: { Icon, ActivityIndicator },
  props: {
    ...popupProps,
    title: {
      type: String,
      required: true
    },
    type: {
      type: String as PropType<'default' | 'success' | 'loading' | 'fail'>,
      validator: (val: string) => {
        return !isUndefined(typeMaps.get(val))
      },
      default: 'default'
    },
    icon: {
      validator: iconValidator,
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
  emits: popupEmits,
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

    const iconName = computed(() => {
      return props.icon || (typeMaps.get(props.type) ?? null)
    })

    onBeforeUnmount(removeAutoClose)

    return {
      ...popup,
      iconName
    }
  }
})
</script>
