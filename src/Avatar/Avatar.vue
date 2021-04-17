<template>
  <badge
    class="fx-avatar"
    :class="[
      'size--' + size2,
      'shape--' + shape2,
      'color--' + (colorStyle || 'default')
    ]"
    :style="styles"
    v-bind="{ ...$attrs, ...badge2 }"
  >
    <slot>
      <fx-image
        class="fx-avatar_image"
        :src="src"
        mode="aspectFill"
        loadingIcon="UserOutlined"
      />
    </slot>
    <template #badge>
      <icon v-if="gender === 'man'" icon="ManOutlined" />
      <icon v-else-if="gender === 'woman'" icon="WomanOutlined" />
    </template>
  </badge>
</template>

<script lang="ts">
import {
  inject,
  defineComponent,
  computed,
  getCurrentInstance,
  PropType,
  ComponentInternalInstance
} from 'vue'
import Icon from '@/Icon'
import Badge from '@/Badge'
import FxImage from '@/Image'
import { createEnumsValidator, getEnumsValue } from '@/helpers/validator'
import { AVATAR_SHAPE_TYPES, COlOR_STYLES } from '@/hooks/constants'
import { AvatarShapeType, ColorStyle } from '../hooks/types'
import { useGroupItem } from '@/hooks/group'
import { getAvatarSize, avatarProps } from '@/Avatar/util'
import { isNumber, inArray } from '@/helpers/util'
import { StyleObject } from '../helpers/types'
import { handleBadge } from '@/Badge/util'
import { BadgeOptions } from '../Badge/types'

type Gender = 'man' | 'woman'
const GenderNames = ['woman', 'man']

export default defineComponent({
  name: 'fx-avatar',
  components: { Badge, FxImage, Icon },
  props: {
    ...avatarProps,
    shape: {
      type: String as PropType<AvatarShapeType>,
      validator: createEnumsValidator(AVATAR_SHAPE_TYPES),
      default: null
    },
    // 头像URL
    src: {
      type: String,
      default: null
    },
    // badge参数
    badge: {
      type: [Number, String, Object],
      default: null
    },
    // 设置性别
    gender: {
      type: String as PropType<Gender>,
      default: null
    },
    // 色彩风格
    colorStyle: {
      type: String as PropType<ColorStyle>,
      validator: createEnumsValidator(COlOR_STYLES),
      default: null
    }
  },
  setup(props) {
    const uid = (getCurrentInstance() as ComponentInternalInstance).uid
    const groupOptions = inject<{ size: number | string } | null>(
      'fxAvatarGroupOptions',
      null
    )

    useGroupItem('avatar', uid)

    const size2 = computed(() => {
      const { size } = groupOptions || props

      return getAvatarSize(size)
    })

    const shape2 = computed(() => {
      return getEnumsValue(
        AVATAR_SHAPE_TYPES,
        groupOptions ? 'circle' : props.shape
      )
    })

    const styles = computed(() => {
      const obj: StyleObject = {}

      if (isNumber(size2.value)) {
        const size = size2.value as number

        obj.width = size + 'px'
        obj.height = size + 'px'
        obj.fontSize = size / 2 + 'px'
      }

      return obj
    })

    const badge2 = computed(() => {
      let badge: BadgeOptions

      if (inArray(props.gender, GenderNames)) {
        badge = {
          backgroundColor: props.gender === 'man' ? '#1890FF' : '#F759AB',
          content: 1
        }
      } else {
        badge = handleBadge(props.badge)
      }

      badge.offset = props.shape === 'circle' ? [-5, 5] : [0, 0]

      return badge
    })

    return {
      size2,
      shape2,
      styles,
      badge2
    }
  }
})
</script>
