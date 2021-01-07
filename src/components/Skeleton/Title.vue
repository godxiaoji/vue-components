<template>
  <div :class="[prefix + '-skeleton-title', { animated: useAnimation }]"></div>
</template>

<script>
import { SDKKey } from '../../config'

export default {
  name: SDKKey + '-skeleton-title',
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
