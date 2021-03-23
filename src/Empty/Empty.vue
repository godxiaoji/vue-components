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

<script>
import { inArray } from '../helpers/util'

const TYPE_NAMES = [
  'default',
  'error',
  'network',
  'search',
  'permission',
  'service'
]

export default {
  name: 'fx-empty',
  props: {
    // 描述文字
    description: {
      type: String,
      default: ''
    },
    // 类型
    type: {
      validator(val) {
        return inArray(val, TYPE_NAMES)
      },
      default: TYPE_NAMES[0]
    }
  },
  computed: {
    imageUrl() {
      return `https://cdn.fox2.cn/vfox/empty/${
        inArray(this.type, TYPE_NAMES) ? this.type : TYPE_NAMES[0]
      }@3x.png`
    }
  }
}
</script>
