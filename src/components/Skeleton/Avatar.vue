<template>
  <div
    :class="[
      prefix + '-skeleton-avatar',
      shapeClassName,
      { animated: useAnimation }
    ]"
  ></div>
</template>

<script>
import { SDKKey } from '../../config'
import { inArray } from '../../helpers/util'
import { AVATAR_SHAPE_NAMES } from './util'

export default {
  name: SDKKey + '-skeleton-avatar',
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
    },
    // 指定头像的形状
    shape: {
      validator(val) {
        return inArray(val, AVATAR_SHAPE_NAMES)
      }
    }
  },
  data() {
    return { prefix: SDKKey }
  },
  watch: {},
  computed: {
    shapeClassName() {
      let shape

      if (this.shape == null) {
        if (this.skeletonSubOptions && this.skeletonSubOptions.avatarShape) {
          shape = this.skeletonSubOptions.avatarShape
        }
      } else {
        shape = this.shape
      }

      return (
        'shape--' +
        (inArray(shape, AVATAR_SHAPE_NAMES) ? shape : AVATAR_SHAPE_NAMES[0])
      )
    },
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

.#{$prefix}-skeleton-avatar {
  display: block;
  width: 44px;
  height: 44px;
  border-radius: 2px;
  @include skeleton-background;

  &.shape--circle {
    border-radius: 50%;
  }

  &.shape--square {
    border-radius: 0;
  }

  &.animated {
    animation: #{$prefix}-skeleton-loading 1.4s ease infinite;
  }
}
</style>
