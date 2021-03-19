<template>
  <teleport to="body">
    <div
      class="fx-drawer fx-popup"
      :class="{ visible: visible2 }"
      :style="popupStyles"
      v-bind="$attrs"
      v-show="isShow"
    >
      <div class="fx-mask" @click="onMaskClick"></div>
      <div
        class="fx-drawer_inner"
        :class="[alignClassName, { 'has--header': hasHeader }]"
        :style="innerStyles"
      >
        <div v-show="hasHeader" class="fx-drawer_header fx-horizontal-hairline">
          <div class="fx-drawer_header-inner">
            <div class="fx-drawer_title">{{ title }}</div>
            <fx-button
              v-if="showClose"
              class="fx-drawer_close"
              shape="square"
              icon="CloseOutlined"
              pattern="borderless"
              @click="onCloseClick"
            ></fx-button>
          </div>
        </div>
        <div class="fx-drawer_body">
          <slot></slot>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, computed, toRef, PropType } from 'vue'
import FxButton from '@/Button'
import { popupEmits, popupProps, usePopup } from '@/hooks/popup'
import { useSafeAreaInsets } from '@/hooks/safe-area-insets'
import { createEnumsValidator, getEnumsValue } from '@/helpers/validator'
import { PLACEMENT_TYPES } from '@/hooks/constants'
import type { PlacementType } from '../hooks/constants'

export default defineComponent({
  name: 'fx-drawer',
  components: { FxButton },
  props: {
    ...popupProps,
    title: {
      type: String,
      default: null
    },
    placement: {
      type: String as PropType<PlacementType>,
      validator: createEnumsValidator(PLACEMENT_TYPES),
      default: getEnumsValue(PLACEMENT_TYPES)
    },
    showClose: {
      type: Boolean,
      default: false
    },
    // 是否开启安全区
    enableSafeAreaInsets: {
      type: Boolean,
      default: true
    }
  },
  emits: popupEmits,
  setup(props, ctx) {
    const popup = usePopup(props, ctx, {})
    const safeAreaInsets = useSafeAreaInsets(
      toRef(props, 'enableSafeAreaInsets')
    )

    const alignClassName = computed(
      () => 'placement--' + getEnumsValue(PLACEMENT_TYPES, props.placement)
    )

    const hasHeader = computed(() => props.title != null || props.showClose)

    const innerStyles = computed(() => {
      const placement = getEnumsValue(PLACEMENT_TYPES, props.placement)

      let left = safeAreaInsets.left
      let top = safeAreaInsets.top
      let right = safeAreaInsets.right
      let bottom = safeAreaInsets.bottom

      if (placement === 'top') {
        bottom = 0
      } else if (placement === 'bottom') {
        top = 0
      } else if (placement === 'left') {
        right = 0
      } else if (placement === 'right') {
        left = 0
      }

      return {
        padding: top + 'px ' + right + 'px ' + bottom + 'px ' + left + 'px'
      }
    })

    return {
      ...popup,
      alignClassName,
      hasHeader,
      innerStyles
    }
  }
})
</script>
