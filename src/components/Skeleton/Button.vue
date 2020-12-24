<template>
  <div
    :class="[
      prefix + '-skeleton-button',
      shapeClassName,
      { animated: useAnimation }
    ]"
  ></div>
</template>

<script>
import { SDKKey } from '../../config'
import { inArray } from '../../helpers/util'
import { BUTTON_SHAPE_NAMES } from './util'

export default {
  name: SDKKey + '-skeleton-button',
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
    // 指定按钮的形状
    shape: {
      validator(val) {
        return inArray(val, BUTTON_SHAPE_NAMES)
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
        if (this.skeletonSubOptions && this.skeletonSubOptions.buttonShape) {
          shape = this.skeletonSubOptions.buttonShape
        }
      } else {
        shape = this.shape
      }

      return (
        'shape--' +
        (inArray(shape, BUTTON_SHAPE_NAMES) ? shape : BUTTON_SHAPE_NAMES[0])
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
@import './index.module.scss';

.#{$prefix}-skeleton-button {
  display: block;
  width: 56px;
  height: 28px;
  border-radius: 2px;
  @include skeleton-background;

  &.shape--circle {
    border-radius: 50%;
    width: 44px;
  }

  &.shape--round {
    border-radius: 22px;
  }

  &.animated {
    @include skeleton-animation;
  }
}
</style>
