<template>
  <div :class="[prefix + '-skeleton-title', { animated: useAnimation }]"></div>
</template>

<script>
import { SDKKey } from '../../config'

export default {
  name: SDKKey + '-skeleton-title',
  components: {},
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
  watch: {},
  computed: {
    useAnimation() {
      if (this.skeletonSubOptions) {
        return this.skeletonSubOptions.animated
      }
      return this.animated
    }
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {}
}
</script>

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-skeleton-title {
  display: block;
  width: 50%;
  height: 16px;
  @include skeleton-background;
  border-radius: 2px;

  &.animated {
    animation: #{$prefix}-skeleton-loading 1.4s ease infinite;
  }
}
</style>
