<template>
  <div
    class="fx-notice-bar"
    :class="[typeClassName]"
    :style="styles"
    v-show="visible2"
  >
    <div v-if="leftIcon" class="fx-notice-bar_left-icon">
      <icon :icon="leftIcon" :style="iconStyles" />
    </div>
    <div class="fx-notice-bar_content">
      <div
        ref="content"
        class="fx-notice-bar_content-inner"
        :class="{ marquee: !!marquee }"
        :style="contentStyles"
      >
        <slot>
          {{ title }}
        </slot>
      </div>
    </div>
    <div
      v-if="rightIcon2"
      class="fx-notice-bar_right-icon"
      @click="onRightIconClick"
    >
      <icon :icon="rightIcon2" :style="iconStyles" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  onMounted,
  onBeforeUnmount,
  inject,
  ref,
  watch,
  PropType
} from 'vue'
import Icon from '@/Icon'
import {
  createEnumsValidator,
  getEnumsValue,
  iconValidator
} from '@/utils/validator'
import  type {  StyleObject } from '@/utils/types'
import { StateTypes, STATE_TYPES } from '@/utils/constants'

const modeMaps = new Map([
  ['default', ''],
  ['clickable', 'RightOutlined'],
  ['closable', 'CloseOutlined']
])

export default defineComponent({
  name: 'fx-notice-bar',
  components: { Icon },
  inject: {
    appNotify: {
      default: null
    }
  },
  props: {
    // 是否显示
    visible: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    // 通知栏模式
    mode: {
      type: String as PropType<'default' | 'clickable' | 'closable'>,
      validator: (val: string) => {
        return modeMaps.get(val) != null
      },
      default: 'default'
    },
    // 左侧图标名称
    leftIcon: {
      validator: iconValidator,
      default: null
    },
    // 右边侧图标名称
    rightIcon: {
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
    // 是否采用跑马灯显示
    marquee: {
      type: Boolean,
      default: false
    },
    type: {
      type: String as PropType<StateTypes>,
      validator: createEnumsValidator(STATE_TYPES),
      default: null
    }
  },
  emits: ['update:visible', 'show', 'hide', 'close-click'],
  setup(props, ctx) {
    const { emit } = ctx
    const appNotify = inject('appNotify', null)
    const visible2 = ref(!!props.visible)
    const marqueeX = ref(0)
    const marqueeDuration = ref(0)
    const content = ref<HTMLElement>()
    let marqueeTimer: number

    function marqueeStep(x: number, pW: number) {
      marqueeX.value = pW
      marqueeDuration.value = 0

      marqueeTimer = window.setTimeout(() => {
        marqueeX.value = -x
        marqueeDuration.value = x / 30

        marqueeTimer = window.setTimeout(() => {
          marqueeStep(x, pW)
        }, (x / 28) * 1000)
      }, 17)
    }

    function stopMarquee() {
      clearTimeout(marqueeTimer)

      marqueeX.value = 0
      marqueeDuration.value = 0
    }

    function startMarquee() {
      stopMarquee()

      const $content = content.value as HTMLElement

      const w = $content.offsetWidth
      const pW = ($content.parentElement as HTMLElement).offsetWidth

      if (w > pW) {
        marqueeStep(w, pW)
      }
    }

    function resetMarquee() {
      props.marquee ? startMarquee() : stopMarquee()
    }

    function show() {
      if (!visible2.value) {
        emit('update:visible', true)
        visible2.value = true

        emit('show', {})
      }
    }
    function hide() {
      if (visible2.value) {
        emit('update:visible', false)
        visible2.value = false

        emit('hide', {})
      }
    }

    function onRightIconClick() {
      if (props.mode === 'closable') {
        if (!appNotify) {
          hide()
        }

        emit('close-click', {})
      }
    }

    onMounted(() => props.marquee && startMarquee())

    onBeforeUnmount(() => stopMarquee())

    watch([() => props.marquee, () => props.title], () => {
      resetMarquee()
    })

    const rightIcon2 = computed(() => {
      return props.rightIcon || modeMaps.get(props.mode) || null
    })

    const styles = computed(() => {
      const obj: StyleObject = {}

      props.backgroundColor && (obj.backgroundColor = props.backgroundColor)
      props.color && (obj.color = props.color)

      return obj
    })

    const iconStyles = computed(() => {
      const obj: StyleObject = {}

      props.color && (obj.fill = props.color)

      return obj
    })

    const contentStyles = computed(() => {
      const obj: StyleObject = {}

      marqueeX.value !== 0 &&
        (obj.transform = `translateX(${marqueeX.value}px)`)
      marqueeDuration.value > 0 &&
        (obj.transitionDuration = `${marqueeDuration.value}s`)

      return obj
    })

    // 计算属性的 getter
    const typeClassName = computed(() => {
      return 'type--' + getEnumsValue(STATE_TYPES, props.type)
    })

    watch(() => props.visible, val => {
      visible2.value = !!val
    })

    return {
      show,
      hide,
      content,
      visible2,
      rightIcon2,
      styles,
      iconStyles,
      contentStyles,
      typeClassName,
      onRightIconClick
    }
  }
})
</script>
