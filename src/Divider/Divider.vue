<template>
  <div
    :class="[
      prefix + '-divider',
      prefix + '-horizontal-hairline',
      { 'has--title': !!title, 'border--dashed': dashed }
    ]"
  >
    <span v-if="title">{{ title }}</span>
  </div>
</template>

<script>
import { SDKKey } from '../config'

export default {
  name: SDKKey + '-divider',
  props: {
    title: {
      type: String,
      default: null
    },
    dashed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefix: SDKKey
    }
  }
}
</script>
