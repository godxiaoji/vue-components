<template>
  <div :class="[prefix + '-group', { card: card }]">
    <div :class="[prefix + '-group_header']">
      <div :class="[prefix + '-group_title']">{{ title }}</div>
    </div>
    <div
      :class="[
        prefix + '-group_body',
        prefix + '-horizontal-hairline',
        'hairline-reverse'
      ]"
    >
      <div :class="[prefix + '-group_body-inner']">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { SDKKey } from '../config'

export default {
  name: SDKKey + '-group',
  props: {
    title: {
      type: String,
      required: true
    },
    card: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return { prefix: SDKKey }
  }
}
</script>
