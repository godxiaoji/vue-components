<template>
  <svg>
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
import { SDKKey } from '../config'
import './lib/load-svg'

export default {
  name: SDKKey + 'svg-icon',
  props: {
    iconName: {
      type: String,
      required: true
    }
  },
  data() {
    return { prefix: SDKKey }
  }
}
</script>
