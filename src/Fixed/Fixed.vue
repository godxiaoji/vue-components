<template>
  <div class="fx-fixed" ref="root">
    <!--fixed start-->
    <div
      class="fx-fixed_inner"
      :class="[placementClassName]"
      :style="fixedStyles"
      ref="inner"
    >
      <div class="fx-fixed_content-wrapper" ref="content">
        <slot></slot>
      </div>
    </div>
    <!--fixed end-->
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  onMounted,
  PropType,
  ref,
  toRef,
  watch
} from 'vue'
import { createEnumsValidator, getEnumsValue } from '@/helpers/validator'
import { capitalize } from '@/helpers/util'
import { PLACEMENT_TYPES } from '@/hooks/constants'
import { PlacementType } from '../hooks/constants'
import { useResizeDetector } from '@/hooks/resize-detector'
import { useSafeAreaInsets } from '@/hooks/safe-area-insets'
import { StyleObject } from '../helpers/types'
import { useFixed } from '@/hooks/fixed'
import { addClassName, removeClassName } from '@/helpers/dom'

export default defineComponent({
  name: 'fx-fixed',
  inject: {
    disableFixed: {
      default: false
    }
  },
  props: {
    // 开启fixed模式
    fixed: {
      type: Boolean,
      default: true
    },
    // 固定方向
    placement: {
      type: String as PropType<PlacementType>,
      validator: createEnumsValidator(PLACEMENT_TYPES),
      default: null
    },
    // 是否开启安全区
    enableSafeAreaInsets: {
      type: Boolean,
      default: true
    },
    background: {
      type: String,
      default: null
    },
    zIndex: {
      type: Number,
      default: 1
    },
    spaceHold: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const root = ref<HTMLElement>()
    const inner = ref<HTMLElement>()
    const content = ref<HTMLElement>()
    const disableFixed = inject('disableFixed', false)

    const safeAreaInsets = useSafeAreaInsets(
      toRef(props, 'enableSafeAreaInsets')
    )

    function updateSize() {
      if (!(root.value && inner.value && content.value)) {
        return
      }

      const { offsetWidth, offsetHeight } = content.value

      if (offsetWidth === 0 || offsetHeight === 0) {
        root.value.style.width = ''
        root.value.style.height = ''
        removeClassName(inner.value, 'fixed')
        return
      }

      root.value.style.width =
        props.fixed && props.spaceHold ? offsetWidth + 'px' : ''
      root.value.style.height =
        props.fixed && props.spaceHold ? offsetHeight + 'px' : ''

      props.fixed
        ? addClassName(inner.value, 'fixed')
        : removeClassName(inner.value, 'fixed')
    }

    const placementClassName = computed(
      () => 'placement--' + getEnumsValue(PLACEMENT_TYPES, props.placement)
    )

    const fixedStyles = computed(() => {
      const styles: StyleObject = {
        background: props.background
      }

      if (props.fixed) {
        if (props.enableSafeAreaInsets && safeAreaInsets.support) {
          const placement = getEnumsValue(PLACEMENT_TYPES, props.placement)
          styles['padding' + capitalize(placement)] =
            safeAreaInsets[placement as 'top'] + 'px'
        }

        styles.zIndex = props.zIndex.toString()
      }

      return styles
    })

    useResizeDetector(content, updateSize)

    useFixed({
      disableFixed,
      root,
      inner,
      fixed: computed(() => props.fixed)
    })

    watch([() => props.fixed, () => props.spaceHold], updateSize)

    onMounted(() => {
      updateSize()
    })

    return {
      root,
      inner,
      content,
      placementClassName,
      fixedStyles,
      safeAreaInsets
    }
  }
})
</script>
