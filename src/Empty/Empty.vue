<template>
  <div :class="[prefix + '-empty']">
    <slot name="image" v-if="$slots.image"></slot>
    <template v-else>
      <img :class="[prefix + '-empty_image']" :src="imageUrl" />
    </template>
    <p :class="[prefix + '-empty_description']" v-show="description">
      {{ description }}
    </p>
    <slot></slot>
  </div>
</template>

<script>
import { SDKKey } from '../config'
import { inArray } from '../helpers/util'

const TYPE_NAMES = ['default', 'error', 'network', 'search']

export default {
  name: SDKKey + '-empty',
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
  data() {
    return { prefix: SDKKey }
  },
  computed: {
    imageUrl() {
      return `https://cdn.fox2.cn/vfox/empty/${
        inArray(this.type, TYPE_NAMES) ? this.type : TYPE_NAMES[0]
      }@2x.png`
    }
  }
}
</script>
