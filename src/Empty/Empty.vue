<template>
  <div class="fx-empty">
    <slot name="image" v-if="$slots.image"></slot>
    <template v-else>
      <img class="fx-empty_image" :src="imageUrl" />
    </template>
    <p class="fx-empty_description" v-show="description">
      {{ description }}
    </p>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { createEnumsValidator, getEnumsValue } from '../utils/validator'

const TYPE_NAMES = ['default', 'error', 'network', 'search']

export default defineComponent({
  name: 'fx-empty',
  props: {
    // 描述文字
    description: {
      type: String,
      default: ''
    },
    // 类型
    type: {
      type: String as PropType<'default' | 'error' | 'network' | 'search'>,
      validator: createEnumsValidator(TYPE_NAMES),
      default: TYPE_NAMES[0]
    }
  },
  setup(props) {
    const imageUrl = computed(() => {
      return `https://cdn.fox2.cn/vfox/empty/${getEnumsValue(
        TYPE_NAMES,
        props.type
      )}@2x.png`
    })

    return {
      imageUrl
    }
  }
})
</script>
