<template>
  <teleport to="body">
    <div
      class="fx-drawer fx-popup"
      :class="{ visible: visible2, 'no--mask': !showMask }"
      :style="popupStyles"
      v-bind="$attrs"
      v-show="isShow"
    >
      <div class="fx-mask" @click="onMaskClick"></div>
      <div
        class="fx-drawer_inner fx-horizontal-hairline"
        :class="[alignClassName, { 'has--header': hasHeader }]"
        :style="innerStyles"
      >
        <nav-bar
          v-if="hasHeader"
          class="fx-drawer_header"
          :title="title"
          :left-buttons="showCancel ? [{ text: '取消', type: 'primary' }] : []"
          :right-buttons="
            showClose
              ? [{ text: '关闭', type: 'primary' }]
              : showConfirm
              ? [{ text: '完成', type: 'primary' }]
              : []
          "
          :icon-only="false"
          @left-button-click="onHeaderLeftClick"
          @right-button-click="onHeaderRightClick"
        >
        </nav-bar>
        <div class="fx-drawer_body">
          <slot></slot>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, computed, toRef, PropType, watch } from 'vue'
import NavBar from '@/NavBar'
import { popupEmits, popupProps, usePopup } from '@/hooks/popup'
import { useSafeAreaInsets } from '@/hooks/safe-area-insets'
import { createEnumsValidator, getEnumsValue } from '@/helpers/validator'
import { PLACEMENT_TYPES } from '@/hooks/constants'
import { PlacementType } from '../hooks/types'

export default defineComponent({
  name: 'fx-drawer',
  components: { NavBar },
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
    showCancel: {
      type: Boolean,
      default: false
    },
    showClose: {
      type: Boolean,
      default: false
    },
    showConfirm: {
      type: Boolean,
      default: false
    },
    // 是否开启安全区
    enableSafeAreaInsets: {
      type: Boolean,
      default: true
    },
    showMask: {
      type: Boolean,
      default: true
    }
  },
  emits: popupEmits,
  setup(props, ctx) {
    const popupOptions = {
      useBlur: false
    }

    const popup = usePopup(props, ctx, popupOptions)
    const safeAreaInsets = useSafeAreaInsets(
      toRef(props, 'enableSafeAreaInsets')
    )

    const alignClassName = computed(
      () => 'placement--' + getEnumsValue(PLACEMENT_TYPES, props.placement)
    )

    const hasHeader = computed(
      () =>
        props.title != null ||
        props.showClose ||
        props.showCancel ||
        props.showConfirm
    )

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

    function onHeaderLeftClick() {
      popup.onCancelClick()
    }

    function onHeaderRightClick() {
      if (props.showClose) {
        popup.onCloseClick()
      } else if (props.showConfirm) {
        popup.customConfirm({})
      }
    }

    watch(
      () => props.showMask,
      val => (popupOptions.useBlur = !val),
      { immediate: true }
    )

    return {
      ...popup,
      alignClassName,
      hasHeader,
      innerStyles,
      onHeaderLeftClick,
      onHeaderRightClick
    }
  }
})
</script>
