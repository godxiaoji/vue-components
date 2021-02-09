<template>
  <div class="fx-skeleton-image" :class="{ animated: useAnimation }"></div>
</template>

<script>
export default {
  name: 'fx-skeleton-image',
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
