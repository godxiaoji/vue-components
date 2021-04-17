<template>
  <div class="fx-badge" :class="{ animated: !!animated }">
    <slot></slot>
    <div
      class="fx-badge_badge"
      :class="{ dot }"
      :style="styles"
      v-if="content != null"
    >
      <slot name="badge">
        {{ showCount }}
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  PropType,
  ref,
  watch
} from 'vue'
import { isNumber, isString, rangeInteger } from '@/helpers/util'
import { StyleObject } from '../helpers/types'
import { AnimationFrameTask, frameTo } from '@/helpers/animation'

export default defineComponent({
  name: 'fx-badge',
  props: {
    // 消息条数
    content: {
      type: [String, Number],
      default: 0
    },
    // 最大完全显示消息条数
    maxCount: {
      type: Number,
      default: 99
    },
    // 是否显示为小红点
    dot: {
      type: Boolean,
      default: false
    },
    // 消息数为0时是否显示
    showZero: {
      type: Boolean,
      default: false
    },
    // 是否开启动画
    animated: {
      type: Boolean,
      default: false
    },
    // 偏移量，格式为 [x, y]
    offset: {
      type: Array as PropType<number[]>,
      default: () => {
        return [0, 0]
      }
    },
    // 背景颜色
    backgroundColor: {
      type: String,
      default: null
    },
    // 文字颜色
    color: {
      type: String,
      default: null
    }
  },
  setup(props) {
    const content2 = ref<string | number>(
      isString(props.content)
        ? props.content
        : isNumber(props.content)
        ? rangeInteger(props.content, 0, props.maxCount)
        : 0
    )

    let frameTask: AnimationFrameTask

    const showCount = computed(() => {
      if (isString(content2.value)) {
        return content2.value as string
      }

      if (props.content > props.maxCount && content2.value === props.maxCount) {
        return content2.value + '+'
      }
      return content2.value.toString()
    })

    const styles = computed(() => {
      const obj: StyleObject = {
        transform: `translate3d(50%, -50%, 0px) scale(${
          (isString(props.content) && props.content) ||
          props.showZero ||
          props.content > 0
            ? 1
            : 0
        })`,
        right: `${-props.offset[0]}px`,
        top: `${props.offset[1]}px`
      }

      if (isString(props.backgroundColor)) {
        obj.backgroundColor = props.backgroundColor
      }
      if (isString(props.color)) {
        obj.color = props.color
      }

      return obj
    })

    watch(
      () => props.content,
      val => {
        frameTask && frameTask.stop()

        if (isString(val)) {
          content2.value = val as string
          return
        }
        if (!isNumber(val)) {
          return
        }

        const currentIsShow = props.showZero || content2.value > 0
        const isReadyToHide = !props.showZero && val === 0

        if (!currentIsShow || isReadyToHide) {
          content2.value = val
        } else {
          const to = rangeInteger(val, 0, props.maxCount)

          frameTask = frameTo({
            from: content2.value as number,
            to,
            duration: Math.min(
              Math.abs(to - (content2.value as number)) * 50,
              1000
            ),
            progress: ({
              current,
              frameIndex
            }: {
              current: number
              frameIndex: number
            }) => {
              if (frameIndex % 3 === 0) {
                content2.value = Math.round(current)
              }
            },
            complete: ({ current }: { current: number }) => {
              content2.value = current
            }
          })
        }
      }
    )

    onBeforeUnmount(() => frameTask && frameTask.stop())

    return {
      showCount,
      styles
    }
  }
})
</script>
