<template>
  <div :class="[prefix + '-skeleton-image', { animated: useAnimation }]"></div>
</template>

<script>
import { SDKKey } from '../config'

export default {
  name: SDKKey + '-skeleton-image',
  inject: {
    skeletonSubOptions: {
      default: null
    }
  },
  props: {
    // 是否显示动画
    animated: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return { prefix: SDKKey }
  },
  computed: {
    useAnimation() {
      if (this.skeletonSubOptions) {
        return this.skeletonSubOptions.animated
      }
      return this.animated
    }
  }
}
</script>
