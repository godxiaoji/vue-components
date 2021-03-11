<template>
  <teleport to="body">
    <div
      class="fx-dropdown fx-popup"
      :class="{ visible: visible2 }"
      :style="popupStyles"
      v-bind="$attrs"
      v-show="isShow"
      ref="popup"
    >
      <div class="fx-mask" @click="onMaskClick"></div>
      <div class="fx-dropdown_inner">
        <slot :height="height"></slot>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue'
import { popupEmits, popupProps, usePopup } from '../utils/popup'
import { selectorValidator } from '../utils/validator'
import Exception from '../helpers/exception'
import { querySelector, DomSelector } from '../helpers/dom'

export default defineComponent({
  name: 'fx-dropdown',
  props: {
    ...popupProps,
    selector: {
      validator: selectorValidator,
      required: true
    }
  },
  emits: popupEmits,
  setup(props, ctx) {
    const top = ref(-1)
    const height = ref(0)
    const popup = ref<HTMLElement>()

    function updatePos() {
      const $target = querySelector(props.selector as DomSelector)

      if (!$target) {
        console.error(
          new Exception(
            '通过"selector"找不到对应Element.',
            Exception.TYPE.PROP_ERROR,
            'Dropdown'
          )
        )
        return
      }

      const { bottom } = ($target as HTMLElement).getBoundingClientRect()

      top.value = bottom
      nextTick(() => {
        height.value = popup.value ? popup.value.offsetHeight : 0
      })
    }

    const popupHook = usePopup(props, ctx, {
      afterShow: updatePos,
      afterHidden() {
        top.value = -1
      }
    })

    const popupStyles = computed(() => {
      return {
        zIndex: popupHook.zIndex.value,
        top: top.value === -1 ? '100vh' : top.value + 'px'
      }
    })

    return {
      ...popupHook,
      popupStyles,
      top,
      height,
      popup
    }
  }
})
</script>
