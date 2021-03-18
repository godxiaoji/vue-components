<script lang="ts">
import { defineComponent, h, provide, PropType } from 'vue'
import SkeletonLayout from './SkeletonLayout.vue'
import {
  paragraphDefaultRow,
  AVATAR_SHAPE_NAMES,
  BUTTON_SHAPE_NAMES,
  ButtonShapeNames,
  AvatarShapeNames
} from '@/hooks/skeleton'
import { createEnumsValidator } from '@/helpers/validator'

export default defineComponent({
  name: 'fx-skeleton',
  props: {
    // 是否加载中
    loading: {
      type: Boolean,
      default: true
    },
    // 是否显示头像
    avatar: {
      type: Boolean,
      default: false
    },
    // 是否显示动画
    animated: {
      type: Boolean,
      default: false
    },
    // 指定头像的形状
    avatarShape: {
      type: String as PropType<AvatarShapeNames>,
      validator: createEnumsValidator(AVATAR_SHAPE_NAMES),
      default: null
    },
    // 指定按钮的形状
    buttonShape: {
      type: String as PropType<ButtonShapeNames>,
      validator: createEnumsValidator(BUTTON_SHAPE_NAMES),
      default: null
    },
    // 设置段落占位图的行数
    paragraphRow: {
      type: Number,
      default: paragraphDefaultRow
    }
  },
  setup(props, { slots }) {
    provide('fxSkeletonProps', props)

    return () => {
      if (!props.loading) {
        return slots.default ? slots.default() : null
      }

      return h(
        SkeletonLayout,
        {
          animated: props.animated,
          avatar: props.avatar
        },
        slots.layout
      )
    }
  }
})
</script>
