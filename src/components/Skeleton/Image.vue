<template>
  <div :class="[prefix + '-skeleton-image', { animated: useAnimation }]"></div>
</template>

<script>
import { SDKKey } from '../../config'

export default {
  name: SDKKey + '-skeleton-image',
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

.#{$prefix}-skeleton-image {
  display: block;
  width: 100px;
  height: 100px;
  border-radius: 2px;
  @include skeleton-background;

  &.animated {
    animation: #{$prefix}-skeleton-loading 1.4s ease infinite;
  }
}
</style>
