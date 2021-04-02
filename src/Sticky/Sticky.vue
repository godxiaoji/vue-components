<template>
  <div class="fx-sticky" :style="styles" ref="root">
    <div class="fx-sticky_content" ref="content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
  onMounted,
  inject,
  watch,
  onBeforeUnmount,
  onActivated,
  onDeactivated
} from 'vue'
import { widgetZIndex } from '@/helpers/layer'
import { selectorValidator, sizeValidator } from '@/helpers/validator'
import { OnScrollCallback, useScrollEvent } from '@/hooks/scroll'
import {
  getRelativeOffset,
  getScrollDom,
  getSizeValue,
  querySelector
} from '@/helpers/dom'
import { StyleObject } from '../helpers/types'
import { useFixed } from '@/hooks/fixed'

export default defineComponent({
  name: 'fx-sticky',
  inject: {
    disableFixed: {
      default: false
    }
  },
  props: {
    containSelector: {
      validator: selectorValidator,
      default: null
    },
    offsetTop: {
      type: [Number, String],
      validator: sizeValidator,
      default: 0
    },
    offsetBottom: {
      type: [Number, String],
      validator: sizeValidator,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const root = ref<HTMLElement>()
    const content = ref<HTMLElement>()
    const width = ref<number | null>(null)
    const height = ref<number | null>(null)
    const disableFixed = inject('disableFixed', false)
    const fixed = ref(false)

    const { toBody, backRoot } = useFixed({
      disableFixed,
      root,
      inner: content,
      fixed
    })

    const onScroll: OnScrollCallback = (e: Event, { scrollTop }) => {
      updateFixed(scrollTop)
    }

    function updateFixed(scrollTop: number | null) {
      if (!root.value || !$container) {
        return
      }

      if (props.disabled) {
        updateStyles(false)
        return
      }

      if (scrollTop == null) {
        scrollTop = getScrollDom($container).scrollTop
      }

      const $root = root.value as HTMLElement
      const { clientHeight, clientWidth } = $root

      const offsetTop = getRelativeOffset($root, $container).offsetTop

      // console.log(scrollTop, offsetTop, getSizeValue(props.offsetTop), $root.offsetTop, $container)
      if (scrollTop >= offsetTop - getSizeValue(props.offsetTop)) {
        height.value = clientHeight
        width.value = clientWidth
        updateStyles(true)
      } else {
        height.value = null
        width.value = null
        updateStyles(false)
      }
    }

    function updateStyles(isFixed: boolean) {
      const $root = root.value as HTMLElement
      const styles = (content.value as HTMLElement).style

      if (isFixed) {
        const { offsetTop } = getRelativeOffset($container)
        const { offsetLeft } = getRelativeOffset($root)

        styles.top = offsetTop + getSizeValue(props.offsetTop) + 'px'
        styles.left = offsetLeft + 'px'
        styles.width = width.value + 'px'
        if (props.offsetBottom != null) {
          styles.bottom = getSizeValue(props.offsetBottom) + 'px'
        } else {
          styles.height = height.value + 'px'
        }
        styles.zIndex = widgetZIndex.toString()
        styles.position = 'fixed'
      } else {
        styles.cssText = ''
      }

      fixed.value = isFixed
    }

    let $container: HTMLElement
    let scrollOff: () => void

    function resetContainer(containSelector: any) {
      scrollOff && scrollOff()
      $container = querySelector(containSelector) || document.documentElement

      scrollOff = useScrollEvent($container, onScroll)

      updateFixed(null)
    }

    const styles = computed(() => {
      const styles: StyleObject = {}

      if (height.value != null) {
        styles.height = height.value + 'px'
      }

      return styles
    })

    watch(
      () => props.disabled,
      () => updateFixed(null)
    )

    onMounted(() => resetContainer(props.containSelector))

    return {
      root,
      fixed,
      content,
      styles,
      resetContainer
    }
  }
})
</script>
