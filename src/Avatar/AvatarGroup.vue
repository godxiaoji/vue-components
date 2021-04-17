<template>
  <div class="fx-avatar-group" :class="['count--' + (children.length || 1)]">
    <slot></slot>
    <avatar
      class="fx-avatar-group_count"
      v-if="totalCount != null"
      :colorStyle="countColorStyle"
    >
      <span
        class="fx-avatar-group_count-number"
        :class="['size--' + totalCountStr.length]"
      >
        {{ totalCountStr }}
      </span>
    </avatar>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, provide, PropType } from 'vue'
import Avatar from '@/Avatar'
import { useGroup } from '@/hooks/group'
import { avatarProps } from '@/Avatar/util'
import { simpleNumber } from '@/helpers/util'
import { COlOR_STYLES } from '@/hooks/constants'
import { ColorStyle } from '../hooks/types'
import { createEnumsValidator } from '@/helpers/validator'

export default defineComponent({
  name: 'fx-avatar-group',
  components: { Avatar },
  props: {
    ...avatarProps,
    totalCount: {
      type: Number,
      default: null
    },
    // 色彩风格
    countColorStyle: {
      type: String as PropType<ColorStyle>,
      validator: createEnumsValidator(COlOR_STYLES),
      default: 'DaybreakBlue'
    }
  },
  setup(props) {
    const { children } = useGroup('avatar')

    provide('fxAvatarGroupOptions', props)

    const totalCountStr = computed(() => {
      return simpleNumber(props.totalCount)
    })

    return { children, totalCountStr }
  }
})
</script>
