<template>
  <div
    class="fx-step fx-steps-item fx-horizontal-hairline"
    :class="{ active, finish }"
    ref="root"
  >
    <div class="fx-step_line"></div>
    <div
      class="fx-step_index"
      :class="{ 'has--icon': active || (finish && finishIcon) || icon }"
    >
      <icon
        v-if="active || (finish && finishIcon) || icon"
        class="fx-step_icon"
        :icon="
          active
            ? activeIcon || 'CheckOutlined'
            : (finish && finishIcon) || icon
        "
      />
      <span v-else>{{ index + 1 }}</span>
    </div>
    <div class="fx-step_inner">
      <div class="fx-step_title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div class="fx-step_content">
        <slot>{{ content }}</slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, inject, computed } from 'vue'
import Icon from '@/Icon'
import { iconValidator } from '@/helpers/validator'
import { useListItem } from '@/hooks/list'

export default defineComponent({
  name: 'fx-step',
  components: { Icon },
  props: {
    // 未激活图标
    icon: {
      validator: iconValidator,
      default: null
    },
    // 完成图标
    finishIcon: {
      validator: iconValidator,
      default: null
    },
    // 激活图标
    activeIcon: {
      validator: iconValidator,
      default: null
    },
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    }
  },
  setup() {
    const activeIndex = inject('fxStepsActiveIndex', ref(0))
    const root = ref<HTMLElement>()

    const { index } = useListItem('steps', root)

    const active = computed(() => {
      return activeIndex.value === index.value
    })

    const finish = computed(() => {
      return index.value <= activeIndex.value
    })

    return {
      root,
      index,
      active,
      finish
    }
  }
})
</script>
